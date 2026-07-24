import Link from "next/link";
import { redirect } from "next/navigation";
import {
  generateApiToken,
  markReadingListEntryRead,
} from "@/app/actions/account";
import { getReadingListWithBlogs } from "@/app/services/reading-list";
import { getCurrentUser } from "@/app/services/session";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const entries = await getReadingListWithBlogs(user.id);
  const unread = entries.filter((entry) => !entry.read);
  const read = entries.filter((entry) => entry.read);

  return (
    <section className="profile-layout">
      <div className="profile-card" data-testid="user-profile">
        <p className="eyebrow">Exercise 18</p>
        <h1 data-testid="user-name">{user.name}</h1>
        <p className="profile-username" data-testid="user-username">
          @{user.username}
        </p>
      </div>

      <section className="profile-card" data-testid="api-token-section">
        <h2>API token</h2>
        {user.token ? (
          <div className="token-display" data-testid="token-display">
            <code data-testid="api-token">{user.token}</code>
          </div>
        ) : (
          <p data-testid="no-token-message">
            You have not generated an API token yet.
          </p>
        )}
        <form action={generateApiToken}>
          <button data-testid="generate-token-button" type="submit">
            {user.token ? "Replace token" : "Generate token"}
          </button>
        </form>
      </section>

      <section className="profile-card" data-testid="reading-list-section">
        <h2>Reading list</h2>
        {entries.length === 0 && (
          <p data-testid="empty-reading-list">Your reading list is empty.</p>
        )}

        <div data-testid="unread-section">
          <h3>Unread</h3>
          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs.</p>
          ) : (
            <ul className="reading-list">
              {unread.map((entry) => (
                <li key={entry.id}>
                  <Link href={`/blogs/${entry.blog.id}`}>
                    {entry.blog.title}
                  </Link>
                  <form action={markReadingListEntryRead}>
                    <input
                      name="entryId"
                      type="hidden"
                      value={entry.id}
                    />
                    <button
                      data-testid={`mark-read-${entry.id}`}
                      type="submit"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-testid="read-section">
          <h3>Read</h3>
          {read.length === 0 ? (
            <p data-testid="no-read-blogs">No read blogs.</p>
          ) : (
            <ul className="reading-list">
              {read.map((entry) => (
                <li key={entry.id}>
                  <Link href={`/blogs/${entry.blog.id}`}>
                    {entry.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </section>
  );
}
