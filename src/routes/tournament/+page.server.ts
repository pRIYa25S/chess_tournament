import { pool } from '$lib/db.js';

export async function load() {

    const res = await pool.query('SELECT id, name, location, start_date, end_date FROM tournament ORDER BY id DESC');
    return { tournaments: res.rows || [] };
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const location = data.get('location'); 
        const start_date = data.get('start_date');
        const end_date = data.get('end_date');
        
        
        await pool.query(
            'INSERT INTO tournament (name, location, start_date, end_date) VALUES ($1, $2, $3, $4)', 
            [name, location, start_date, end_date]
        );
        return { success: true };
    }
};