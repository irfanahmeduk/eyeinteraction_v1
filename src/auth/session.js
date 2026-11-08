import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import dbModal from '../database/index.js';

export const SESSION_COOKIE = 'eyeinteraction_admin_session';
export const SESSION_SECONDS = 8 * 60 * 60;
export const tokenHash = token => createHash('sha256').update(token).digest('hex');
export const newToken = () => randomBytes(32).toString('hex');
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

export async function getSessionUser(token) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const [user] = await dbModal.query(
    `SELECT u.id, u.name, u.email, u.role FROM admin_sessions s
     JOIN admin_users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP()
       AND u.is_active = 1 AND u.role = 'admin' LIMIT 1`, [tokenHash(token)]);
  return user || null;
}

export async function currentUser() {
  const jar = await cookies();
  return getSessionUser(jar.get(SESSION_COOKIE)?.value);
}
