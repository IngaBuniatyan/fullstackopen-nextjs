import { createBlog } from "@/app/actions/blogs";

export default function NewBlogPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <div>
        <p className="eyebrow">Exercise 2</p>
        <h1>Create a new blog</h1>
        <p className="mt-2 text-slate-600">
          The form is handled directly by a Server Action.
        </p>
      </div>

      <form action={createBlog} className="blog-form">
        <label htmlFor="title">
          Title
          <input id="title" name="title" required type="text" />
        </label>

        <label htmlFor="author">
          Author
          <input id="author" name="author" required type="text" />
        </label>

        <label htmlFor="url">
          URL
          <input id="url" name="url" required type="url" />
        </label>

        <button type="submit">Create</button>
      </form>
    </section>
  );
}
