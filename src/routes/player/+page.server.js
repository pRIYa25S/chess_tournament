import { fail } from '@sveltejs/kit';

// Clean, zero-dependency static baseline matrix
let staticRoster = [
    { id: 25, name: "Fabiano Caruana", email: "caruana@chess.com", rating: 2800 },
    { id: 24, name: "Dharshan", email: "dharshan@gmail.com", rating: 2451 },
    { id: 23, name: "Hikaru Nakamura", email: "hikaru@chess.com", rating: 2780 }
];

export async function load() {
    return {
        player: staticRoster
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
            return fail(400, { error: "Missing fields." });
        }

        if (staticRoster.some(p => p.email.toLowerCase() === email.toLowerCase())) {
            return fail(400, { error: "Email already registered." });
        }
        
        const nextId = staticRoster.length > 0 ? Math.max(...staticRoster.map(p => p.id)) + 1 : 1;
        staticRoster = [{ id: nextId, name, email, rating }, ...staticRoster];

        return { success: true };
    }
};