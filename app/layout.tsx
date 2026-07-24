import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Stack Open Blog",
  description: "Next.js exercises 1–10 for Full Stack Open",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav aria-label="Main navigation" className="site-nav">
            <Link className="brand" href="/">
              FSO Blog
            </Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/users">Users</Link>
              <Link href="/blogs/new">Create new</Link>
            </div>
          </nav>
        </header>
        <main className="page-shell">{children}</main>
        <footer className="site-footer">
          Full Stack Open · Next.js Chapters 2–3
        </footer>
      </body>
    </html>
  );
}
