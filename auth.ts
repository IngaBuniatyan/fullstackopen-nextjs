import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username =
          typeof credentials?.username === "string"
            ? credentials.username.trim()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!username || !password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, username),
        });

        if (!user?.passwordHash) {
          return null;
        }

        const passwordCorrect = await bcrypt.compare(
          password,
          user.passwordHash,
        );

        if (!passwordCorrect) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        };
      },
    }),
  ],
});
