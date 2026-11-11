# itaibechor

Personal site of Itai Bechor — live at **https://itaibech.github.io/itaibechor/**

- Vite + React + TypeScript, plain CSS, English/Hebrew (RTL) and dark/light toggles.
- Supabase project `itaibechor-site` (`hyeslwlewvvjiyizoduf`, Frankfurt): habits & favourite pages, contact messages, view/like counter. RLS is the only security boundary — see `supabase/migrations`.
- Career & education text lives in `src/content.ts`.
- Admin: `/#/admin`, Google sign-in as `itai.bechor@gmail.com` → add/edit habits & favourites, read messages.

## Develop

```bash
npm install
npm run dev     # http://localhost:5173/itaibechor/
npm test
```

## Deploy

Push to `main` → GitHub Actions tests, builds and publishes to Pages.
DB changes: add a file under `supabase/migrations`, then `npx supabase db push --remote` (DB password is in the macOS keychain item `supabase-db-itaibechor`).

## Shared project: hosting other apps

`itaibechor-site` doubles as a shared backend so other apps don't use up the 2-project free limit.

- **One Postgres schema per app.** The site stays in `public`; apps get their own (`imposter`, …). Never put app tables in `public`.
- **Auth is shared.** Every app shares one user pool and one Google OAuth client, so RLS must check `auth.uid()` or the `is_admin()` email, never just `authenticated`.
- **Realtime** works per schema. Subscribe with `{ schema: '<app>', table: … }` and `alter publication supabase_realtime add table …` in the app's SQL.
- **Each app's SQL lives in its own repo** (starting with `set search_path to <app>, public;`) and is applied with the script, not `db push` (which tracks only this repo's migrations).

Add an app (token from https://supabase.com/dashboard/account/tokens):

```bash
SUPABASE_ACCESS_TOKEN=sbp_... scripts/add-app.sh <schema> 'https://<app-domain>/**' 'http://localhost:3000/**' -- path/to/app.sql
```

In the app, use `createClient(url, anonKey, { db: { schema: '<schema>' } })` with this project's URL and keys.

Apps on it: `imposter` (itaibech/imposter).
