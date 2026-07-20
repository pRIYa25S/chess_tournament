<script>
  export let data;
  export let form;
</script>

<div class="container">
  <div class="card">
    <h2>👤 Enroll New Competitor</h2>

    {#if form?.success}
      <div class="alert alert-success">
        ✅ Player enrolled successfully!
      </div>
    {/if}

    <form method="POST" class="form-grid">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="e.g. Garry Kasparov" required />
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="player@chess.com" required />
      </div>

      <div class="form-group">
        <label for="rating">Chess Rating (Elo)</label>
        <input type="number" id="rating" name="rating" placeholder="1500" required />
      </div>

      <button type="submit" class="btn-primary">Register Player</button>
    </form>
  </div>

  <div class="card margin-top">
    <h3>Registered Competitors</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {#each data.players as player}
          <tr>
            <td>#{player.id}</td>
            <td><strong>{player.name}</strong></td>
            <td>{player.email}</td>
            <td>⚡ {player.rating}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .margin-top {
    margin-top: 2rem;
  }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
  }
  input {
    padding: 0.6rem 0.8rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
  .btn-primary {
    background-color: #4f46e5;
    color: white;
    border: none;
    padding: 0.65rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-primary:hover {
    background-color: #4338ca;
  }
  .alert-success {
    background-color: #d1fae5;
    color: #065f46;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  .data-table th, .data-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  .data-table th {
    background-color: #f9fafb;
    color: #4b5563;
    font-size: 0.85rem;
    text-transform: uppercase;
  }
</style>