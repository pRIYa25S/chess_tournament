# 🏆 Chess Tournament Management System

A sleek, production-ready web application built with **SvelteKit** and **PostgreSQL** to seamlessly enroll competitors, track live tournament registrations, manage match center schedules, and compute dynamic player standings.

---

## 🚀 Features

*   **Competitor Enrollment:** Add players instantly via an inline form validating real-time database constraints.
*   **Live Roster Dynamic Feed:** Clean, beautifully scannable data grids showcasing dynamic player rating badges.
*   **Fail-Safe Architecture:** Handles edge-case connection errors, unique email data constraints, and atomic request operations.
*   **Modular Database Pooling:** Utilizes highly optimized relational pooling setups via `pg`.

---

## 🛠️ Tech Stack

*   **Frontend Framework:** SvelteKit (Svelte 5 / reactive components)
*   **Backend Engine:** Server-side route handlers (`+page.server.js`)
*   **Database Engine:** PostgreSQL (Relational structural queries)
*   **Styling Engine:** Scoped component architecture (Modern Fluid UI layout)

---

## 📦 Local Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js** and **PostgreSQL** installed locally.

### 2. Install Project Dependencies
```bash
npm install