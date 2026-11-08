import { NextResponse } from 'next/server';
import dbModal from '../../database/index.js';
import passwords from '../../auth/password.cjs';
import { SESSION_COOKIE, SESSION_SECONDS, cookieOptions, tokenHash, newToken } from '../../auth/session.js';
import { ApiError, readJson } from '../http.js';

async function login(request) {
  const body = await readJson(request);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof body.password !== 'string' || !body.password.length || body.password.length > 128) {
    throw new ApiError(400, 'Enter a valid email and password');
  }

  // Reserve attempts atomically before password verification, including unknown accounts.
  const allowed = await dbModal.transaction(async db => {
    await db.query(`INSERT INTO admin_login_limits (email_hash, attempts, window_start)
      VALUES (?, 1, UTC_TIMESTAMP()) ON DUPLICATE KEY UPDATE
      attempts = IF(window_start <= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 15 MINUTE), 1, attempts + 1),
      window_start = IF(window_start <= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 15 MINUTE), UTC_TIMESTAMP(), window_start)`, [tokenHash(email)]);
    const [limit] = await db.query('SELECT attempts FROM admin_login_limits WHERE email_hash = ? FOR UPDATE', [tokenHash(email)]);
    return limit.attempts <= 5;
  });
  if (!allowed) return NextResponse.json({ status: false, message: 'Too many sign-in attempts. Try again in 15 minutes.' }, {
    status: 429, headers: { 'Retry-After': '900' },
  });

  const [user] = await dbModal.query('SELECT id, name, email, role, is_active, password_hash FROM admin_users WHERE email = ? LIMIT 1', [email]);
  const valid = await passwords.verifyPassword(body.password, user?.password_hash);
  if (!valid || !user?.is_active || user.role !== 'admin') throw new ApiError(401, 'Invalid email or password');

  const token = newToken();
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);
  await dbModal.transaction(async db => {
    // Recheck account state while holding a row lock before issuing a session.
    const [active] = await db.query('SELECT password_hash, is_active, role FROM admin_users WHERE id = ? FOR UPDATE', [user.id]);
    if (!active?.is_active || active.role !== 'admin' || active.password_hash !== user.password_hash) {
      throw new ApiError(401, 'Invalid email or password');
    }
    const previous = request.cookies.get(SESSION_COOKIE)?.value;
    if (previous && /^[a-f0-9]{64}$/.test(previous)) {
      await db.query('DELETE FROM admin_sessions WHERE token_hash = ?', [tokenHash(previous)]);
    }
    await db.query('DELETE FROM admin_sessions WHERE user_id = ? AND expires_at <= UTC_TIMESTAMP()', [user.id]);
    await db.query('INSERT INTO admin_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)', [tokenHash(token), user.id, expiresAt]);
    await db.query('UPDATE admin_users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?', [user.id]);
  });
  const response = NextResponse.json({ status: true, message: 'Signed in successfully', data: {
    id: user.id, name: user.name, email: user.email, role: user.role,
  } });
  response.cookies.set(SESSION_COOKIE, token, { ...cookieOptions, maxAge: SESSION_SECONDS, expires: expiresAt });
  return response;
}

async function logout(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token)) {
    await dbModal.query('DELETE FROM admin_sessions WHERE token_hash = ?', [tokenHash(token)]);
  }
  const response = NextResponse.json({ status: true, message: 'Signed out successfully' });
  response.cookies.set(SESSION_COOKIE, '', { ...cookieOptions, maxAge: 0, expires: new Date(0) });
  return response;
}

export default {
  login: { method: 'POST', public: true, handle: login },
  // Idempotent, including when the session has already expired.
  logout: { method: 'POST', public: true, handle: logout },
  'query-selector': { method: 'GET', handle: async (_request, { user }) =>
    NextResponse.json({ status: true, message: 'Current user retrieved', data: user }) },
};
