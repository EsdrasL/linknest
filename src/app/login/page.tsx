"use client";

import { useActionState } from "react";
import { onLoginSubmit } from "./actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(onLoginSubmit, undefined);

  return (
    <>
      <h1>Log In</h1>
      <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="Email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        {state?.message && <p>{state.message}</p>}

        <button disabled={pending} type="submit">
          Login
        </button>
      </form>
    </>
  );
}
