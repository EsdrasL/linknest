"use client";

import { useActionState } from "react";
import { signUpAction } from "./actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signUpAction, undefined);

  return (
    <>
      <h1>Sign Up</h1>
      <form action={action}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="Username" />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="Email" />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        {state?.message && <p>{state.message}</p>}

        <button disabled={pending} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}
