import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

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

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    );
  }

  const values = body as Record<string, unknown>;
  const username =
    typeof values.username === "string" ? values.username.trim() : "";
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const password =
    typeof values.password === "string" ? values.password : "";

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({ username, name, passwordHash })
      .returning({
        id: users.id,
        username: users.username,
        name: users.name,
      });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 },
      );
    }

    throw error;
  }
}
