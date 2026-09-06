export async function load() {
    const staticRoster = [
        { id: 25, name: "Fabiano Caruana", email: "caruana@chess.com", rating: 2800 },
        { id: 24, name: "Dharshan", email: "dharshan@gmail.com", rating: 2451 },
        { id: 23, name: "Hikaru Nakamura", email: "hikaru@chess.com", rating: 2780 }
    ];

    return { 
        player: staticRoster 
    };
}

export const actions = {
    create: async () => {
        return { success: true };
    }
};