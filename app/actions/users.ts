"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";

export type RegistrationState = {
  errors: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values: {
    username: string;
    name: string;
  };
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

export async function registerUser(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const errors: RegistrationState["errors"] = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  if (!name) {
    errors.name = "Name is required";
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = "Password confirmation is required";
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = "Passwords do not match";
  }

  const values = { username, name };

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const existingUser = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.username, username),
  });

  if (existingUser) {
    return {
      errors: { username: "Username is already taken" },
      values,
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ username, name, passwordHash });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        errors: { username: "Username is already taken" },
        values,
      };
    }

    throw error;
  }

  redirect("/login");
}
