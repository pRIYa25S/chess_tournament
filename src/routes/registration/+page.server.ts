import { pool } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

export async function load() {
    // Fetch tournaments and players dynamically to populate our dropdown boxes
    const tournamentsRes = await pool.query('SELECT id, name, location FROM tournament ORDER BY id DESC');
    const playersRes = await pool.query('SELECT id, name FROM player ORDER BY name ASC');

    return {
        tournaments: tournamentsRes.rows || [],
        players: playersRes.rows || []
    };
}

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const tournamentIdStr = data.get('tournament_id');
        const playerIdStr = data.get('player_id');

        if (!tournamentIdStr || !playerIdStr) {
            return fail(400, { error: "Please select both a tournament and a player." });
        }

        const tournamentId = parseInt(tournamentIdStr, 10);
        const playerId = parseInt(playerIdStr, 10);

        try {
            
            await pool.query(
                'INSERT INTO registration (tournament_id, player_id) VALUES ($1, $2)',
                [tournamentId, playerId]
            );
            return { success: true };
        } catch (err) {
            
            if (err.code === '23505') {
                return fail(400, { error: "This player is already registered in this specific tournament!" });
            }
            return fail(500, { error: "An unexpected database connectivity issue occurred." });
        }
    }
};