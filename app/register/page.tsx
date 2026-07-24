"use client";

import { useActionState } from "react";
import {
  registerUser,
  type RegistrationState,
} from "@/app/actions/users";

const initialState: RegistrationState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <section className="auth-card">
      <div>
        <p className="eyebrow">Exercises 12 and 15</p>
        <h1>Register</h1>
      </div>
      <form action={formAction} className="auth-form">
        <label htmlFor="username">
          Username
          <input
            defaultValue={state.values.username}
            id="username"
            name="username"
            type="text"
          />
        </label>
        {state.errors.username && (
          <p className="form-error" data-testid="username-error">
            {state.errors.username}
          </p>
        )}

        <label htmlFor="name">
          Name
          <input
            defaultValue={state.values.name}
            id="name"
            name="name"
            type="text"
          />
        </label>
        {state.errors.name && (
          <p className="form-error" data-testid="name-error">
            {state.errors.name}
          </p>
        )}

        <label htmlFor="password">
          Password
          <input id="password" name="password" type="password" />
        </label>
        {state.errors.password && (
          <p className="form-error" data-testid="password-error">
            {state.errors.password}
          </p>
        )}

        <label htmlFor="passwordConfirm">
          Confirm Password
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
          />
        </label>
        {state.errors.passwordConfirm && (
          <p className="form-error" data-testid="passwordConfirm-error">
            {state.errors.passwordConfirm}
          </p>
        )}

        <button
          data-testid="register-button"
          disabled={pending}
          type="submit"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </section>
  );
}
