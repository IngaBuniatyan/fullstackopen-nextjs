# Full Stack Open – Next.js

Exercises 1–10 from the Next.js section of Full Stack Open.

## Deployed application

https://fullstackopen-nextjs-ikej.vercel.app

The application uses:

- Next.js App Router
- React Server Components
- Server Actions
- TypeScript
- PostgreSQL on Neon
- Drizzle ORM and versioned SQL migrations

## Install and run

```sh
npm install
npm run dev
```

Create `.env.local` with the database connection string before starting:

```text
DATABASE_URL=<Neon connection string>
```

The environment file is ignored by Git. Generate, apply and inspect database
migrations with:

```sh
npm run db:generate
npm run db:migrate
npm run db:check
npm run db:studio
```

For a production check:

```sh
npm run build
npm start
```

## Routes

- `/` – home
- `/blogs` – ordered blog list and server-side title search
- `/blogs/new` – create a blog through a Server Action
- `/blogs/[id]` – blog details and like action
- `/users` – users stored in PostgreSQL
- `/users/[username]` – one user and their related blogs

Search URLs are shareable, for example `/blogs?filter=next`.

Blogs and users persist in PostgreSQL. Blog ordering and case-insensitive title
filtering are performed in the database. Every blog belongs to a user, and new
blogs are assigned to one existing user at random. The individual user view is
loaded with one Drizzle relational query.
