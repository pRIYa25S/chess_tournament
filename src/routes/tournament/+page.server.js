// No database imports needed!

// 1. In-memory array acting as our database table
let mockTournaments = [
    { 
        id: 102, 
        name: "Chennai Blitz Open", 
        location: "Hall 3, Stadium", 
        start_date: "2026-08-10", 
        end_date: "2026-08-12" 
    },
    { 
        id: 101, 
        name: "Grandmaster Summer Invitational 2026", 
        location: "Chennai", 
        start_date: "2026-07-25", 
        end_date: "2026-08-01" 
    }
];

// 2. Load function to show existing tournaments
export async function load() {
    return { 
        tournaments: mockTournaments 
    };
}

// 3. Action function to handle form creation submissions
export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString().trim();
        const location = data.get('location')?.toString().trim(); 
        const start_date = data.get('start_date');
        const end_date = data.get('end_date');
        
        if (!name || !location || !start_date || !end_date) {
            return { success: false, error: "All fields are required!" };
        }

        // Generate a new sequential ID
        const nextId = mockTournaments.length > 0 ? Math.max(...mockTournaments.map(t => t.id)) + 1 : 101;
        
        // Push the new tournament to the top of our array
        mockTournaments = [
            { id: nextId, name, location, start_date, end_date },
            ...mockTournaments
        ];

        return { success: true };
    }
};