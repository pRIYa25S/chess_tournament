<script>
    export let data;
    export let form;
    
    // Fallback guarantees the interface won't throw a 500 error if the array drops
    $: players = data?.player || [];
</script>

<div class="dashboard-container">
    <!-- Action Alert Messages -->
    {#if form?.success}
        <div class="alert alert-success">🏅 Player registered successfully!</div>
    {:else if form?.error}
        <div class="alert alert-danger">⚠️ {form.error}</div>
    {/if}

    <!-- Enrollment Form Block -->
    <div class="form-card">
        <h2>Enroll New Competitor</h2>
        <form method="POST" action="?/create" class="inline-form">
            <div class="input-group">
                <input type="text" name="name" placeholder="Full Name" required />
            </div>
            <div class="input-group">
                <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div class="input-group">
                <input type="number" name="rating" placeholder="Chess Rating (e.g. 1500)" required />
            </div>
            <button type="submit" class="btn-submit">Register Player</button>
        </form>
    </div>

    <!-- Clean Scannable Grid Table -->
    <div class="table-card">
        <h2>Registered Competitors</h2>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th style="width: 10%">ID</th>
                        <th style="width: 35%">Name</th>
                        <th style="width: 35%">Email</th>
                        <th style="width: 20%">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {#if players.length > 0}
                        {#each players as p}
                            <tr>
                                <td class="bold-id">#{p.id}</td>
                                <td>{p.name}</td>
                                <td class="text-muted">{p.email || '—'}</td>
                                <td><span class="badge-rating">{p.rating}</span></td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td colspan="4" class="empty-state">No players enrolled yet. Fill out the form above to add your first row!</td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</div>