"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementBlogLikes } from "@/app/services/blogs";

const getRequiredText = (formData: FormData, field: string): string => {
  const value = String(formData.get(field) ?? "").trim();

  if (!value) {
    throw new Error(`${field} is required`);
  }

  return value;
};

export async function createBlog(formData: FormData) {
  const title = getRequiredText(formData, "title");
  const author = getRequiredText(formData, "author");
  const url = getRequiredText(formData, "url");

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
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
