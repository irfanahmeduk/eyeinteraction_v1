# Native Next.js admin

The admin uses this repository's Next.js App Router, JavaScript/JSX, React runtime,
Tailwind v3 and Framer Motion. erp-template is the visual/component source, not a separate app.

- Public pages: src/app/(site)/, with their existing URLs, metadata, navbar, footer and scrolling.
- Admin root layout: src/app/(admin)/admin/layout.jsx.
- Admin screens: src/app/(admin)/admin/(workspace)/.
- Reusable admin components: src/admin/.
- Branding: src/admin/config/template.config.js.
- Navigation: Next Link and next/navigation, with real /admin/... URLs, no hash router.
- One root package.json, package-lock.json, installation, server and build.
- Ant Design, Recharts and template fonts are shared root dependencies.
- Public API routes and business logic are unchanged.

The two root layouts intentionally isolate the website and admin document styles.
Next performs a full document navigation when crossing between them; admin navigation remains client-side.
The admin's custom CSS is scoped to .admin-root and uses the existing Tailwind v3 PostCSS pipeline.
Browser-dependent template providers mount after hydration.

## Start

Use Node 22.18+ or Node 24. Pull adminpanel, then run:

```sh
npm ci
npm run dev
```

Open /admin (redirects to /admin/dashboard, or /admin/login when signed out).
Production build: npm run build. Checks: npm run test:admin.

The former tracked admin/ Vite app has been removed. Any old admin/node_modules or
public/admin-panel build artifacts left in a local checkout are unused; remove only these
generated remnants manually if desired. Nothing in the native build reads them.

## Authentication and demo boundary

Authentication now uses MySQL-backed, server-validated sessions. Follow
[backend setup](backend-authentication.md) before signing in. There are no default credentials.
The remaining workspace records, profile editor, and role editor still use browser-only
sample data; editing them does not change the authenticated admin account or permissions.
Persistent business APIs and their authorization must be implemented before using real records.
