// No database imports needed!

export async function load() {
    try {
        // Safe mock array matching your SQL structure exactly
        const mockLeaderboard = [
            { 
                id: 22, 
                name: "Magnus Carlsen", 
                rating: 2882, 
                matches_played: 5, 
                wins: 5 
            },
            { 
                id: 25, 
                name: "Fabiano Caruana", 
                rating: 2800, 
                matches_played: 5, 
                wins: 4 
            },
            { 
                id: 23, 
                name: "Hikaru Nakamura", 
                rating: 2780, 
                matches_played: 5, 
                wins: 3 
            },
            { 
                id: 24, 
                name: "Dharshan", 
                rating: 2451, 
                matches_played: 5, 
                wins: 2 
            }
        ];

        return {
            leaderboard: mockLeaderboard,
            dbError: null
        };
    } catch (err) {
        return {
            leaderboard: [],
            dbError: "Leaderboard Load Error: " + err.message
        };
    }
}