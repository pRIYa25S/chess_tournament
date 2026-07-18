<script>
    export let data;
    export let form;
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
                    {#if data.player && data.player.length > 0}
                        {#each data.player as p}
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

<style>
    :global(body) {
        background-color: #f4f6f9;
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
    }

    .dashboard-container {
        max-width: 1100px;
        margin: 30px auto;
        padding: 0 20px;
    }

    h2 {
        font-size: 1.3rem;
        margin-top: 0;
        margin-bottom: 20px;
        color: #1a202c;
        font-weight: 600;
    }

    /* Form Styles */
    .form-card, .table-card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
        padding: 24px;
        margin-bottom: 25px;
    }

    .inline-form {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
    }

    .input-group {
        flex: 1;
        min-width: 200px;
    }

    input {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.95rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }

    input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .btn-submit {
        background-color: #2563eb;
        color: white;
        padding: 11px 24px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .btn-submit:hover {
        background-color: #1d4ed8;
    }

    /* Table Styles */
    .table-wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.95rem;
    }

    th {
        background-color: #f8fafc;
        color: #64748b;
        font-weight: 600;
        padding: 12px 16px;
        border-bottom: 2px solid #e2e8f0;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
    }

    td {
        padding: 14px 16px;
        border-bottom: 1px solid #e2e8f0;
        color: #334155;
        vertical-align: middle;
    }

    tr:hover td {
        background-color: #f8fafc;
    }

    .bold-id {
        font-weight: 600;
        color: #64748b;
    }

    .text-muted {
        color: #64748b;
    }

    .badge-rating {
        background-color: #eff6ff;
        color: #1e40af;
        padding: 4px 10px;
        border-radius: 9999px;
        font-weight: 600;
        font-size: 0.85rem;
        display: inline-block;
    }

    .empty-state {
        text-align: center;
        color: #94a3b8;
        padding: 30px 0;
        font-style: italic;
    }

    /* Alerts */
    .alert {
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 0.95rem;
    }
    .alert-success {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #bbf7d0;
    }
    .alert-danger {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
    }
</style>