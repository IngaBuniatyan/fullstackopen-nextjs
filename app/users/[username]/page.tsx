import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

export const dynamic = "force-dynamic";

type UserPageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div>
        <p className="eyebrow">Exercise 10</p>
        <h1>{user.name}</h1>
        <p className="mt-2 text-slate-600">@{user.username}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Added blogs</h2>
        {user.blogs.length > 0 ? (
          <ul className="mt-4 grid gap-4">
            {user.blogs.map((blog) => (
              <li className="blog-card" key={blog.id}>
                <div>
                  <Link className="blog-title" href={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                  <p className="mt-1 text-slate-600">by {blog.author}</p>
                </div>
                <p className="likes">{blog.likes} likes</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state mt-4">This user has no blogs yet.</p>
        )}
      </div>
    </section>
  );
}
