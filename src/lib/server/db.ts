import { env } from '$env/dynamic/private';
import pg from 'pg';

export const db = new pg.Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});