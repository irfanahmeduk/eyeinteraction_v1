const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const dbModal = require('../src/database/index.js');
const { hashPassword } = require('../src/auth/password.cjs');

async function main() {
  const command = process.argv[2];
  if (command === 'setup') {
    const sql = readFileSync(join(__dirname, '../src/database/schema.sql'), 'utf8');
    for (const statement of sql.split(';').map(s => s.trim()).filter(Boolean)) await dbModal.query(statement);
    console.log('Authentication database tables are ready.');
  } else if (command === 'create-admin') {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const name = process.env.ADMIN_NAME?.trim();
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || name.length > 100) {
      throw new Error('Set valid ADMIN_EMAIL and ADMIN_NAME (1–100 characters)');
    }
    const hash = await hashPassword(process.env.ADMIN_PASSWORD);
    await dbModal.query('INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hash]);
    console.log('Admin created. Remove ADMIN_PASSWORD from your environment file.');
  } else if (command === 'cleanup') {
    await dbModal.query('DELETE FROM admin_sessions WHERE expires_at <= UTC_TIMESTAMP()');
    await dbModal.query('DELETE FROM admin_login_limits WHERE window_start < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 DAY)');
    console.log('Expired authentication records removed.');
  } else throw new Error('Use setup, create-admin, or cleanup');
}
main().catch(error => {
  console.error(error.code === 'ER_DUP_ENTRY' ? 'This admin email already exists; no changes were made.' : error.code || error.message);
  process.exitCode = 1;
}).finally(() => dbModal.close());
