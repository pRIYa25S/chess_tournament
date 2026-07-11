import pkg from 'pg';
import { env } from '$env/dynamic/private';

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});