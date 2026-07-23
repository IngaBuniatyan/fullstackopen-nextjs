import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Full Stack Open · Next.js</p>
      <h1>From single-page apps to server-side rendering</h1>
      <p>
        A small blog application built with React Server Components,
        filesystem routing and Server Actions.
      </p>
      <Link className="button-link" href="/blogs">
        Explore the blogs
      </Link>
    </section>
  );
}
