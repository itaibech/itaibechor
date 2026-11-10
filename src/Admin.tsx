import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { fetchItems, supabase, type Item, type Message } from './supabase.ts'

const ADMIN = 'itai.bechor@gmail.com' // UI hint only; RLS (is_admin) enforces it.
const blank = { kind: 'habit', title_en: '', title_he: '', description_en: '', description_he: '', url: '', icon: '', sort: 0 }
type Draft = typeof blank & { id?: string }

function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  return session
}

function ItemForm({ draft, onSaved }: { draft: Draft; onSaved: () => void }) {
  const [error, setError] = useState('')
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = Object.fromEntries(new FormData(form)) as Record<string, string>
    const row = { ...f, url: f.url || null, sort: Number(f.sort) || 0 }
    const q = draft.id ? supabase.from('items').update(row).eq('id', draft.id) : supabase.from('items').insert(row)
    const { error } = await q
    if (error) return setError(error.message)
    setError('')
    form.reset()
    onSaved()
  }
  return (
    <form className="contact" onSubmit={save} key={draft.id ?? 'new'}>
      <select name="kind" defaultValue={draft.kind}><option value="habit">Habit</option><option value="favorite">Favourite page</option></select>
      <input name="icon" placeholder="Emoji icon" defaultValue={draft.icon} maxLength={8} />
      <input name="title_en" placeholder="Title (EN)" defaultValue={draft.title_en} required maxLength={120} />
      <input name="title_he" placeholder="כותרת (HE)" defaultValue={draft.title_he} dir="rtl" maxLength={120} />
      <textarea name="description_en" placeholder="Description (EN)" defaultValue={draft.description_en} maxLength={500} />
      <textarea name="description_he" placeholder="תיאור (HE)" defaultValue={draft.description_he} dir="rtl" maxLength={500} />
      <input name="url" type="url" placeholder="https://… (optional)" defaultValue={draft.url ?? ''} />
      <input name="sort" type="number" placeholder="Sort" defaultValue={draft.sort} />
      <button className="btn primary">{draft.id ? 'Update' : 'Add'}</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}

function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const load = () => { supabase.from('messages').select('*').order('created_at', { ascending: false }).then((r) => setMessages((r.data ?? []) as Message[])) }
  useEffect(load, [])
  async function remove(id: string) {
    if (!confirm('Delete this message?')) return
    await supabase.from('messages').delete().eq('id', id)
    load()
  }
  return (
    <section>
      <h2>Messages ({messages.length})</h2>
      <ul className="cards">
        {messages.map((m) => (
          <li key={m.id} className="card">
            <h3>{m.name} <em><a href={`mailto:${m.email}`}>{m.email}</a></em></h3>
            <p className="pre">{m.body}</p>
            <small>{new Date(m.created_at).toLocaleString()}</small> <button onClick={() => remove(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Items() {
  const [items, setItems] = useState<Item[]>([])
  const [draft, setDraft] = useState<Draft>(blank)
  const load = () => { fetchItems().then(setItems, () => {}) }
  useEffect(load, [])
  async function remove(id: string) {
    if (!confirm('Delete this item?')) return
    await supabase.from('items').delete().eq('id', id)
    load()
  }
  return (
    <section>
      <h2>Habits & favourites</h2>
      <ItemForm draft={draft} onSaved={() => { setDraft(blank); load() }} />
      <ul className="cards">
        {items.map((i) => (
          <li key={i.id} className="card">
            <small>{i.kind}</small>
            <h3>{i.icon} {i.title_en}</h3>
            <button onClick={() => setDraft({ ...i, url: i.url ?? '' })}>Edit</button> <button onClick={() => remove(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Admin() {
  const session = useSession()
  const signIn = () => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname + '#/admin' } })
  if (session === undefined) return null
  return (
    <main className="admin">
      <nav className="nav"><a href="#top" className="logo">IB<span>.</span></a><span>Admin</span>
        {session && <button onClick={() => supabase.auth.signOut()}>Sign out</button>}
      </nav>
      {!session && <button className="btn primary" onClick={signIn}>Sign in with Google</button>}
      {session && session.user.email !== ADMIN && <p role="alert">{session.user.email} is not the admin.</p>}
      {session?.user.email === ADMIN && <><Items /><Messages /></>}
    </main>
  )
}
