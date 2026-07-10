"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Confirming your email...");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const confirmSession = async () => {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        setHasError(true);
        setMessage("Supabase auth is not configured yet.");
        return;
      }

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setHasError(true);
        setMessage("We could not confirm your session. Please sign in again.");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/onboarding";

      window.location.replace(next.startsWith("/") ? next : "/onboarding");
    };

    void confirmSession();
  }, []);

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Link className="auth-brand" href="/">
          FlowBridge CRM
        </Link>
        <div>
          <h1>{hasError ? "Confirmation needs attention." : "Email confirmed."}</h1>
          <p>{message}</p>
        </div>
        {hasError ? (
          <Link className="primary-button auth-full-link" href="/sign-in">
            Go to sign in
          </Link>
        ) : null}
      </section>
    </main>
  );
}
