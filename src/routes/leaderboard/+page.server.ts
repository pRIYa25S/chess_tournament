import { pool } from '$lib/db.js';

export async function load() {
    try {
        
        const leaderboardRes = await pool.query(`
            SELECT p.id, p.name, p.rating,
                   COUNT(m.id) as matches_played,
                   COUNT(CASE WHEN m.winner_id = p.id THEN 1 END) as wins
            FROM player p
            LEFT JOIN matches m ON (p.id = m.player1_id OR p.id = m.player2_id)
            GROUP BY p.id, p.name, p.rating
            ORDER BY wins DESC, p.rating DESC
        `);

        return {
            leaderboard: leaderboardRes.rows || [],
            dbError: null
        };
    } catch (err) {
        return {
            leaderboard: [],
            dbError: "Leaderboard Load Error: " + err.message
        };
    }
}