# Digital Heroes - Lead Platform

This is a modern lead management platform built for the Digital Heroes training task.

## Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Database:** SQLite with Prisma ORM
* **Authentication:** NextAuth.js (Credentials Provider)
* **Styling:** Tailwind CSS

## Getting Started Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Seed the Database** (Creates test admin/member accounts):
   ```bash
   npm install -D tsx
   npx tsx prisma/seed.ts
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Accounts
* **Admin:** `admin@digitalheroes.com` / `password123`
* **Member:** `member@digitalheroes.com` / `password123`

## API Documentation

### `POST /api/leads`
Creates a new lead. Unauthenticated (used by the public capture form).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "cuid...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "status": "NEW",
    "createdAt": "..."
  }
}
```

### `GET /api/leads`
Retrieves a paginated list of leads. Requires Authentication.

**Query Parameters:**
* `page` (default: 1)
* `limit` (default: 10)
* `status` (optional filter)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "cuid...",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "NEW"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

## Deployment Instructions

To deploy this live (e.g., to Vercel or Render):

1. **Push to GitHub:** Commit this repository and push it to a new public GitHub repo.
2. **Database for Production:** SQLite works well locally, but on Vercel (serverless), it becomes read-only on every request. Before deploying to Vercel, you should provision a free PostgreSQL database (e.g., using Supabase or Neon).
   * Update `prisma/schema.prisma` provider to `"postgresql"`.
   * Add the Postgres `DATABASE_URL` to your Vercel Environment Variables.
3. **Deploy on Vercel:**
   * Go to Vercel.com and import your GitHub repo.
   * Add `NEXTAUTH_SECRET="your_random_secret_string"` in Vercel Environment Variables.
   * Add `NEXTAUTH_URL="https://your-vercel-domain.vercel.app"` in Environment Variables.
   * Modify the Vercel Build Command to: `npx prisma generate && npx prisma db push && next build`
   * Click Deploy!
