import pg from 'pg';
const { Pool } = pg;

// This is the absolute requirement for runtime variables in SvelteKit
import { env } from '$env/dynamic/private';

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});