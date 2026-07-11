import pg from 'pg';
const { Pool } = pg;

// Use the standard process.env which Vercel reads perfectly automatically
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});