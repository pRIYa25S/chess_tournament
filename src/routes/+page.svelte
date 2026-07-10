<main class="container">
    <h1>♟️Chess Tournament Dashboard</h1>
    <p>Select an administrative module from below to manage your system:</p>
    
    <nav class="grid-nav">
        <a href="/player" class="card">👤 Player Registry</a>
        <a href="/tournament" class="card">🏆 Tournament Management</a>
        <a href="/registration" class="card">📝 Event Registration</a>
        <a href="/match" class="card">⚔️ Match Control Center</a>
        <a href="/leaderboard" class="card">🥇 Final Standings</a>
    </nav>
</main>

<style>
    .container { max-width: 800px; margin: 4rem auto; font-family: sans-serif; text-align: center; }
    .grid-nav { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
    .card { padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; font-weight: bold; background: #f8fafc; transition: all 0.2s; }
    .card:hover { background: #3b82f6; color: white; transform: translateY(-2px); }
</style>