import { fail } from '@sveltejs/kit';

// Static array acting as our production server memory
let rosterData = [
    { id: 25, name: "Fabiano Caruana", email: "caruana@chess.com", rating: 2800 },
    { id: 24, name: "Dharshan", email: "dharshan@gmail.com", rating: 2451 },
    { id: 23, name: "Hikaru Nakamura", email: "hikaru@chess.com", rating: 2780 },
    { id: 22, name: "Magnus Carlsen", email: "magnus@chess.com", rating: 2882 }
];

export async function load() {
    return {
        player: rosterData
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

        // Check for duplicate emails inside our temporary memory tier
        if (rosterData.some(p => p.email.toLowerCase() === email.toLowerCase())) {
            return fail(400, { error: "This email address is already registered!" });
        }
        
        // Generate a new sequential structural row ID
        const nextId = rosterData.length > 0 ? Math.max(...rosterData.map(p => p.id)) + 1 : 1;
        
        // Push cleanly to the top of the timeline array
        rosterData = [{ id: nextId, name, email, rating }, ...rosterData];

        return { success: true };
    }
};