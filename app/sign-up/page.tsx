import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignUpPage() {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Link className="auth-brand" href="/">
          FlowBridge CRM
        </Link>
        <div>
          <h1>Create your CRM workspace.</h1>
          <p>Start with a guided setup path built around your business type.</p>
        </div>
        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
