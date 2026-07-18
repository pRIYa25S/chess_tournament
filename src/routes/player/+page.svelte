<script>
    export let data;
    export let form;
    $: currentPlayers = data?.player || [];
</script>

<div class="dashboard-container">
    {#if form?.success}
        <div class="alert alert-success">🏅 Player enrolled successfully!</div>
    {:else if form?.error}
        <div class="alert alert-danger">⚠️ {form.error}</div>
    {/if}

    <div class="form-card">
        <h2>Enroll New Competitor</h2>
        <form method="POST" action="?/create" class="inline-form">
            <input type="text" name="name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="number" name="rating" placeholder="Chess Rating" required />
            <button type="submit">Register Player</button>
        </form>
    </div>

    <div class="table-card">
        <h2>Registered Competitors</h2>
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
                {#each currentPlayers as p}
                    <tr>
                        <td>#{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.rating}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>