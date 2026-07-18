import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chessdb',
    password: 'Mani@25.',  // Your original password with the special character
    port: 5432,
});