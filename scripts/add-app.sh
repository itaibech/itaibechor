#!/usr/bin/env bash
# Register another app on this shared Supabase project (one Postgres schema per app).
# Usage: SUPABASE_ACCESS_TOKEN=sbp_... scripts/add-app.sh <schema> [redirect-url ...] [-- app.sql ...]
#   - creates the schema with anon/authenticated/service_role grants
#   - adds it to the API's exposed schemas
#   - adds redirect URLs (e.g. https://app.vercel.app/**) to Auth's allow list
#   - runs the app's SQL files (each should `set search_path to <schema>, public;`)
# Infra steps are idempotent; app SQL files run as-is (only pass them once).
# Needs curl, jq, `npx supabase login`, and a token from https://supabase.com/dashboard/account/tokens
set -euo pipefail
REF=hyeslwlewvvjiyizoduf
SCHEMA=${1:?schema name required}; shift
[[ $SCHEMA =~ ^[a-z_][a-z0-9_]*$ ]] || { echo "bad schema name: $SCHEMA" >&2; exit 1; }
URLS=(); while [[ $# -gt 0 && $1 != -- ]]; do URLS+=("$1"); shift; done; [[ ${1:-} == -- ]] && shift
: "${SUPABASE_ACCESS_TOKEN:?set SUPABASE_ACCESS_TOKEN}"

api() { curl -fsS -X "$1" "https://api.supabase.com/v1/projects/$REF/$2" -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" -H 'Content-Type: application/json' ${3:+-d "$3"}; }
sql() { npx -y supabase db query --remote="$REF" --yes "$@" >/dev/null; }

sql "create schema if not exists $SCHEMA;
grant usage on schema $SCHEMA to anon, authenticated, service_role;
grant all on all tables in schema $SCHEMA to anon, authenticated, service_role;
grant all on all sequences in schema $SCHEMA to anon, authenticated, service_role;
alter default privileges in schema $SCHEMA grant all on tables to anon, authenticated, service_role;
alter default privileges in schema $SCHEMA grant all on sequences to anon, authenticated, service_role;"

schemas=$(api GET postgrest | jq -r '.db_schema')
[[ ,$schemas, == *",$SCHEMA,"* ]] || api PATCH postgrest "$(jq -n --arg s "$schemas,$SCHEMA" '{db_schema:$s}')" >/dev/null

if [[ ${#URLS[@]} -gt 0 ]]; then
  allow=$(api GET config/auth | jq -r '.uri_allow_list // ""')
  for u in "${URLS[@]}"; do [[ ,$allow, == *",$u,"* ]] || allow=${allow:+$allow,}$u; done
  api PATCH config/auth "$(jq -n --arg a "$allow" '{uri_allow_list:$a}')" >/dev/null
fi

for f in "$@"; do echo "applying $f"; sql -f "$f"; done
echo "done: schema '$SCHEMA' exposed. Client: createClient(url, anonKey, { db: { schema: '$SCHEMA' } })"
