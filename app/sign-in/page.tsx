import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Link className="auth-brand" href="/">
          FlowBridge CRM
        </Link>
        <div>
          <h1>Sign in to your workspace.</h1>
          <p>Continue building your occupation-ready CRM setup.</p>
        </div>
        <AuthForm mode="sign-in" />
      </section>
    </main>
  );
}
