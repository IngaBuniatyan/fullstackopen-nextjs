import "server-only";

import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getCurrentUser = async () => {
  const session = await auth();
  const username = session?.user?.email;

  if (!username) {
    return null;
  }

  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
};
