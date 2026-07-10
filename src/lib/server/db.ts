import pkg from 'pg';

const { Pool } = pkg;

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chessdb',
    password: 'Mani@25.',
    port: 5432
});