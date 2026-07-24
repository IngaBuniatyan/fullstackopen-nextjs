"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementBlogLikes } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";

export type BlogFormState = {
  errors: {
    title?: string;
    author?: string;
    url?: string;
  };
  values: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
};

export async function createBlog(
  _previousState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const values = {
    title: String(formData.get("title") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim(),
    url: String(formData.get("url") ?? "").trim(),
  };
  const errors: BlogFormState["errors"] = {};

  if (values.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (values.author.length < 5) {
    errors.author = "Author must be at least 5 characters";
  }

  if (values.url.length < 5) {
    errors.url = "URL must be at least 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values, success: false };
  }

  await addBlog(values.title, values.author, values.url, user.id);
  revalidatePath("/blogs");
  revalidatePath(`/users/${user.username}`);

  return {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: true,
  };
}

export async function incrementLikes(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("valid blog id is required");
  }

  const blog = await incrementBlogLikes(id);

  if (!blog) {
    throw new Error("blog not found");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}
