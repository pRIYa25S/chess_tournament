<script>
    import { invalidateAll } from '$app/navigation';
    
    // Modern Svelte 5 destructuring props
    let { data, form } = $props();

    // Modern Svelte 5 side effects hook
    $effect(() => {
        if (form && form.success) {
            invalidateAll();
        }
    });
</script>

<main class="container">
    <h2>📝 Event Registration Roster</h2>

    {#if form && form.error}
        <div class="alert error">
            ⚠️ {form.error}
        </div>
    {/if}

    {#if form && form.success}
        <div class="alert success">
            ✅ Player successfully assigned to tournament bracket!
        </div>
    {/if}

    <section class="box">
        <h3>Link Player to Tournament</h3>
        <form method="POST" action="?/register">
            <label for="tournament">Select Tournament Pool:</label>
            <select id="tournament" name="tournament_id" required>
                <option value="">-- Choose Event --</option>
                {#if data && data.tournaments}
                    {#each data.tournaments as t}
                        <option value={t.id}>{t.name} ({t.location})</option>
                    {/each}
                {/if}
            </select>

            <label for="player">Select Competitor:</label>
            <select id="player" name="player_id" required>
                <option value="">-- Choose Player --</option>
                {#if data && data.players}
                    {#each data.players as p}
                        <option value={p.id}>{p.name} (ID: {p.id})</option>
                    {/each}
                {/if}
            </select>

            <button type="submit" class="btn-primary">Register Entry</button>
        </form>
    </section>
</main>

<style>
    .container { max-width: 800px; margin: 2rem auto; font-family: sans-serif; padding: 0 1rem; }
    .box { background: #f8fafc; padding: 1.5rem; border-radius: 6px; margin: 1.5rem 0 2rem 0; border: 1px solid #e2e8f0; }
    select { display: block; width: 100%; max-width: 350px; padding: 0.6rem; margin: 0.5rem 0 1rem 0; border: 1px solid #cbd5e1; border-radius: 4px; background: white; font-size: 0.95rem; }
    label { font-size: 0.85rem; font-weight: bold; color: #475569; }
    .btn-primary { background: #6366f1; color: white; padding: 0.6rem 1.2rem; border: none; font-weight: bold; cursor: pointer; border-radius: 4px; font-size: 0.95rem; }
    .btn-primary:hover { background: #4f46e5; }
    .alert { padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-weight: bold; }
    .success { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
    .error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
</style>