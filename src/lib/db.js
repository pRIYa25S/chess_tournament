import pg from 'pg';
const { Pool } = pg;

// Change 'dynamic' to 'static' right here:
import { DATABASE_URL } from '$env/static/private';

export const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});