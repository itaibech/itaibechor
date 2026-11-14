import { useEffect, useRef, useState, type FormEvent } from 'react'
import { degrees, games, impact, jobs, links, principles, projects, skills, testimonials, ui, type Card, type Game, type Lang, stationPage, stationUrl, weatherIcon, weatherUrl } from './content.ts'
import { bump, fetchItems, supabase, type Item, type Stats } from './supabase.ts'

type Dict = (typeof ui)[Lang]
const avatar = 'https://github.com/itaibech.png?size=240'

function useLang(): [Lang, () => void] {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') === 'he' ? 'he' : 'en'))
  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])
  return [lang, () => setLang(lang === 'en' ? 'he' : 'en')]
}

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') ?? 'dark')
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}

function Nav({ d, lang, toggleLang, theme, toggleTheme }: { d: Dict; lang: Lang; toggleLang: () => void; theme: string; toggleTheme: () => void }) {
  return (
    <nav className="nav">
      <a href="#top" className="logo">IB<span>.</span></a>
      <div className="nav-links">
        {Object.entries(d.nav).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </div>
      <button onClick={toggleLang} aria-label="Switch language">{lang === 'en' ? 'עב' : 'EN'}</button>
      <button onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☀︎' : '☾'}</button>
    </nav>
  )
}

function Hero({ d }: { d: Dict }) {
  return (
    <header id="top" className="hero">
      <div className="hero-text">
        <h1>{d.tagline[0]} <mark>{d.tagline[1]}</mark> {d.tagline[2]}</h1>
        <div className="me">
          <img src={avatar} alt={d.name} width={72} height={72} />
          <div>
            <small>{d.hello}</small>
            <strong className="signature">{d.name}</strong>
            <p>{d.headline}</p>
          </div>
        </div>
        <p className="intro">{d.intro}</p>
        <div className="actions">
          <a className="btn primary" href="#contact">{d.cta}</a>
          <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn" href={links.youtube} target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
      <div className="orb" aria-hidden="true" />
      <ul className="stats">
        {d.stats.map(([n, label]) => <li key={label}><b>{n}</b>{label}</li>)}
      </ul>
    </header>
  )
}

function About({ d }: { d: Dict }) {
  return (
    <section id="about">
      <h2>{d.aboutTitle}</h2>
      <ul className="cards">{d.about.map((p) => <li key={p} className="card">{p}</li>)}</ul>
      <ul className="chips">{skills.map((s) => <li key={s}>{s}</li>)}</ul>
    </section>
  )
}

function Cards({ id, title, cards, lang }: { id: string; title: string; cards: Card[]; lang: Lang }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      <ul className="cards">
        {cards.map((c) => (
          <li key={c.title.en} className="card">
            <h3><span className="icon" aria-hidden="true">{c.icon}</span> {c.title[lang]}</h3>
            <p>{c.body[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Testimonials({ d, lang }: { d: Dict; lang: Lang }) {
  return (
    <section id="testimonials">
      <h2>{d.testimonialsTitle}</h2>
      <ul className="cards quotes">
        {testimonials.map((q) => (
          <li key={q.name} className="card">
            <blockquote dir="ltr">“{q.quote}”</blockquote>
            <p><strong>{q.name}</strong> · {q.relation[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Projects({ d, lang }: { d: Dict; lang: Lang }) {
  return (
    <section id="projects">
      <h2>{d.projectsTitle}</h2>
      <ul className="cards">
        {projects.map((p) => (
          <li key={p.name} className="card project">
            <h3>{p.name}</h3>
            <p>{p.body[lang]}</p>
            <ul className="chips">{p.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <div className="project-links">
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">{d.code} ↗</a>}
              {p.live && <a href={p.live} target="_blank" rel="noreferrer">{d.live} ↗</a>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Games({ d, lang }: { d: Dict; lang: Lang }) {
  const [game, setGame] = useState<Game | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (game) dialog.current?.showModal() }, [game])
  return (
    <section id="games">
      <h2>{d.gamesTitle}</h2>
      <p className="muted">{d.gamesIntro}</p>
      <ul className="cards">
        {games.map((g) => (
          <li key={g.name} className="card project">
            <h3><span className="icon" aria-hidden="true">{g.icon}</span> {g.name}</h3>
            <p>{g.body[lang]}</p>
            <small>{d.by} <a href={g.repo} target="_blank" rel="noreferrer">{g.author}</a></small>
            <div className="project-links"><button className="btn primary" onClick={() => setGame(g)}>▶ {d.play}</button></div>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} className="game" onClose={() => setGame(null)}>
        {game && (
          <>
            <div className="game-bar"><strong>{game.icon} {game.name}</strong><button onClick={() => dialog.current?.close()} autoFocus>✕ {d.close}</button></div>
            <iframe src={game.src} title={game.name} allow="fullscreen" sandbox="allow-scripts allow-same-origin" />
          </>
        )}
      </dialog>
    </section>
  )
}

function Career({ d, lang }: { d: Dict; lang: Lang }) {
  return (
    <section id="career">
      <h2>{d.careerTitle}</h2>
      <ol className="timeline">
        {jobs.map((j) => (
          <li key={j.role.en + j.period}>
            <span className="period">{j.period}</span>
            <h3>{j.role[lang]} <em>@ {j.company}</em></h3>
            <ul>{j.points.map((p) => <li key={p.en}>{p[lang]}</li>)}</ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Education({ d, lang }: { d: Dict; lang: Lang }) {
  return (
    <section id="education">
      <h2>{d.educationTitle}</h2>
      <ul className="cards">
        {degrees.map((g) => (
          <li key={g.title.en} className="card">
            <span className="period">{g.period}</span>
            <h3>{g.title[lang]}</h3>
            <p>{g.school[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

interface Forecast {
  current: { temperature_2m: number; relative_humidity_2m: number; weather_code: number; wind_speed_10m: number }
  daily: { temperature_2m_max: number[]; temperature_2m_min: number[] }
}

interface Reading { time: string; humidity: number; temp: number; wind: number; gust: number; pressure: number; rain: number }

function Station({ d }: { d: Dict }) {
  const [r, setR] = useState<Reading | null>(null)
  useEffect(() => { fetch(stationUrl).then((x) => (x.ok ? (x.json() as Promise<Reading>) : null)).then(setR, () => {}) }, [])
  if (!r) return null // station offline or key not set
  return (
    <div className="card weather">
      <h3>📡 {d.stationTitle}</h3>
      <b>{r.temp.toFixed(1)}°</b>
      <p>{d.weatherHumidity} {r.humidity}% · {d.weatherWind} {Math.round(r.wind)} km/h ({d.stationGust} {Math.round(r.gust)}) · {d.stationRain} {r.rain} mm · {d.stationPressure} {Math.round(r.pressure)} hPa</p>
      <small>{d.stationAt} {new Date(r.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · <a href={stationPage} target="_blank" rel="noreferrer">Weather Underground</a></small>
    </div>
  )
}

function Weather({ d }: { d: Dict }) {
  const [w, setW] = useState<Forecast | null>(null)
  useEffect(() => { fetch(weatherUrl).then((r) => r.json() as Promise<Forecast>).then(setW, () => {}) }, [])
  if (!w) return null // ponytail: hide on failure, it's a nice-to-have
  const c = w.current
  return (
    <section id="weather">
      <h2>{d.weatherTitle}</h2>
      <div className="card weather">
        <span className="weather-icon" aria-hidden="true">{weatherIcon(c.weather_code)}</span>
        <b>{Math.round(c.temperature_2m)}°</b>
        <p>↑ {Math.round(w.daily.temperature_2m_max[0])}° ↓ {Math.round(w.daily.temperature_2m_min[0])}° · {d.weatherWind} {Math.round(c.wind_speed_10m)} km/h · {d.weatherHumidity} {c.relative_humidity_2m}%</p>
        <small><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">{d.weatherSource}</a></small>
      </div>
      <Station d={d} />
    </section>
  )
}

function ItemList({ id, title, items, lang, empty }: { id: string; title: string; items: Item[]; lang: Lang; empty: string }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {items.length === 0 ? <p className="muted">{empty}</p> : (
        <ul className="cards">
          {items.map((i) => {
            const body = (
              <>
                <h3>{i.icon} {(lang === 'he' && i.title_he) || i.title_en}</h3>
                <p>{(lang === 'he' && i.description_he) || i.description_en}</p>
              </>
            )
            return <li key={i.id} className="card">{i.url ? <a href={i.url} target="_blank" rel="noreferrer">{body}</a> : body}</li>
          })}
        </ul>
      )}
    </section>
  )
}

function Contact({ d }: { d: Dict }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return setStatus('sent') // honeypot: bots fill hidden fields
    setStatus('sending')
    const { error } = await supabase.from('messages').insert({ name: String(f.get('name')), email: String(f.get('email')), body: String(f.get('body')) })
    setStatus(error ? 'error' : 'sent')
  }
  return (
    <section id="contact">
      <h2>{d.contactTitle}</h2>
      {status === 'sent' ? <p className="card">{d.sent}</p> : (
        <form className="contact" onSubmit={submit}>
          <input name="name" placeholder={d.contactName} aria-label={d.contactName} required maxLength={100} />
          <input name="email" type="email" placeholder={d.contactEmail} aria-label={d.contactEmail} required maxLength={200} />
          <textarea name="body" placeholder={d.contactBody} aria-label={d.contactBody} required maxLength={2000} rows={5} />
          <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="btn primary" disabled={status === 'sending'}>{d.send}</button>
          {status === 'error' && <p role="alert">{d.error}</p>}
        </form>
      )}
    </section>
  )
}

function Footer({ d }: { d: Dict }) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [liked, setLiked] = useState(() => localStorage.getItem('liked') === '1')
  useEffect(() => {
    // One view per browser session; StrictMode double-mount would otherwise count twice in dev.
    const counted = sessionStorage.getItem('viewed')
    sessionStorage.setItem('viewed', '1')
    const load = counted ? supabase.from('stats').select('views,likes').single().then((r) => r.data as Stats) : bump('views')
    load.then(setStats, () => {})
  }, [])
  async function like() {
    setLiked(true)
    localStorage.setItem('liked', '1')
    setStats(await bump('likes'))
  }
  return (
    <footer>
      <div className="social">
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={links.facebook} target="_blank" rel="noreferrer">Facebook</a>
        <a href={links.youtube} target="_blank" rel="noreferrer">YouTube</a>
      </div>
      <div className="counter">
        {stats && <span>👁 {stats.views.toLocaleString()} {d.views}</span>}
        <button className="like" onClick={like} disabled={liked} aria-label={d.like}>♥ {stats?.likes ?? ''}</button>
      </div>
      <small>© {new Date().getFullYear()} Itai Bechor · {d.footer}</small>
    </footer>
  )
}

export function App() {
  const [lang, toggleLang] = useLang()
  const [theme, toggleTheme] = useTheme()
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => { fetchItems().then(setItems, () => {}) }, [])
  const d = ui[lang]
  return (
    <>
      <Nav d={d} lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero d={d} />
        <About d={d} />
        <Cards id="leadership" title={d.principlesTitle} cards={principles} lang={lang} />
        <Cards id="impact" title={d.impactTitle} cards={impact} lang={lang} />
        <Career d={d} lang={lang} />
        <Testimonials d={d} lang={lang} />
        <Projects d={d} lang={lang} />
        <Games d={d} lang={lang} />
        <Education d={d} lang={lang} />
        <Weather d={d} />
        <ItemList id="habits" title={d.habitsTitle} items={items.filter((i) => i.kind === 'habit')} lang={lang} empty={d.empty} />
        <ItemList id="favorites" title={d.favoritesTitle} items={items.filter((i) => i.kind === 'favorite')} lang={lang} empty={d.empty} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
    </>
  )
}
