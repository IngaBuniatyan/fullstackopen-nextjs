import Link from "next/link";
import { notFound } from "next/navigation";
import { addToReadingList } from "@/app/actions/account";
import { incrementLikes } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { getReadingListEntry } from "@/app/services/reading-list";
import { getCurrentUser } from "@/app/services/session";

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

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const readingListEntry = user
    ? await getReadingListEntry(user.id, blog.id)
    : null;
  const canAddToReadingList =
    Boolean(user) && blog.userId !== user?.id && !readingListEntry;

  return (
    <article className="detail-card" data-testid="blog-detail">
      <p className="eyebrow">Exercise 3 and 4</p>
      <h1 data-testid="blog-title">{blog.title}</h1>
      <dl className="detail-list">
        <div>
          <dt>Author</dt>
          <dd data-testid="blog-author">{blog.author}</dd>
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
        {canAddToReadingList && (
          <form action={addToReadingList}>
            <input name="blogId" type="hidden" value={blog.id} />
            <button
              data-testid="add-to-reading-list-button"
              type="submit"
            >
              add to reading list
            </button>
          </form>
        )}
        <Link className="secondary-button" href="/blogs">
          Back to blogs
        </Link>
      </div>
    </article>
  );
}
