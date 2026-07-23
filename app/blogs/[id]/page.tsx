import Link from "next/link";
import { notFound } from "next/navigation";
import { incrementLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";

export const dynamic = "force-dynamic";

type BlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const blog = getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <article className="detail-card">
      <p className="eyebrow">Exercise 3 and 4</p>
      <h1>{blog.title}</h1>
      <dl className="detail-list">
        <div>
          <dt>Author</dt>
          <dd>{blog.author}</dd>
        </div>
        <div>
          <dt>URL</dt>
          <dd>
            <a href={blog.url} rel="noopener noreferrer" target="_blank">
              {blog.url}
            </a>
          </dd>
        </div>
        <div>
          <dt>Likes</dt>
          <dd>{blog.likes}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <form action={incrementLikes}>
          <input name="id" type="hidden" value={blog.id} />
          <button type="submit">Like</button>
        </form>
        <Link className="secondary-button" href="/blogs">
          Back to blogs
        </Link>
      </div>
    </article>
  );
}
