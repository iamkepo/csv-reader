import 'dotenv/config';
import { Pool } from 'pg';

// Configure via environment variables
// Required: PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT
// Optional: PGSSLMODE (e.g., 'require' for managed providers)
export const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'tab-reader',
  port: Number(process.env.PGPORT || 5433),
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : undefined,
});

// Convenience query helper
export const query = (text, params) => pool.query(text, params);

// Optional: init function to prepare schema (call from app startup if desired)
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS logs (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      filesize BIGINT NOT NULL,
      duration_ms INTEGER NOT NULL,
      processed_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

// Graceful shutdown
const shutdown = async () => {
  try {
    await pool.end();
    // eslint-disable-next-line no-console
    console.log('🛑 PostgreSQL pool closed');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error closing PostgreSQL pool', e);
  } finally {
    process.exit(0);
  }
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
