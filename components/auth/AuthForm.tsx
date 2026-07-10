"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthMode = "sign-in" | "sign-up";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === "sign-up";

  return (
    <form
      className="auth-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setStatus("");
        setIsSubmitting(true);

        const supabase = getSupabaseBrowserClient();

        if (!supabase) {
          setError("Supabase auth is not configured yet.");
          setIsSubmitting(false);
          return;
        }

        if (password.length < 8) {
          setError("Password must be at least 8 characters.");
          setIsSubmitting(false);
          return;
        }

        const redirectTo = `${window.location.origin}/onboarding`;

        const result = isSignUp
          ? await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name,
                },
                emailRedirectTo: redirectTo,
              },
            })
          : await supabase.auth.signInWithPassword({ email, password });

        if (result.error) {
          setError(result.error.message);
          setIsSubmitting(false);
          return;
        }

        if (isSignUp && result.data.session) {
          window.location.assign("/onboarding");
          return;
        }

        if (isSignUp) {
          setStatus("Account created. Check your email if confirmation is enabled.");
          setIsSubmitting(false);
          return;
        }

        window.location.assign("/onboarding");
      }}
    >
      {isSignUp ? (
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
            value={name}
          />
        </label>
      ) : null}
      <label>
        <span>Email</span>
        <input
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
          type="email"
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          autoComplete={isSignUp ? "new-password" : "current-password"}
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          required
          type="password"
          value={password}
        />
      </label>
      {error ? <p className="auth-error">{error}</p> : null}
      {status ? <p className="auth-status">{status}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Working..." : isSignUp ? "Create account" : "Sign in"}
        <ArrowRight size={17} />
      </button>
      <p className="auth-switch">
        {isSignUp ? "Already have an account?" : "New to FlowBridge CRM?"}{" "}
        <Link href={isSignUp ? "/sign-in" : "/sign-up"}>
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
