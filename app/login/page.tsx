"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/components/NotificationContext";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError("Invalid username or password");
      return;
    }

    showNotification("Login successful", "success");
    router.push("/");
    router.refresh();
  };

  return (
    <section className="auth-card">
      <div>
        <p className="eyebrow">Exercise 11</p>
        <h1>Login</h1>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input id="username" name="username" type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" />
        </label>
        {error && (
          <p className="form-error" data-testid="error-message">
            {error}
          </p>
        )}
        <button
          data-testid="login-button"
          disabled={pending}
          type="submit"
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
