"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { loginAction } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="w-full h-full max-w-lg mx-auto mt-8 p-8">
      <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
      <form className="space-y-4" action={action}>
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
        </div>

        {state?.message && <p className="text-red-500">{state.message}</p>}

        <Button disabled={pending} className="w-full" type="submit">
          Sign In
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center mt-2">
        Don't have an account?{" "}
        <Link href="/signup" className="underline text-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
}
