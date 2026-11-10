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
