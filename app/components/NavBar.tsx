"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const signedIn = status === "authenticated";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-nav">
        <Link className="brand" href="/">
          FSO Blog
        </Link>
        <div className="nav-links">
          <Link href="/">home</Link>
          <Link href="/blogs">blogs</Link>
          <Link href="/users">users</Link>
          {signedIn ? (
            <>
              <Link href="/blogs/new">create new</Link>
              <Link href="/me">me</Link>
              <span className="signed-in-user">{session.user?.name}</span>
              <button
                className="nav-button"
                onClick={handleLogout}
                type="button"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">login</Link>
              <Link href="/register">register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
