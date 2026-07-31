# Meridian — онлайн-курсы

Лендинг платформы онлайн-курсов: live-карта навыков, поиск с подсказками, система заявок.

## Stack

- **TanStack Start** · React 19 · Vite · Tailwind v4 · Nitro (Vercel)

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:3000).

### Useful scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run migrate` | Run DB migrations (if configured) |

## Deploy to Vercel

1. Push this repo to GitHub (already done if you are reading this on GitHub).
2. In [Vercel](https://vercel.com), **Add New Project** → Import `vestissivan/meridian-courses`.
3. Framework preset: **Other** / Vite (or leave auto-detect).
4. Build settings:
   - **Install**: `npm install`
   - **Build command**: `npm run build`
   - **Output**: leave default (Nitro/Vercel adapter handles it via `vercel.json`)
5. Add environment variables if needed for auth/DB (see app config).
6. Deploy.

### `vercel.json`

This project includes a `vercel.json` for Nitro/Vercel routing. No extra rewrite rules should be required for a standard import.

## Project structure

```
src/
  components/   # UI (hero, courses, magicui, etc.)
  data/         # Course catalog
  lib/          # Auth, DB, multiplayer, utils
  routes/       # TanStack Router routes
  store/        # Client state
public/images/  # Course & instructor images
migrations/     # Auth SQL migrations
```

## License

Private / all rights reserved unless otherwise noted.
