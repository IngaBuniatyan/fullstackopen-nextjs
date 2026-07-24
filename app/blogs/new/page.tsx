import BlogForm from "@/app/blogs/new/BlogForm";

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

      <BlogForm />
    </section>
  );
}
