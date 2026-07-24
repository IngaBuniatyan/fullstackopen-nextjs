"use server";

import { randomUUID } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/services/session";
import { getBlogOwner } from "@/app/services/reading-list";
import { db } from "@/db";
import { readingList, users } from "@/db/schema";

const parsePositiveId = (value: FormDataEntryValue | null): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const isUniqueViolation = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { code?: string; cause?: unknown };
  return (
    candidate.code === "23505" ||
    (candidate.cause !== undefined && isUniqueViolation(candidate.cause))
  );
};

export async function generateApiToken() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await db
    .update(users)
    .set({ token: randomUUID() })
    .where(eq(users.id, user.id));

  revalidatePath("/me");
}

export async function addToReadingList(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const blogId = parsePositiveId(formData.get("blogId"));

  if (!blogId) {
    throw new Error("valid blog id is required");
  }

  const blog = await getBlogOwner(blogId);

  if (!blog) {
    throw new Error("blog not found");
  }

  if (blog.userId === user.id) {
    throw new Error("own blogs cannot be added to the reading list");
  }

  try {
    await db.insert(readingList).values({ userId: user.id, blogId });
  } catch (error) {
    if (!isUniqueViolation(error)) {
      throw error;
    }
  }

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}

export async function markReadingListEntryRead(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const entryId = parsePositiveId(formData.get("entryId"));

  if (!entryId) {
    throw new Error("valid reading list entry id is required");
  }

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(eq(readingList.id, entryId), eq(readingList.userId, user.id)),
    );

  revalidatePath("/me");
}
