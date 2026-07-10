import { pool } from '$lib/db.js';

export async function load() {
    try {
        // Fetch tournaments for dropdown
        const tournamentsRes = await pool.query('SELECT id, name FROM tournament ORDER BY id DESC');
        
        // Query matching exactly what's in your schema (removing m.round)
        const res = await pool.query(`
            SELECT m.id, t.name as tournament_name, 
                   p1.name as player1_name, p2.name as player2_name, 
                   m.winner_id
            FROM matches m
            JOIN tournament t ON m.tournament_id = t.id
            JOIN player p1 ON m.player1_id = p1.id
            JOIN player p2 ON m.player2_id = p2.id
            ORDER BY m.id DESC
        `);

        return {
            tournaments: tournamentsRes.rows || [],
            matches: res.rows || [],
            dbError: null
        };

    } catch (globalError) {
        return {
            tournaments: [],
            matches: [],
            dbError: "Database Query Failure: " + globalError.message
        };
    }
}

export const actions = {
    generate: async ({ request }) => {
        const data = await request.formData();
        const tournamentId = parseInt(data.get('tournament_id'), 10);

        try {
            const regRes = await pool.query('SELECT player_id FROM registration WHERE tournament_id = $1', [tournamentId]);
            const players = regRes.rows.map(r => r.player_id);

            if (players.length < 2) {
                return { success: false, error: "Need at least 2 registered players to generate pairings!" };
            }

            for (let i = 0; i < players.length; i++) {
                for (let j = i + 1; j < players.length; j++) {
                    await pool.query(
                        `INSERT INTO matches (tournament_id, player1_id, player2_id) 
                         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
                        [tournamentId, players[i], players[j]]
                    );
                }
            }
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }
};