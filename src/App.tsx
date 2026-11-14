import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { degrees, games, impact, jobs, links, principles, projects, skills, testimonials, ui, type Card, type Game, type Lang, stationPage, stationUrl, dayKind, weatherKind, weatherUrl, type WeatherKind } from './content.ts'
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

function Nav({ d, lang, toggleLang, theme, toggleTheme, page, w }: { d: Dict; lang: Lang; toggleLang: () => void; theme: string; toggleTheme: () => void; page: string; w: WeatherData }) {
  return (
    <nav className="nav">
      <a href="#/" className="logo">IB<span>.</span></a>
      <div className="nav-links">
        {Object.entries(d.nav).map(([id, label]) => <a key={id} href={`#/${id}`} aria-current={(page in d.nav ? page : 'about') === id ? 'page' : undefined}>{label}</a>)}
      </div>
      <WeatherPill w={w} />
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
          <a className="btn primary" href="#/contact">{d.cta}</a>
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
      <ul className="cards wide">
        {projects.map((p) => (
          <li key={p.name} className="card project">
            <span className="period">{p.year}</span>
            <h3>{p.name}</h3>
            <p>{p.body[lang]}</p>
            <strong className="muted">{d.highlightsTitle}</strong>
            <ul className="highlights">{p.highlights.map((h) => <li key={h.en}>{h[lang]}</li>)}</ul>
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
            <ul className="chips">{g.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <small>{d.by} <a href={g.repo} target="_blank" rel="noreferrer">{g.author}</a> · ★ {g.stars} {d.stars}</small>
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
  daily: { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[]; precipitation_sum: number[]; cloud_cover_mean: number[] }
}

interface Reading { time: string; humidity: number; temp: number; wind: number; gust: number; pressure: number; rain: number }
interface WeatherData { forecast: Forecast | null; station: Reading | null }

// Fetched once in App and shared by the nav pill and the weather page. Both hide on failure.
function useWeather(): WeatherData {
  const [forecast, setForecast] = useState<Forecast | null>(null)
  const [station, setStation] = useState<Reading | null>(null)
  useEffect(() => {
    fetch(weatherUrl).then((r) => r.json() as Promise<Forecast>).then(setForecast, () => {})
    fetch(stationUrl).then((r) => (r.ok ? (r.json() as Promise<Reading>) : null)).then(setStation, () => {})
  }, [])
  return { forecast, station }
}

const cloud = 'M7 18h9.5a3.5 3.5 0 0 0 .6-6.95A5 5 0 0 0 7.4 10.6 3.7 3.7 0 0 0 7 18z'
const rays = (cx: number, cy: number, r1: number, r2: number, angles: number[]) => angles.map((a) => {
  const rad = (a * Math.PI) / 180
  return <line key={a} x1={cx + r1 * Math.cos(rad)} y1={cy + r1 * Math.sin(rad)} x2={cx + r2 * Math.cos(rad)} y2={cy + r2 * Math.sin(rad)} />
})

// Original outline icons, stroke = currentColor so they follow the theme.
function WeatherIcon({ k, size = 28 }: { k: WeatherKind; size?: number }) {
  const up = k === 'fog' || k === 'rain' || k === 'snow' || k === 'storm' // cloud sits higher to leave room below
  return (
    <svg className="wx" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={k}>
      {k === 'sun' && <><circle cx="12" cy="12" r="4" />{rays(12, 12, 6.5, 9, [0, 45, 90, 135, 180, 225, 270, 315])}</>}
      {k === 'partly' && <><circle cx="9" cy="8" r="3" />{rays(9, 8, 4.8, 6.6, [180, 225, 270, 315])}<path d={cloud} transform="translate(1.5 1)" /></>}
      {k !== 'sun' && k !== 'partly' && <path d={cloud} transform={up ? 'translate(0 -4)' : undefined} />}
      {k === 'fog' && <><line x1="5" y1="17.5" x2="19" y2="17.5" /><line x1="7" y1="20.5" x2="17" y2="20.5" /></>}
      {k === 'rain' && [8, 12, 16].map((x) => <line key={x} x1={x} y1="16.5" x2={x - 1.5} y2="20.5" />)}
      {k === 'snow' && [8, 12, 16].map((x) => <circle key={x} cx={x} cy={18.5} r="0.6" fill="currentColor" />)}
      {k === 'storm' && <path d="M12.5 15l-2 3.5h3l-2 3.5" />}
    </svg>
  )
}

function WeatherPill({ w }: { w: WeatherData }) {
  if (!w.forecast && !w.station) return null
  return (
    <a href="#/weather" className="weather-pill" aria-label="Weather">
      {w.forecast && <span><WeatherIcon k={weatherKind(w.forecast.current.weather_code)} size={18} /> {Math.round(w.forecast.current.temperature_2m)}°</span>}
      {w.station && <span>📡 {w.station.temp.toFixed(1)}°</span>}
    </a>
  )
}

function Station({ d, r }: { d: Dict; r: Reading }) {
  return (
    <div className="card weather">
      <h3>📡 {d.stationTitle}</h3>
      <b>{r.temp.toFixed(1)}°</b>
      <p>{d.weatherHumidity} {r.humidity}% · {d.weatherWind} {Math.round(r.wind)} km/h ({d.stationGust} {Math.round(r.gust)}) · {d.stationRain} {r.rain} mm · {d.stationPressure} {Math.round(r.pressure)} hPa</p>
      <small>{d.stationAt} {new Date(r.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · <a href={stationPage} target="_blank" rel="noreferrer">Weather Underground</a></small>
    </div>
  )
}

function Forecast({ d, f }: { d: Dict; f: Forecast }) {
  const c = f.current
  return (
    <div className="card weather">
      <h3>{d.weatherTitle}</h3>
      <span className="weather-icon"><WeatherIcon k={weatherKind(c.weather_code)} size={48} /></span>
      <b>{Math.round(c.temperature_2m)}°</b>
      <p>↑ {Math.round(f.daily.temperature_2m_max[0])}° ↓ {Math.round(f.daily.temperature_2m_min[0])}° · {d.weatherWind} {Math.round(c.wind_speed_10m)} km/h · {d.weatherHumidity} {c.relative_humidity_2m}%</p>
      <small><a href="https://open-meteo.com/" target="_blank" rel="noreferrer">{d.weatherSource}</a></small>
    </div>
  )
}

const monthCols = ['rain', 'rainy_days', 'wettest_day', 'temp_avg', 'temp_high_avg', 'temp_low_avg', 'temp_high', 'temp_low', 'humidity_avg', 'dewpt_avg', 'wind_avg', 'gust_max'] as const
type Month = Record<(typeof monthCols)[number] | 'pressure_min' | 'pressure_max' | 'days', number | null> & { month: string }
const monthName = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) => new Date(iso).toLocaleDateString(lang === 'he' ? 'he-IL' : 'en-GB', opts)

function Week({ d, lang, f }: { d: Dict; lang: Lang; f: Forecast }) {
  return (
    <div className="card">
      <h3>{d.weekTitle}</h3>
      <ol className="week">{f.daily.time.map((day, i) => (
        <li key={day}>
          <small>{monthName(day, lang, { weekday: 'short' })}</small>
          <span><WeatherIcon k={dayKind(f.daily.weather_code[i], f.daily.precipitation_sum[i], f.daily.cloud_cover_mean[i])} size={30} /></span>
          <b>{Math.round(f.daily.temperature_2m_max[i])}°</b>
          <small>{Math.round(f.daily.temperature_2m_min[i])}° · 💧{f.daily.precipitation_probability_max[i]}%</small>
        </li>
      ))}</ol>
    </div>
  )
}

// Single-series bar chart in plain CSS: one bar per month, native title tooltip, the largest bar labelled.
// lo makes it a floating range bar. The table below is its accessible table view.
function Bars({ title, rows, color }: { title: string; rows: { label: string; tip: string; hi: number; lo?: number }[]; color: string }) {
  // Range bars start just below the coldest month; magnitude bars start at 0.
  const min = rows.some((r) => r.lo !== undefined) ? Math.floor(Math.min(...rows.map((r) => r.lo ?? 0))) - 2 : 0
  const range = Math.max(...rows.map((r) => r.hi)) - min || 1
  const top = rows.reduce((a, r) => (r.hi > a.hi ? r : a), rows[0])
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <div className="bars">{rows.map((r) => (
        <div key={r.label} className="slot" title={r.tip}>
          <div className="bar" style={{ background: color, height: `${((r.hi - (r.lo ?? min)) / range) * 100}%`, marginBottom: `${(((r.lo ?? min) - min) / range) * 100}%` }}>
            {r === top && <span>{r.hi}</span>}
          </div>
          <small>{r.label}</small>
        </div>
      ))}</div>
    </figure>
  )
}

// Table columns in display order; 'pressure_max' sorts the pressure range column.
const sortCols = ['month', ...monthCols, 'pressure_max', 'days'] as const
type SortKey = (typeof sortCols)[number]

function MonthTable({ d, lang, rows }: { d: Dict; lang: Lang; rows: Month[] }) {
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: 'month', asc: false })
  const val = (m: Month) => m[sort.key] ?? -Infinity
  const sorted = [...rows].sort((x, y) => (val(x) < val(y) ? -1 : val(x) > val(y) ? 1 : 0) * (sort.asc ? 1 : -1))
  const toggle = (key: SortKey) => setSort((s) => ({ key, asc: s.key === key ? !s.asc : key === 'month' }))
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{d.historyCols.map((c, i) => {
          const key = sortCols[i]
          const on = sort.key === key
          return <th key={c} aria-sort={on ? (sort.asc ? 'ascending' : 'descending') : undefined}><button className="sort" onClick={() => toggle(key)}>{c} {on ? (sort.asc ? '▲' : '▼') : ''}</button></th>
        })}</tr></thead>
        <tbody>{sorted.map((m) => (
          <tr key={m.month}><th>{monthName(m.month, lang, { month: 'short', year: 'numeric' })}</th>{monthCols.map((k) => <td key={k}>{m[k] ?? '–'}</td>)}<td>{m.pressure_min ?? '–'}–{m.pressure_max ?? '–'}</td><td>{m.days}</td></tr>
        ))}</tbody>
      </table>
    </div>
  )
}

// Rain total per rain season (Oct–Sep, how rainfall is compared in Israel); under 330 recorded days is starred as partial.
const season = (iso: string) => {
  const y = Number(iso.slice(0, 4)) - (Number(iso.slice(5, 7)) < 10 ? 1 : 0)
  return `${y}/${String(y + 1).slice(2)}`
}

function seasonRain(months: Month[], d: Dict) {
  const by = new Map<string, { rain: number; days: number }>()
  for (const m of months) {
    const s = by.get(season(m.month)) ?? { rain: 0, days: 0 }
    by.set(season(m.month), { rain: s.rain + (m.rain ?? 0), days: s.days + (m.days ?? 0) })
  }
  return [...by].sort().map(([k, v]) => ({ label: v.days < 330 ? `${k}*` : k, tip: `${k}: ${v.rain.toFixed(1)} mm · ${v.days} ${d.daysRecorded}`, hi: Math.round(v.rain) }))
}

// Avg temperature per month (Oct→Sep), one line per season. Colour is fixed by season order (oldest = slot 1),
// so a season keeps its colour; lines are direct-labelled at their last point and dots carry title tooltips.
function SeasonTemps({ d, lang, months }: { d: Dict; lang: Lang; months: Month[] }) {
  const order = [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8] // month index Oct..Sep
  const seasons = [...new Set(months.map((m) => season(m.month)))].sort()
  const temps = months.filter((m) => m.temp_avg !== null).map((m) => m.temp_avg as number)
  const lo = Math.floor(Math.min(...temps)) - 1, hi = Math.ceil(Math.max(...temps)) + 1
  const x = (i: number) => 40 + i * 48, y = (t: number) => 190 - ((t - lo) / (hi - lo)) * 170
  const line = (sn: string) => order.map((mi, i) => ({ i, m: months.find((m) => season(m.month) === sn && Number(m.month.slice(5, 7)) === mi + 1) })).filter((p) => p.m?.temp_avg != null)
  // Direct labels at each line's end, nudged apart so lines ending close together don't overprint.
  const labels = seasons.map((sn, si) => { const l = line(sn).at(-1); return l ? { sn, si, x: x(l.i) + 7, y: y(l.m!.temp_avg!) + 4 } : null }).filter((l) => l !== null).sort((a, b) => a.x - b.x || a.y - b.y)
  labels.forEach((l, k) => { const prev = labels[k - 1]; if (prev && prev.x === l.x && l.y - prev.y < 11) l.y = prev.y + 11 })
  return (
    <figure className="chart">
      <figcaption>{d.seasonTempChart}</figcaption>
      <ul className="legend">{seasons.map((sn, i) => <li key={sn}><i style={{ background: `var(--s${(i % 5) + 1})` }} />{sn}</li>)}</ul>
      <svg viewBox="0 0 640 215" direction="ltr" role="img" aria-label={d.seasonTempChart}>
        {[0, 1, 2, 3].map((g) => { const t = lo + ((hi - lo) * g) / 3; return <g key={g}><line x1="40" x2="600" y1={y(t)} y2={y(t)} className="grid" /><text x="34" y={y(t) + 4} textAnchor="end">{Math.round(t)}°</text></g> })}
        {order.map((mi, i) => <text key={mi} x={x(i)} y="210" textAnchor="middle">{monthName(`2000-${String(mi + 1).padStart(2, '0')}-01`, lang, { month: 'short' })}</text>)}
        {seasons.map((sn, si) => {
          const pts = line(sn)
          const color = `var(--s${(si % 5) + 1})`
          return <g key={sn}>
            <polyline points={pts.map((p) => `${x(p.i)},${y(p.m!.temp_avg!)}`).join(' ')} fill="none" stroke={color} strokeWidth="2" />
            {pts.map((p) => <circle key={p.i} cx={x(p.i)} cy={y(p.m!.temp_avg!)} r="4" fill={color} className="dot"><title>{`${sn} · ${monthName(p.m!.month, lang, { month: 'short', year: 'numeric' })}: ${p.m!.temp_avg}°`}</title></circle>)}
          </g>
        })}
        {labels.map((l) => <text key={l.sn} x={l.x} y={l.y} className="direct">{l.sn}</text>)}
      </svg>
    </figure>
  )
}

function History({ d, lang }: { d: Dict; lang: Lang }) {
  const [months, setMonths] = useState<Month[]>([])
  const [year, setYear] = useState('')
  useEffect(() => { void supabase.from('station_monthly').select('*').order('month', { ascending: false }).then((r) => setMonths((r.data ?? []) as Month[])) }, [])
  if (!months.length) return null
  const years = [...new Set(months.map((m) => m.month.slice(0, 4)))]
  const shown = months.filter((m) => m.month.startsWith(year || years[0]))
  const asc = [...shown].reverse()
  const label = (m: Month) => monthName(m.month, lang, { month: 'short' })
  return (
    <div className="history">
      <h3>{d.historyTitle}</h3>
      <div className="charts">
        <Bars title={d.yearChart} color="var(--rain)" rows={seasonRain(months, d)} />
        <SeasonTemps d={d} lang={lang} months={months} />
      </div>
      <div className="chips">{years.map((y) => <button key={y} aria-pressed={y === (year || years[0])} onClick={() => setYear(y)}>{y}</button>)}</div>
      <p className="muted">🌧️ {shown.reduce((sum, m) => sum + (m.rain ?? 0), 0).toFixed(1)} mm {d.historyTotal}</p>
      <div className="charts">
        <Bars title={d.rainChart} color="var(--rain)" rows={asc.map((m) => ({ label: label(m), tip: `${label(m)}: ${m.rain ?? 0} mm, ${m.rainy_days} days`, hi: m.rain ?? 0 }))} />
        <Bars title={d.tempChart} color="var(--heat)" rows={asc.map((m) => ({ label: label(m), tip: `${label(m)}: ${m.temp_low_avg}° → ${m.temp_high_avg}°`, hi: m.temp_high_avg ?? 0, lo: m.temp_low_avg ?? 0 }))} />
      </div>
      <MonthTable d={d} lang={lang} rows={shown} />
    </div>
  )
}

function Weather({ d, lang, w }: { d: Dict; lang: Lang; w: WeatherData }) {
  return (
    <section id="weather">
      <h2>{d.nav.weather}</h2>
      <div className="weather-cards">
        {w.forecast && <Forecast d={d} f={w.forecast} />}
        {w.station && <Station d={d} r={w.station} />}
      </div>
      {w.forecast && <Week d={d} lang={lang} f={w.forecast} />}
      <History d={d} lang={lang} />
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
                <span className="item-icon" aria-hidden="true">{i.icon}</span>
                <h3>{(lang === 'he' && i.title_he) || i.title_en}</h3>
                <p>{(lang === 'he' && i.description_he) || i.description_en}</p>
                {i.url && <small className="host"><img src={`https://icons.duckduckgo.com/ip3/${new URL(i.url).hostname}.ico`} alt="" width={16} height={16} loading="lazy" /> {new URL(i.url).hostname.replace(/^www\./, '')} ↗</small>}
              </>
            )
            return <li key={i.id} className="card item">{i.url ? <a href={i.url} target="_blank" rel="noreferrer">{body}</a> : body}</li>
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

export function App({ page }: { page: string }) {
  const [lang, toggleLang] = useLang()
  const [theme, toggleTheme] = useTheme()
  const [items, setItems] = useState<Item[]>([])
  const w = useWeather()
  useEffect(() => { fetchItems().then(setItems, () => {}) }, [])
  useEffect(() => { scrollTo(0, 0) }, [page])
  const d = ui[lang]
  // ponytail: home (#/, #/about and any unknown hash) is the bio; the rest are one page each.
  const bio = <><Hero d={d} /><About d={d} /><Cards id="leadership" title={d.principlesTitle} cards={principles} lang={lang} /><Cards id="impact" title={d.impactTitle} cards={impact} lang={lang} /><Career d={d} lang={lang} /><Testimonials d={d} lang={lang} /><Education d={d} lang={lang} /></>
  const pages: Record<string, ReactNode> = {
    projects: <Projects d={d} lang={lang} />,
    games: <Games d={d} lang={lang} />,
    favorites: <ItemList id="favorites" title={d.favoritesTitle} items={items.filter((i) => i.kind === 'favorite')} lang={lang} empty={d.empty} />,
    habits: <ItemList id="habits" title={d.habitsTitle} items={items.filter((i) => i.kind === 'habit')} lang={lang} empty={d.empty} />,
    weather: <Weather d={d} lang={lang} w={w} />,
    contact: <Contact d={d} />,
  }
  return (
    <>
      <Nav d={d} lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme} page={page} w={w} />
      <main>{pages[page] ?? bio}</main>
      <Footer d={d} />
    </>
  )
}
