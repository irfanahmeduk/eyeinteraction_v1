# Backend and admin authentication

## Setup

Use Node 22.18+ or Node 24 and an existing MySQL database (InnoDB).
Install dependencies with `npm ci`. Copy the values from `.env.example` into
`.env.local`, preserving your existing website configuration. Set DB_HOST, DB_PORT,
DB_USER, DB_PASSWORD, and DB_NAME. Never use NEXT_PUBLIC_ for credentials.
For a remote TLS database set DB_SSL=true and, if required, DB_SSL_CA.

Set APP_URL to the exact browser origin (scheme, host, port), for example
http://localhost:3000 locally or https://your-domain.example in production. This
is required behind reverse proxies whose internal request URL differs from the public origin.
Production requires HTTPS because authentication cookies are Secure.

Run:

```sh
npm run db:setup
```

This creates only the three authentication tables in the configured database;
it does not create the database or alter existing website data. It can be run again.
Use a database setup account with CREATE privilege, then a runtime account limited
to SELECT, INSERT, UPDATE, DELETE on these tables.

Temporarily set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in `.env.local`.
The password must contain 12–128 characters. Then run:

```sh
npm run db:create-admin
```

This creates an admin with a salted scrypt hash. Duplicate emails are rejected;
existing passwords are never overwritten. Remove ADMIN_PASSWORD afterward.
Run `npm run dev` and open `/admin/login`. No public registration endpoint exists.

## Route convention

| Layer | File | Responsibility |
| --- | --- | --- |
| /api entry | src/app/api/[...path]/route.js | Next.js Node route handler forwarding methods |
| Central registration | src/routes/index.js | Domain map, method checking, origin check, authentication, errors |
| Domain logic | src/routes/auth/index.js | Login, logout, current-user endpoint implementations |
| Database model | src/database/index.js | Shared mysql2 promise pool, parameterized queries, transactions |

This is the Next.js equivalent of `app.use('/api', routes)`; no Express server is
needed. Keep endpoint business logic inside `src/routes/{domain}/index.js` or
`src/routes/{prefix}/{domain}/index.js`. Register prefixed domains in the central
map using keys such as `website/testimonials`.

Use `/query`, `/create`, `/update`, and `/query-selector` consistently for future
domains. Each domain exports endpoint descriptors with `method` and `handle`.
Handlers receive `(request, { user })`; routes require a valid active admin by
default. Only explicitly public endpoints set `public: true`. Never trust a
client-supplied user ID or a browser workspace role. All database values use `?`
parameters; `dbModal.transaction(async db => ...)` commits or rolls back together.
Keep all new APIs behind this dispatcher or apply equivalent guards explicitly.
Existing public `/api/contact` and `/api/eligibility` routes keep their existing behavior.

| Method | Endpoint | Result |
| --- | --- | --- |
| POST | /api/auth/login | Validates `{email,password}`, issues session cookie |
| POST | /api/auth/logout | Revokes current session and clears cookie |
| GET | /api/auth/query-selector | Returns authenticated `{id,name,email,role}` |

Responses use `{status, message, data?}` and HTTP status codes. POST requests
require a matching Origin. Login requires application/json and a body no larger
than 4 KiB. Email is trimmed and lowercased; passwords are not transformed.

## Sessions and operations

Sessions expire after eight hours without sliding renewal. Random 256-bit tokens
are stored only as SHA-256 digests in MySQL; browser cookies are HTTP-only,
SameSite=Lax, and Secure in production. Login replaces the presenting session.
Logout invalidates the database session. Every protected API checks expiry,
is_active, and role. The Next.js proxy checks every admin request before rendering,
with an additional workspace layout guard on the server. The UI
checks its session on focus and every minute.

Login allows five attempts per normalized email in each 15-minute window,
including successful attempts, then returns 429. Counters are transactional and
shared across application instances. Unknown emails also consume attempts and
perform a dummy password verification. Set additional perimeter request limits
for public deployments; the account limit alone does not prevent attempts across
many different email addresses. No forwarded client IP is trusted by this code.

Run `npm run db:cleanup` periodically to remove expired sessions and old counters.
To disable access, set admin_users.is_active=0. When resetting a password through
a future management feature, also delete that user's admin_sessions rows.
UI profile and role editors remain demo features and do not manage these tables.

## Validation

`npm run test:admin`, `npm run test:auth`, and `npm run build` pass. Authentication
tests cover password hashing, bounded JSON parsing, origin rejection, login,
throttling, session checks, logout, routing, and sanitized failures. Route tests
mock database results; they do not validate SQL against a running MySQL instance.
Production-server smoke checks cover login rendering, signed-out redirects, and
401/403/404/405 responses. Before deployment, run setup and verify valid/invalid
login, expiry, disabled accounts, and logout against your actual MySQL server.

References: [Next.js authentication](https://nextjs.org/docs/app/guides/authentication),
[mysql2 promise API](https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper).
