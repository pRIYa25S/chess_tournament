<nav class="global-header">
    <a href="/">🏠 Home</a> | 
    <a href="/player">👤 Players</a> | 
    <a href="/tournament">🏆 Tournaments</a> | 
    <a href="/registration">📝 Registration</a> | 
    <a href="/match">⚔️ Match Center</a> | 
    <a href="/leaderboard">🥇 Standings</a>
</nav>

<slot />

<style>
    .global-header {
        background: #1e293b;
        padding: 1rem;
        text-align: center;
        color: white;
        font-family: sans-serif;
    }
    .global-header a {
        color: #f8fafc;
        text-decoration: none;
        margin: 0 0.75rem;
        font-weight: bold;
    }
    .global-header a:hover {
        color: #3b82f6;
    }
</style>