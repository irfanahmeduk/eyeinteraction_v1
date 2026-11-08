import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import db from '../../src/database/index.js';
import passwords from '../../src/auth/password.cjs';

// Supply Next request cookies outside a running server. Database results below are mocked.
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only') return { url: 'data:text/javascript,export {}', shortCircuit: true };
  if (specifier === 'next/headers') return {
    url: 'data:text/javascript,export async function cookies(){return globalThis.__testCookies}', shortCircuit: true,
  };
  if (specifier === 'next/server') return nextResolve('next/server.js', context);
  return nextResolve(specifier, context);
} });
const { NextRequest } = await import('next/server');
const { dispatch } = await import('../../src/routes/index.js');
const { SESSION_COOKIE, tokenHash } = await import('../../src/auth/session.js');
const { proxy } = await import('../../src/proxy.js');
const hash = await passwords.hashPassword('correct-test-password');
const user = { id: 7, name: 'Test Admin', email: 'admin@example.com', role: 'admin', is_active: 1, password_hash: hash };
let attempts, active, sessionUser, calls;
function reset() {
  attempts = 1; active = true; sessionUser = null; calls = [];
  globalThis.__testCookies = { get: () => undefined };
  db.query = async (sql, values) => {
    calls.push({ sql, values });
    if (sql.includes('SELECT attempts')) return [{ attempts }];
    if (sql.includes('FROM admin_users WHERE email')) return [user];
    if (sql.includes('FROM admin_users WHERE id')) return [{ ...user, is_active: active ? 1 : 0 }];
    if (sql.includes('FROM admin_sessions s')) return sessionUser ? [sessionUser] : [];
    return { affectedRows: 1 };
  };
  db.transaction = callback => callback(db);
}
function send(endpoint, method = 'POST', body = { email: ' ADMIN@example.com ', password: 'correct-test-password' }, headers = {}) {
  const req = new NextRequest(`http://localhost:3000/api/auth/${endpoint}`, {
    method, headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000', ...headers },
    ...(!['GET', 'HEAD'].includes(method) ? { body: JSON.stringify(body) } : {}),
  });
  return dispatch(req, { params: Promise.resolve({ path: ['auth', endpoint] }) });
}

test('successful login stores only token digest and sets a bounded HTTP-only cookie', async () => {
  reset();
  const res = await send('login');
  assert.equal(res.status, 200);
  const payload = await res.json();
  assert.deepEqual(payload.data, { id: 7, name: 'Test Admin', email: 'admin@example.com', role: 'admin' });
  const token = res.cookies.get(SESSION_COOKIE).value;
  assert.match(token, /^[a-f0-9]{64}$/);
  assert.ok(calls.some(c => c.sql.startsWith('INSERT INTO admin_sessions') && c.values[0] === tokenHash(token)));
  assert.ok(!calls.some(c => c.values?.includes(token)));
  assert.match(res.headers.get('set-cookie'), /HttpOnly/i);
  assert.match(res.headers.get('set-cookie'), /SameSite=lax/i);
  assert.match(res.headers.get('set-cookie'), /Max-Age=28800/i);
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

test('wrong password and account disabled during verification never issue a session', async () => {
  reset();
  assert.equal((await send('login', 'POST', { email: user.email, password: 'wrong-password' })).status, 401);
  assert.ok(!calls.some(c => c.sql.startsWith('INSERT INTO admin_sessions')));
  reset(); active = false;
  assert.equal((await send('login')).status, 401);
  assert.ok(!calls.some(c => c.sql.startsWith('INSERT INTO admin_sessions')));
});

test('sixth attempt is throttled before password lookup', async () => {
  reset(); attempts = 6;
  const res = await send('login');
  assert.equal(res.status, 429);
  assert.equal(res.headers.get('retry-after'), '900');
  assert.ok(!calls.some(c => c.sql.includes('FROM admin_users')));
});

test('missing and expired sessions are rejected, valid session returns safe identity', async () => {
  reset();
  assert.equal((await send('query-selector', 'GET')).status, 401);
  globalThis.__testCookies = { get: () => ({ value: 'a'.repeat(64) }) };
  assert.equal((await send('query-selector', 'GET')).status, 401);
  assert.ok(calls.some(c => c.sql.includes('s.expires_at > UTC_TIMESTAMP()') && c.sql.includes('u.is_active = 1')));
  sessionUser = { id: 7, name: user.name, email: user.email, role: 'admin' };
  assert.deepEqual((await (await send('query-selector', 'GET')).json()).data, sessionUser);
});

test('logout revokes token and clears cookie; expired logout is idempotent', async () => {
  reset();
  const token = 'b'.repeat(64);
  const res = await send('logout', 'POST', {}, { Cookie: `${SESSION_COOKIE}=${token}` });
  assert.equal(res.status, 200);
  assert.ok(calls.some(c => c.sql.startsWith('DELETE FROM admin_sessions') && c.values[0] === tokenHash(token)));
  assert.match(res.headers.get('set-cookie'), /Max-Age=0/i);
  assert.equal((await send('logout')).status, 200);
});

test('dispatcher rejects foreign origin, unknown routes, and incorrect methods', async () => {
  reset();
  assert.equal((await send('login', 'POST', {}, { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await send('constructor', 'GET')).status, 404);
  const method = await send('login', 'GET');
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('allow'), 'POST');
  assert.equal(calls.length, 0);
});

test('database failures return sanitized errors', async () => {
  reset();
  db.transaction = async () => { throw Object.assign(new Error('private connection details'), { code: 'ECONNREFUSED' }); };
  const res = await send('login');
  assert.equal(res.status, 500);
  assert.ok(!(await res.text()).includes('private connection'));
});

test('admin requests redirect before rendering and fail closed on database failure', async () => {
  reset();
  const request = new NextRequest('http://localhost:3000/admin/dashboard');
  const signedOut = await proxy(request);
  assert.equal(signedOut.status, 307);
  assert.equal(signedOut.headers.get('location'), 'http://localhost:3000/admin/login');
  assert.equal((await proxy(new NextRequest('http://localhost:3000/admin/login'))).headers.get('x-middleware-next'), '1');
  const signedIn = new NextRequest('http://localhost:3000/admin/dashboard', {
    headers: { Cookie: `${SESSION_COOKIE}=${'a'.repeat(64)}` },
  });
  sessionUser = { id: 7, name: user.name, email: user.email, role: 'admin' };
  assert.equal((await proxy(signedIn)).headers.get('x-middleware-next'), '1');
  db.query = async () => { throw Object.assign(new Error('private database details'), { code: 'ECONNREFUSED' }); };
  const failure = await proxy(signedIn);
  assert.equal(failure.status, 503);
  assert.ok(!(await failure.text()).includes('private database'));
});
