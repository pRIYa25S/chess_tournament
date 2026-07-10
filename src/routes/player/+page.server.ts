import { pool } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

export async function load() {
    const res = await pool.query('SELECT id, name, email, rating FROM player ORDER BY id DESC');
    return {
        players: res.rows || []
    };
}

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString().trim();
        const email = data.get('email')?.toString().trim();
        const ratingInput = data.get('rating');
        
        const rating = ratingInput ? parseInt(ratingInput, 10) : 0;

        if (!name || !email) {
            return fail(400, { error: "Missing required fields." });
        }
        
        try {
            await pool.query(
                'INSERT INTO player (name, email, rating) VALUES ($1, $2, $3)',
                [name, email, rating]
            );
            return { success: true };
        } catch (err) {
            if (err.code === '23505') {
                return fail(400, { error: "This email address is already registered to another player!" });
            }
            return fail(500, { error: "Database error occurred." });
        }
    }
};