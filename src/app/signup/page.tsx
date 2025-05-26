"use client";

import Link from "next/link";
import { useActionState, useMemo, useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/utils";
import { signUpAction, usernameAvailiableAction } from "./actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signUpAction, null);

  const [isCheckingUsername, startTransition] = useTransition();
  const [usernameAvailiable, setUsernameAvailiable] = useState(true);

  const handleUsernameChange = useMemo(
    () =>
      debounce((username: string) => {
        startTransition(async () => {
          const availiable = await usernameAvailiableAction(username);
          setUsernameAvailiable(availiable);
        });
      }, 500),
    []
  );

  return (
    <div className="w-full h-full max-w-lg mx-auto mt-8 p-8">
      <h1 className="text-2xl font-bold text-center mb-2">
        Create your account
      </h1>
      <form className="space-y-4" action={action}>
        <div className="space-y-1 relative">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="yourname"
              required
              defaultValue={state?.username}
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
            {isCheckingUsername && (
              <Loader className="w-5 h-5 animate-spin absolute right-2 top-0 bottom-0 my-auto" />
            )}
          </div>
          {state?.errors?.username && (
            <p className="text-red-500">{state.errors.username}</p>
          )}
          {!usernameAvailiable && (
            <p className="text-red-500">Username not availiable</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            defaultValue={state?.email}
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          {state?.errors?.password && (
            <div className="text-red-500">
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {state?.message && <p className="text-red-500">{state.message}</p>}

        <Button
          disabled={pending || !usernameAvailiable}
          className="w-full"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center mt-2">
        Already have an account?{" "}
        <Link href="/login" className="underline text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
