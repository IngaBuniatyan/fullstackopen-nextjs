import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";

export const dynamic = "force-dynamic";

type BlogsPageProps = {
  searchParams: Promise<{
    filter?: string | string[];
  }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const rawFilter = (await searchParams).filter;
  const filter = (
    Array.isArray(rawFilter) ? rawFilter[0] : rawFilter ?? ""
  ).trim();
  const blogs = await getBlogs(filter);

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Exercise 1, 5 and 6</p>
          <h1>Blogs</h1>
          <p className="mt-2 text-slate-600">
            Server-rendered and ordered by likes.
          </p>
        </div>
        <Link className="button-link" href="/blogs/new">
          Create new
        </Link>
      </div>

      <form action="/blogs" className="search-form" method="get">
        <label htmlFor="filter">Search by title</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            data-testid="filter-input"
            defaultValue={filter}
            id="filter"
            name="filter"
            placeholder="React"
            type="search"
          />
          <button data-testid="search-button" type="submit">
            Search
          </button>
          {filter && (
            <Link className="secondary-button" href="/blogs">
              Clear
            </Link>
          )}
        </div>
      </form>

      {blogs.length > 0 ? (
        <ul className="grid gap-4" data-testid="blogs-list">
          {blogs.map((blog) => (
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
        <p className="empty-state">No blogs match “{filter}”.</p>
      )}
    </section>
  );
}
