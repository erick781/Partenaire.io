# AGENTS.md

## Cursor Cloud specific instructions

**Partenaire.io** is a static Next.js 15 landing page (TypeScript, React 19, Tailwind CSS). No backend, database, or environment variables are needed.

### Key commands

See `package.json` scripts — standard Next.js commands:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` (static export to `out/`) |
| Lint | `npm run lint` |

### Caveats

- The first time `npm run lint` is run, if `.eslintrc.json` does not exist, Next.js will prompt interactively. The file is already committed with the `next/core-web-vitals` + `next/typescript` extends config.
- `next.config.ts` sets `output: "export"` — the app produces a fully static site. There is no SSR or API routes.
- The contact form (`Contact.tsx`) only calls `e.preventDefault()` — there is no backend submission handler.
- No `.env` file or secrets are required.
