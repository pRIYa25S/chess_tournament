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
    <h2>⚔️ Match Center</h2>

    {#if data && data.dbError}
        <div style="background: #fef2f2; color: #991b1b; padding: 1.5rem; border-radius: 6px; border: 1px solid #fee2e2; margin-bottom: 1.5rem;">
            <h3>❌ Database Query Failure</h3>
            <p style="font-family: monospace; font-size: 0.95rem;">{data.dbError}</p>
        </div>
    {/if}

    {#if form && form.error}
        <div class="alert error">⚠️ {form.error}</div>
    {/if}

    {#if form && form.success}
        <div class="alert success">✅ Match brackets generated successfully!</div>
    {/if}

    <section class="box">
        <h3>Generate Tournament Pairings</h3>
        <form method="POST" action="?/generate">
            <div class="form-row">
                <select name="tournament_id" required>
                    <option value="">-- Select Active Tournament --</option>
                    {#if data && data.tournaments}
                        {#each data.tournaments as t}
                            <option value={t.id}>{t.name}</option>
                        {/each}
                    {/if}
                </select>
                <button type="submit" class="btn-primary" disabled={!!data.dbError}>Generate Pairings</button>
            </div>
        </form>
    </section>

    <h3>Fixtures & Scheduled Matchups</h3>
    <table>
        <thead>
            <tr>
                <th>Tournament</th>
                <th>Player 1 (White)</th>
                <th>Player 2 (Black)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {#if data && data.matches && data.matches.length > 0}
                {#each data.matches as m}
                    <tr>
                        <td>{m.tournament_name}</td>
                        <td><strong>{m.player1_name}</strong></td>
                        <td><strong>{m.player2_name}</strong></td>
                        <td>
                            <span class={m.winner_id ? "badge complete" : "badge scheduled"}>
                                {m.winner_id ? "✅ Completed" : "⏳ Scheduled"}
                            </span>
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4" style="text-align: center; color: #64748b; padding: 2.5rem;">
                        No matches scheduled yet. Select a tournament pool above.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</main>

<style>
    .container { max-width: 900px; margin: 2rem auto; font-family: sans-serif; padding: 0 1rem; }
    .box { background: #f8fafc; padding: 1.5rem; border-radius: 6px; margin: 1.5rem 0; border: 1px solid #e2e8f0; }
    .form-row { display: flex; gap: 1rem; align-items: center; }
    select { padding: 0.6rem; border-radius: 4px; border: 1px solid #cbd5e1; min-width: 280px; background: white; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #fff; }
    th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
    th { background: #f1f5f9; }
    .btn-primary { background: #dc2626; color: white; padding: 0.6rem 1.2rem; border: none; font-weight: bold; cursor: pointer; border-radius: 4px; }
    .btn-primary:disabled { background: #cbd5e1; cursor: not-allowed; }
    .alert { padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-weight: bold; }
    .success { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
    .error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
    .scheduled { background: #fef3c7; color: #92400e; }
    .complete { background: #d1fae5; color: #065f46; }
</style>