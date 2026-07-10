<script>
    import { invalidateAll } from '$app/navigation';
    
    // Svelte 5 modern prop declaration
    let { data, form } = $props();

    // Svelte 5 Replacement for old reactive ($:) statements
    $effect(() => {
        if (form && form.success) {
            invalidateAll();
        }
    });
</script>

<main class="container">
    <h2>👤 Player Registry</h2>

    {#if form && form.error}
        <div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-weight: bold; border: 1px solid #fca5a5;">
            ⚠️ {form.error}
        </div>
    {/if}

    {#if form && form.success}
        <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-weight: bold; border: 1px solid #6ee7b7;">
            ✅ Player registered successfully!
        </div>
    {/if}

    <section class="box">
        <h3>Enroll New Player</h3>
        <form method="POST" action="?/create">
            <div class="form-group">
                <input type="text" name="name" placeholder="Full Name" required />
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div class="form-group">
                <input type="number" name="rating" placeholder="Chess Rating (e.g. 1500)" required />
            </div>
            <button type="submit" class="btn-primary">Register Player</button>
        </form>
    </section>

    <h3>Registered Competitors</h3>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
            {#if data && data.players && data.players.length > 0}
                {#each data.players as player}
                    <tr>
                        <td>{player.id}</td>
                        <td><strong>{player.name}</strong></td>
                        <td>{player.email}</td>
                        <td>⚡ {player.rating}</td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4" style="text-align: center; color: #64748b; padding: 2rem;">
                        No players enrolled yet. Fill out the form above to add your first row!
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</main>

<style>
    .container { max-width: 800px; margin: 2rem auto; font-family: sans-serif; padding: 0 1rem; }
    .box { background: #f8fafc; padding: 1.5rem; border-radius: 6px; margin: 1.5rem 0 2rem 0; border: 1px solid #e2e8f0; }
    .form-group { margin-bottom: 1rem; }
    input { display: block; width: 100%; max-width: 350px; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.95rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #fff; }
    th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
    th { background: #f1f5f9; color: #475569; }
    .btn-primary { background: #2563eb; color: white; padding: 0.6rem 1.2rem; border: none; font-weight: bold; cursor: pointer; border-radius: 4px; }
</style>