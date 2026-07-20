<script>
  export let data;
  export let form;
</script>

<div class="container">
  <div class="card">
    <h2>🏆 Tournament Registry</h2>

    {#if form?.success}
      <div class="alert alert-success">
        ✅ Tournament created successfully!
      </div>
    {/if}

    <form method="POST" class="form-grid">
      <div class="form-group">
        <label for="name">Tournament Name</label>
        <input type="text" id="name" name="name" placeholder="e.g. Summer Masters 2026" required />
      </div>

      <div class="form-group">
        <label for="location">Venue Location</label>
        <input type="text" id="location" name="location" placeholder="e.g. Hall A, Stadium" required />
      </div>

      <div class="form-group">
        <label for="startDate">Start Date</label>
        <input type="date" id="startDate" name="startDate" required />
      </div>

      <div class="form-group">
        <label for="endDate">End Date</label>
        <input type="date" id="endDate" name="endDate" required />
      </div>

      <button type="submit" class="btn-primary">Create Event</button>
    </form>
  </div>

  <div class="card margin-top">
    <h3>Active Events Pool</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Timeline</th>
        </tr>
      </thead>
      <tbody>
        {#each data.tournaments as tourney}
          <tr>
            <td>#{tourney.id}</td>
            <td><strong>{tourney.name}</strong></td>
            <td>📍 {tourney.location}</td>
            <td>📅 {tourney.start_date || tourney.startDate} to {tourney.end_date || tourney.endDate}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .container {
    max-width: 950px;
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
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
    background-color: #dc2626;
    color: white;
    border: none;
    padding: 0.65rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-primary:hover {
    background-color: #b91c1c;
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