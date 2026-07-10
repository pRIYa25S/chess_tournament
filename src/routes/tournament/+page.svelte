<script>
    import { invalidateAll } from '$app/navigation';
    let { data, form } = $props();

    $effect(() => {
        if (form && form.success) {
            invalidateAll();
        }
    });
</script>

<main class="container">
    <h2>🏆 Tournament Registry</h2>

    <section class="box">
        <h3>Create New Event</h3>
        <form method="POST" action="?/create">
            <input type="text" name="name" placeholder="Tournament Name" required />
            
            <input type="text" name="location" placeholder="Venue Location" required />
            
            <label for="start">Start Date:</label>
            <input type="date" id="start" name="start_date" required />
            
            <label for="end">End Date:</label>
            <input type="date" id="end" name="end_date" required />
            
            <button type="submit" class="btn-primary">Create Tournament</button>
        </form>
    </section>

    <h3>Active Events Pool</h3>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Timeline</th>
            </tr>
        </thead>
        <tbody>
            {#if data && data.tournaments && data.tournaments.length > 0}
                {#each data.tournaments as t}
                    <tr>
                        <td>{t.id}</td>
                        <td><strong>{t.name}</strong></td>
                        <td>📍 {t.location || 'Unknown Venue'}</td>
                        <td>📅 {new Date(t.start_date).toLocaleDateString()} to {new Date(t.end_date).toLocaleDateString()}</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</main>