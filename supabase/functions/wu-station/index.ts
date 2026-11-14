// Proxies the current reading of Itai's Weather Underground station so the API key stays server-side.
// Secret: `npx supabase secrets set WU_API_KEY=...`. Deploy: `npx supabase functions deploy wu-station --no-verify-jwt`.
const station = 'IKFARS3'
const allowed = ['https://itaibech.github.io', 'http://localhost:5190']

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') ?? ''
  const headers = {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300', // ponytail: browser/CDN cache only; add a DB cache if WU quota (1500/day) is ever hit
  }
  const key = Deno.env.get('WU_API_KEY')
  if (!key) return new Response('{"error":"WU_API_KEY not set"}', { status: 503, headers })
  const r = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=m&numericPrecision=decimal&apiKey=${key}`)
  if (!r.ok) return new Response(JSON.stringify({ error: `WU ${r.status}` }), { status: 502, headers })
  const o = (await r.json()).observations?.[0]
  if (!o) return new Response('{"error":"no observation"}', { status: 502, headers })
  const m = o.metric
  return new Response(JSON.stringify({
    time: o.obsTimeUtc, humidity: o.humidity, temp: m.temp, wind: m.windSpeed, gust: m.windGust,
    pressure: m.pressure, rain: m.precipTotal,
  }), { headers })
})
