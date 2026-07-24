import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type User } from "@/db/schema";

export const getUsers = async (): Promise<User[]> =>
  db.select().from(users).orderBy(asc(users.username));

export const getUserWithBlogs = async (username: string) =>
  db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
