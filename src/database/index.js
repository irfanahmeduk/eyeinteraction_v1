// CommonJS keeps the same dbModal available to Next.js and database CLI scripts.
const mysql = require('mysql2/promise');

function getPool() {
  if (!globalThis.__eyeinteractionPool) {
    for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME']) {
      if (!process.env[key]) throw new Error(`Missing ${key}; configure .env.local first`);
    }
    globalThis.__eyeinteractionPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 100,
      connectTimeout: 10000,
      charset: 'utf8mb4',
      timezone: 'Z',
      multipleStatements: false,
      ...(process.env.DB_SSL === 'true' ? { ssl: {
        rejectUnauthorized: true,
        ...(process.env.DB_SSL_CA ? { ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n') } : {}),
      } } : {}),
    });
  }
  return globalThis.__eyeinteractionPool;
}

function model(connection) {
  return {
    async query(sql, values = []) {
      const [rows] = await connection.execute(sql, values);
      return rows;
    },
  };
}

const dbModal = {
  query(sql, values = []) { return model(getPool()).query(sql, values); },
  async transaction(callback) {
    const connection = await getPool().getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(model(connection));
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
  async close() {
    const pool = globalThis.__eyeinteractionPool;
    delete globalThis.__eyeinteractionPool;
    if (pool) await pool.end();
  },
};

module.exports = dbModal;
