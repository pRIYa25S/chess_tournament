import { fail } from '@sveltejs/kit';

// 1. In-memory data structures matching your exact database schema fields
let mockTournaments = [
    { id: 101, name: "Grandmaster Summer Invitational 2026", location: "Chennai" },
    { id: 102, name: "Chennai Blitz Open", location: "Hall 3, Stadium" }
];

let mockPlayers = [
    { id: 22, name: "Magnus Carlsen" },
    { id: 23, name: "Hikaru Nakamura" },
    { id: 24, name: "Dharshan" },
    { id: 25, name: "Fabiano Caruana" }
];

// Track registrations globally in memory to prevent duplicate signups
let mockRegistrations = [
    { tournament_id: 101, player_id: 24 } // Simulating Dharshan already in the GM tourney
];

// 2. Load function for dropdowns
export async function load() {
    return {
        tournaments: mockTournaments,
        players: mockPlayers
    };
}

// 3. Register form action
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
            // Check for duplicate registrations in our array (simulating SQL unique constraint '23505')
            const alreadyExists = mockRegistrations.some(
                r => r.tournament_id === tournamentId && r.player_id === playerId
            );

            if (alreadyExists) {
                return fail(400, { error: "This player is already registered in this specific tournament!" });
            }

            // Save the new registration to our list
            mockRegistrations.push({ tournament_id: tournamentId, player_id: playerId });
            
            return { success: true };
        } catch (err) {
            return fail(500, { error: "An unexpected database connectivity issue occurred." });
        }
    }
};