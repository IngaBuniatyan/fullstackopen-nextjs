import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state space-y-4">
      <h1>404 – Blog not found</h1>
      <p>The requested blog does not exist.</p>
      <Link className="button-link" href="/blogs">
        Return to blogs
      </Link>
    </section>
  );
}
