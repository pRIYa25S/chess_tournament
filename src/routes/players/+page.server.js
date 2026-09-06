import pool from '$lib/db';

export async function load() {
    try {
        const { rows } = await pool.query('SELECT * FROM players ORDER BY id DESC');
        return { players: rows };
    } catch (error) {
        console.error('Database fetch error:', error);
        return { players: [] };
    }
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const rating = parseInt(formData.get('rating'), 10);

        try {
            await pool.query(
                'INSERT INTO players (name, email, rating) VALUES ($1, $2, $3)',
                [name, email, rating]
            );
            return { success: true };
        } catch (error) {
            console.error('Database insert error:', error);
            return { success: false, error: error.message };
        }
    }
};