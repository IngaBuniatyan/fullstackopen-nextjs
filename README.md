# Full Stack Open – Next.js

Exercises 1–25 from the Next.js section of Full Stack Open.

## Deployed application

https://fullstackopen-nextjs-ikej.vercel.app

## Features

- Next.js App Router, React Server Components and Server Actions
- Auth.js/NextAuth Credentials login with JWT sessions
- Password hashing with bcryptjs
- User registration and server-side form validation
- React Context success and error notifications
- Responsive Tailwind CSS 4 styling
- Persistent blogs and users in Neon PostgreSQL
- Drizzle ORM, relations and versioned SQL migrations
- Personal profile with replaceable API token
- Authenticated `GET /api/me` bearer-token endpoint
- Personal unread/read reading list
- Static MDX homepage
- Playwright end-to-end tests and GitHub Actions

## Environment

Local development requires an ignored `.env.local`:

```text
DATABASE_URL=<Neon connection string>
AUTH_SECRET=<random secret>
AUTH_URL=http://localhost:3000
```

Official tests require an ignored `.env.test` that points to a completely
separate Neon database:

```text
DATABASE_URL=<separate test database connection string>
NEXTAUTH_SECRET=<random test secret>
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=test
```

Never use the production database for the Playwright tests. The test suite
resets all application data before each test.

## Install and run

```sh
npm install
npm run dev
```

For a production check:

```sh
npm run build
npm start
```

Database commands:

```sh
npm run db:generate
npm run db:migrate
npm run db:check
npm run db:studio
```

Tests:

```sh
npm run test:e2e
npm run test:e2e:ui
```

## Routes

- `/` – static MDX homepage
- `/login` – credentials login
- `/register` – registration with server validation
- `/blogs` – ordered blog list and server-side title search
- `/blogs/new` – authenticated blog creation
- `/blogs/[id]` – blog details, likes and reading-list action
- `/users` – users
- `/users/[username]` – one user and their blogs
- `/me` – authenticated profile, API token and reading list
- `/api/me` – bearer-token profile API
- `/api/auth/[...nextauth]` – Auth.js handlers
- `/api/testing/reset` – test-database reset
- `/api/testing/users` – test user creation

The testing endpoints return `403` in production. They must only be used with
the separate test database.

## Security

Passwords are stored only as bcrypt hashes. Password hashes and API tokens are
never returned by the profile API. Environment files, Vercel metadata,
Playwright reports and build artifacts are ignored by Git.
