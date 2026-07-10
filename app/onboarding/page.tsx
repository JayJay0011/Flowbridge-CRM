import Link from "next/link";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <main className="app-setup-shell">
      <header className="app-setup-header">
        <Link className="auth-brand" href="/">
          FlowBridge CRM
        </Link>
        <Link className="secondary-button app-setup-link" href="/">
          Back to site
        </Link>
      </header>
      <OnboardingWizard />
    </main>
  );
}
