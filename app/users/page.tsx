import Link from "next/link";
import { getUsers } from "@/app/services/users";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section className="space-y-8">
      <div>
        <p className="eyebrow">Exercise 9</p>
        <h1>Users</h1>
        <p className="mt-2 text-slate-600">
          Blog authors stored in PostgreSQL.
        </p>
      </div>

      {users.length > 0 ? (
        <ul className="grid gap-4">
          {users.map((user) => (
            <li className="blog-card" key={user.id}>
              <div>
                <Link className="blog-title" href={`/users/${user.username}`}>
                  {user.name}
                </Link>
                <p className="mt-1 text-slate-600">@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No users yet.</p>
      )}
    </section>
  );
}
