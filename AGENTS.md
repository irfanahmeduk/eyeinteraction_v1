# Project conventions

- Keep the website and admin in the existing Next.js App Router project. Do not
  introduce a separate React/Vite app or Express server.
- Use mysql2 through the shared dbModal in `src/database/index.js`. Parameterize
  database values; use dbModal.transaction for operations that must commit together.
- `/api` enters through `src/app/api/[...path]/route.js` and delegates to
  `src/routes/index.js`. Register all new domains in that central file.
- Put endpoint business logic in `src/routes/{domain}/index.js`, or
  `src/routes/{prefix}/{domain}/index.js` for prefixed domains. Do not split domain
  endpoint logic into a separate controller layer.
- Use `/query` for lists, `/create` for creation, `/update` for updates, and
  `/query-selector` for a specific record/selection. Public URLs follow
  `/api/{domain}/{endpoint}` or `/api/{prefix}/{domain}/{endpoint}`.
- New routes are authenticated by default; explicitly mark only intended public
  routes as public. Apply domain authorization in addition to session validation
  when introducing new roles or business data. Browser demo roles are not authority.
- Preserve existing public contact and eligibility behavior when adding admin APIs.
- Never place database credentials in NEXT_PUBLIC_ variables or commit .env.local.
- Follow `docs/backend-authentication.md` for authentication setup and contracts.
  For backend/auth changes run `npm run test:auth`, `npm run test:admin`, and
  `npm run build`. State clearly when a live MySQL integration check was unavailable.
