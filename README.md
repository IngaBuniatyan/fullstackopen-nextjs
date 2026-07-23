# Full Stack Open – Next.js

Exercises 1–6 from the Next.js section of Full Stack Open.

The application uses:

- Next.js App Router
- React Server Components
- Server Actions
- TypeScript

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

## Routes

- `/` – home
- `/blogs` – ordered blog list and server-side title search
- `/blogs/new` – create a blog through a Server Action
- `/blogs/[id]` – blog details and like action

Search URLs are shareable, for example `/blogs?filter=next`.

Blogs are stored only in server memory in Chapter 2. Blogs created while the
application is running disappear after a complete server restart.
