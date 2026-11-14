// Itai's Weather Underground station (IKFARS3), with the API key kept server-side.
//   GET                      → live reading, cached in station_current for 5 min (one WU call per 5 min for everyone)
//   GET ?sync&to=YYYY-MM-DD&days=N  (header x-sync-token) → upsert N daily summaries ending at `to` into station_daily
// Secrets: WU_API_KEY, SYNC_TOKEN. Deploy: `npx supabase functions deploy wu-station --no-verify-jwt`.
const station = 'IKFARS3'
const allowed = ['https://itaibech.github.io', 'http://localhost:5190']
const db = `${Deno.env.get('SUPABASE_URL')}/rest/v1`
const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const dbHeaders = { apikey: service, Authorization: `Bearer ${service}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }
const wu = (path: string) => fetch(`https://api.weather.com/v2/pws/${path}&stationId=${station}&format=json&units=m&numericPrecision=decimal&apiKey=${Deno.env.get('WU_API_KEY')}`)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function current(): Promise<unknown> {
  const cached = await (await fetch(`${db}/station_current?id=eq.1&select=reading,fetched_at`, { headers: dbHeaders })).json()
  if (cached[0] && Date.now() - Date.parse(cached[0].fetched_at) < 5 * 60_000) return cached[0].reading
  const r = await wu('observations/current?')
  const o = r.ok ? (await r.json()).observations?.[0] : null
  if (!o) return cached[0]?.reading ?? null // WU down: serve stale rather than nothing
  const m = o.metric
  const reading = { time: o.obsTimeUtc, humidity: o.humidity, temp: m.temp, wind: m.windSpeed, gust: m.windGust, pressure: m.pressure, rain: m.precipTotal }
  await fetch(`${db}/station_current`, { method: 'POST', headers: dbHeaders, body: JSON.stringify({ id: 1, reading, fetched_at: new Date().toISOString() }) })
  return reading
}

// WU allows 30 calls/min, hence the 2.1 s pause. Returns how many days had data (0 = before the station existed).
async function sync(to: string, days: number): Promise<number> {
  const rows = []
  for (let i = 0; i < days; i++) {
    const day = new Date(Date.parse(to) - i * 86_400_000).toISOString().slice(0, 10)
    const r = await wu(`history/daily?date=${day.replaceAll('-', '')}`)
    const o = r.ok && r.status !== 204 ? (await r.json()).observations?.[0] : null
    if (o) rows.push({ day, raw: o, synced_at: new Date().toISOString() })
    await sleep(2100)
  }
  if (rows.length) await fetch(`${db}/station_daily`, { method: 'POST', headers: dbHeaders, body: JSON.stringify(rows) })
  return rows.length
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') ?? ''
  const headers = { 'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0], 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', Vary: 'Origin' }
  const url = new URL(req.url)
  if (url.searchParams.has('sync')) {
    if (req.headers.get('x-sync-token') !== Deno.env.get('SYNC_TOKEN')) return new Response('{"error":"forbidden"}', { status: 403, headers })
    const to = url.searchParams.get('to') ?? new Date().toISOString().slice(0, 10)
    const synced = await sync(to, Math.min(Number(url.searchParams.get('days')) || 3, 50))
    return new Response(JSON.stringify({ to, synced }), { headers: { ...headers, 'Cache-Control': 'no-store' } })
  }
  const reading = await current()
  return reading ? new Response(JSON.stringify(reading), { headers }) : new Response('{"error":"unavailable"}', { status: 502, headers })
})
