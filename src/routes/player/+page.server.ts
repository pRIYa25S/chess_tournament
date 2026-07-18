import { fail } from '@sveltejs/kit';

// A simple local memory array to replace the PostgreSQL table
let mockPlayers = [
    { id: 24, name: "Dharshan", email: "dharshan@gmail.com", rating: 2451 },
    { id: 23, name: "Fabiano Caruana", email: "fabiano@chess.com", rating: 2800 },
    { id: 22, name: "Hikaru Nakamura", email: "hikaru@chess.com", rating: 2780 }
];

export async function load() {
    // Returns the data array directly without calling a database
    return {
        player: mockPlayers
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

        // Prevent duplicate emails locally
        if (mockPlayers.some(p => p.email === email)) {
            return fail(400, { error: "This email address is already registered!" });
        }
        
        // Add the new player to our array
        const newId = mockPlayers.length > 0 ? Math.max(...mockPlayers.map(p => p.id)) + 1 : 1;
        mockPlayers = [{ id: newId, name, email, rating }, ...mockPlayers];

        return { success: true };
    }
};