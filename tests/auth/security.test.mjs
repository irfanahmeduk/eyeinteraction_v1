import test from 'node:test';
import assert from 'node:assert/strict';
import passwords from '../../src/auth/password.cjs';
import { assertSameOrigin, readJson } from '../../src/routes/http.js';

const request = (body, headers = {}) => new Request('http://localhost:3000/api/auth/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body,
});

test('passwords use unique salts and reject wrong or malformed credentials', async () => {
  const secret = 'a-long-test-password';
  const first = await passwords.hashPassword(secret);
  const second = await passwords.hashPassword(secret);
  assert.notEqual(first, second);
  assert.equal(await passwords.verifyPassword(secret, first), true);
  assert.equal(await passwords.verifyPassword('wrong-password', first), false);
  assert.equal(await passwords.verifyPassword(secret, undefined), false);
  assert.equal(await passwords.verifyPassword(secret, 'malformed'), false);
  await assert.rejects(passwords.hashPassword('short'));
  await assert.rejects(passwords.hashPassword('a'.repeat(129)));
});

test('state changes reject missing and foreign origins', () => {
  assert.throws(() => assertSameOrigin(request('{}')), e => e.status === 403);
  assert.throws(() => assertSameOrigin(request('{}', { Origin: 'https://attacker.example' })), e => e.status === 403);
  assert.doesNotThrow(() => assertSameOrigin(request('{}', { Origin: 'http://localhost:3000' })));
});

test('JSON parser rejects malformed, non-object, incorrect type, and oversized bodies', async () => {
  assert.deepEqual(await readJson(request('{"email":"test@example.com"}')), { email: 'test@example.com' });
  for (const body of ['{', 'null', '[]', 'true']) await assert.rejects(readJson(request(body)), e => e.status === 400);
  await assert.rejects(readJson(request('{}', { 'Content-Type': 'text/plain' })), e => e.status === 415);
  await assert.rejects(readJson(request(JSON.stringify({ password: 'x'.repeat(5000) }))), e => e.status === 413);
});
