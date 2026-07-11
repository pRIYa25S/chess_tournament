<script>
    let { data } = $props();

    // Secure Frontend Fallback Sort: Forces wins desc, then breaks ties via Elo rating desc
    let sortedLeaderboard = $derived(
        data?.leaderboard ? [...data.leaderboard].sort((a, b) => {
            const winsA = Number(a.wins || 0);
            const winsB = Number(b.wins || 0);
            
            if (winsB !== winsA) {
                return winsB - winsA; // Sort by wins first
            }
            
            const ratingA = Number(a.rating || 0);
            const ratingB = Number(b.rating || 0);
            return ratingB - ratingA; // Break ties using Elo rating
        }) : []
    );
</script>

<main class="container">
    <h2>🏆 Tournament Leaderboard</h2>

    {#if data && data.dbError}
        <div class="alert error">
            <h3>❌ Metrics Query Failure</h3>
            <p style="font-family: monospace;">{data.dbError}</p>
        </div>
    {/if}

    <section class="box">
        <h3>Current Standings</h3>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Competitor Name</th>
                    <th>Elo Rating</th>
                    <th>Matches Played</th>
                    <th>Total Wins</th>
                </tr>
            </thead>
            <tbody>
                {#if sortedLeaderboard.length > 0}
                    {#each sortedLeaderboard as row, index}
                        <tr>
                            <td>
                                <strong class="rank-badge">
                                    {#if index === 0}
                                        🥇 1
                                    {:else if index === 1}
                                        🥈 2
                                    {:else if index === 2}
                                        🥉 3
                                    {:else}
                                        {index + 1}
                                    {/if}
                                </strong>
                            </td>
                            <td><strong>{row.name}</strong></td>
                            <td>⚡ {row.rating}</td>
                            <td>{row.matches_played || 0}</td>
                            <td class="wins-cell">🏆 {row.wins || 0}</td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="5" style="text-align: center; color: #64748b; padding: 2rem;">
                            No data found. Go generate fixtures in the Match Center first!
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </section>
</main>

<style>
    .container { max-width: 900px; margin: 2rem auto; font-family: sans-serif; padding: 0 1rem; }
    .box { background: #fff; padding: 1rem; border-radius: 6px; border: 1px solid #e2e8f0; }
    table { width: 100%; border-collapse: collapse; background: #fff; }
    th, td { border: 1px solid #e2e8f0; padding: 14px; text-align: left; }
    th { background: #f1f5f9; color: #475569; }
    .rank-badge { font-size: 1.05rem; color: #1e293b; }
    .wins-cell { font-weight: bold; color: #16a34a; }
    .alert { background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 6px; border: 1px solid #fca5a5; }
</style>