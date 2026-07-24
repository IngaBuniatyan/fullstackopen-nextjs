"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createBlog,
  type BlogFormState,
} from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
};

export default function BlogForm() {
  const [state, formAction, pending] = useActionState(
    createBlog,
    initialState,
  );
  const router = useRouter();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully", "success");
      router.push("/blogs");
      router.refresh();
    }
  }, [router, showNotification, state.success]);

  return (
    <form action={formAction} className="blog-form">
      <label htmlFor="title">
        Title
        <input
          defaultValue={state.values.title}
          id="title"
          name="title"
          type="text"
        />
      </label>
      {state.errors.title && (
        <p className="form-error" data-testid="title-error">
          {state.errors.title}
        </p>
      )}

      <label htmlFor="author">
        Author
        <input
          defaultValue={state.values.author}
          id="author"
          name="author"
          type="text"
        />
      </label>
      {state.errors.author && (
        <p className="form-error" data-testid="author-error">
          {state.errors.author}
        </p>
      )}

      <label htmlFor="url">
        URL
        <input
          defaultValue={state.values.url}
          id="url"
          name="url"
          type="text"
        />
      </label>
      {state.errors.url && (
        <p className="form-error" data-testid="url-error">
          {state.errors.url}
        </p>
      )}

      <button
        data-testid="create-blog-button"
        disabled={pending}
        type="submit"
      >
        {pending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
