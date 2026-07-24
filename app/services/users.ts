import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUsers = async () =>
  db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
    })
    .from(users)
    .orderBy(asc(users.username));

export const getUserWithBlogs = async (username: string) =>
  db.query.users.findFirst({
    columns: {
      id: true,
      username: true,
      name: true,
    },
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
