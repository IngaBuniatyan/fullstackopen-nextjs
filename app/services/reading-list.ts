import "server-only";

import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";

export const getReadingListEntry = async (userId: number, blogId: number) =>
  db.query.readingList.findFirst({
    columns: { id: true, read: true },
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId),
    ),
  });

export const getReadingListWithBlogs = async (userId: number) =>
  db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });

export const getBlogOwner = async (blogId: number) =>
  db.query.blogs.findFirst({
    columns: { id: true, userId: true },
    where: eq(blogs.id, blogId),
  });
