-- Daily summaries of the home weather station (WU IKFARS3), filled by the wu-station edge function (sync mode).
-- raw = the WU /v2/pws/history/daily observation, kept whole so new stats need only a view change.
create table public.station_daily (
  day date primary key,
  raw jsonb not null,
  synced_at timestamptz not null default now()
);
alter table public.station_daily enable row level security;
create policy "public read" on public.station_daily for select using (true);
grant select on public.station_daily to anon, authenticated;

create view public.station_monthly with (security_invoker = true) as
select date_trunc('month', day)::date as month,
  count(*) as days,
  round(sum(rain), 1) as rain,
  count(*) filter (where rain >= 0.2) as rainy_days,
  round(max(rain), 1) as wettest_day,
  max(temp_high) as temp_high,
  min(temp_low) as temp_low,
  round(avg(temp_avg), 1) as temp_avg,
  round(avg(temp_high), 1) as temp_high_avg,
  round(avg(temp_low), 1) as temp_low_avg,
  round(avg(humidity), 0) as humidity_avg,
  round(avg(dewpt), 1) as dewpt_avg,
  round(avg(wind_avg), 1) as wind_avg,
  max(gust) as gust_max,
  max(pressure_max) as pressure_max,
  min(pressure_min) as pressure_min,
  max(solar) as solar_max,
  max(uv) as uv_max
from (
  select day,
    (raw->'metric'->>'precipTotal')::numeric as rain,
    (raw->'metric'->>'tempHigh')::numeric as temp_high,
    (raw->'metric'->>'tempLow')::numeric as temp_low,
    (raw->'metric'->>'tempAvg')::numeric as temp_avg,
    (raw->>'humidityAvg')::numeric as humidity,
    (raw->'metric'->>'dewptAvg')::numeric as dewpt,
    (raw->'metric'->>'windspeedAvg')::numeric as wind_avg,
    (raw->'metric'->>'windgustHigh')::numeric as gust,
    (raw->'metric'->>'pressureMax')::numeric as pressure_max,
    (raw->'metric'->>'pressureMin')::numeric as pressure_min,
    (raw->>'solarRadiationHigh')::numeric as solar,
    (raw->>'uvHigh')::numeric as uv
  from public.station_daily
) d
group by 1;
grant select on public.station_monthly to anon, authenticated;

-- Daily sync is scheduled outside this repo (the cron job holds the sync token): pg_cron + pg_net.
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Shared cache of the live reading so all visitors share one WU call per 5 minutes. Service role only (no policies).
create table public.station_current (
  id int primary key default 1 check (id = 1),
  reading jsonb not null,
  fetched_at timestamptz not null default now()
);
alter table public.station_current enable row level security;
