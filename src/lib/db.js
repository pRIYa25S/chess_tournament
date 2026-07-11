import pg from 'pg';
const { Pool } = pg;

import { env } from '$env/dynamic/private';

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});