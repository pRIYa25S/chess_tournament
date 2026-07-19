import { fail } from '@sveltejs/kit';

// 1. Mock Database Memory State
let mockTournaments = [
    { id: 101, name: "Grandmaster Summer Invitational 2026" },
    { id: 102, name: "Chennai Blitz Open" }
];

let mockMatches = [
    { id: 1, tournament_name: "Grandmaster Summer Invitational 2026", player1_name: "Magnus Carlsen", player2_name: "Hikaru Nakamura", winner_id: null },
    { id: 2, tournament_name: "Grandmaster Summer Invitational 2026", player1_name: "Fabiano Caruana", player2_name: "Dharshan", winner_id: 25 },
    { id: 3, tournament_name: "Chennai Blitz Open", player1_name: "Dharshan", player2_name: "Magnus Carlsen", winner_id: null }
];

// Helper mock roster maps to generate matches locally
const mockTournamentRegistrations = {
    101: [
        { id: 22, name: "Magnus Carlsen" },
        { id: 23, name: "Hikaru Nakamura" },
        { id: 25, name: "Fabiano Caruana" },
        { id: 24, name: "Dharshan" }
    ],
    102: [
        { id: 24, name: "Dharshan" },
        { id: 22, name: "Magnus Carlsen" }
    ]
};

// 2. Load Action Matrix
export async function load() {
    try {
        return {
            tournaments: mockTournaments,
            matches: mockMatches,
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

// 3. Form Action Simulators
export const actions = {
    generate: async ({ request }) => {
        const data = await request.formData();
        const tournamentId = parseInt(data.get('tournament_id'), 10);

        try {
            const tournament = mockTournaments.find(t => t.id === tournamentId);
            const players = mockTournamentRegistrations[tournamentId] || [];

            if (players.length < 2) {
                return fail(400, { success: false, error: "Need at least 2 registered players to generate pairings!" });
            }

            // Simulate round-robin pairing generation locally inside memory space
            let generatedCount = 0;
            for (let i = 0; i < players.length; i++) {
                for (let j = i + 1; j < players.length; j++) {
                    const nextMatchId = mockMatches.length > 0 ? Math.max(...mockMatches.map(m => m.id)) + 1 : 1;
                    
                    mockMatches = [
                        {
                            id: nextMatchId,
                            tournament_name: tournament ? tournament.name : "Unknown Tournament",
                            player1_name: players[i].name,
                            player2_name: players[j].name,
                            winner_id: null
                        },
                        ...mockMatches
                    ];
                    generatedCount++;
                }
            }
            
            return { success: true };
        } catch (err) {
            return fail(500, { success: false, error: err.message });
        }
    }
};