import { desc, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, type Blog } from "@/db/schema";

export const getBlogs = async (filter?: string): Promise<Blog[]> => {
  const cleanFilter = filter?.trim();

  if (cleanFilter) {
    return db
      .select()
      .from(blogs)
      .where(ilike(blogs.title, `%${cleanFilter}%`))
      .orderBy(desc(blogs.likes));
  }

  return db.select().from(blogs).orderBy(desc(blogs.likes));
};

export const getBlogById = async (id: number): Promise<Blog | undefined> => {
  const [blog] = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  return blog;
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number,
): Promise<Blog> => {
  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();
  const cleanUrl = url.trim();

  if (!cleanTitle || !cleanAuthor || !cleanUrl) {
    throw new Error("title, author and url are required");
  }

  const [blog] = await db
    .insert(blogs)
    .values({
      title: cleanTitle,
      author: cleanAuthor,
      url: cleanUrl,
      userId,
    })
    .returning();

  return blog;
};

export const incrementBlogLikes = async (
  id: number,
): Promise<Blog | undefined> => {
  const [blog] = await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
    .returning();

  return blog;
};
