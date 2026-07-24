import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Full Stack Open · Next.js</p>
      <h1>Server-rendered blogs backed by PostgreSQL</h1>
      <p>
        A small blog application built with React Server Components, Server
        Actions, Drizzle ORM and Neon.
      </p>
      <Link className="button-link" href="/blogs">
        Explore the blogs
      </Link>
    </section>
  );
}
