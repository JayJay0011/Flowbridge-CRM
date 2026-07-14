import { ArrowRight, Bell, KanbanSquare, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";

const waitlistSignals = [
  {
    title: "Occupation-ready setup",
    description:
      "FlowBridge CRM is being shaped around real sales workflows, not a blank generic CRM screen.",
  },
  {
    title: "Pipeline-first workspace",
    description:
      "The first product build is focused on leads, opportunities, follow-ups, tasks, and setup clarity.",
  },
  {
    title: "Optional setup help",
    description:
      "Early users will be able to request FlowBridge Digital setup support during onboarding.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="nav">
        <a className="brand" href="#">
          <span className="brand-mark">
            <Image src="/icon.png" alt="" width={28} height={28} priority />
          </span>
          <span>FlowBridge CRM</span>
        </a>
        <div className="nav-links" aria-label="Main navigation">
          <a href="#direction">Direction</a>
          <a href="#setup">Setup service</a>
          <a className="nav-action" href="#waitlist">
            Join waitlist
          </a>
        </div>
      </nav>

      <section className="hero waitlist-hero">
        <div className="hero-copy">
          <span className="section-kicker">Private beta waitlist</span>
          <h1>FlowBridge CRM is being built for businesses that need a better sales system.</h1>
          <p>
            Join early access for an occupation-adaptive CRM from FlowBridge. We
            are shaping the first release around lead capture, pipelines,
            follow-ups, and guided setup.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#waitlist">
              Request early access <ArrowRight size={18} />
            </a>
          </div>
          <div className="trust-row" aria-label="Product principles">
            <span>
              <ShieldCheck size={16} /> Occupation-ready
            </span>
            <span>
              <KanbanSquare size={16} /> Pipeline-first
            </span>
            <span>
              <Bell size={16} /> Follow-up focused
            </span>
          </div>
        </div>

        <div className="waitlist-card" id="waitlist">
          <span className="section-kicker">Early access</span>
          <h2>Request access</h2>
          <p>
            Tell us what kind of business you run and what you use today. We
            will use that signal to prioritize private beta invites and setup
            support.
          </p>
          <WaitlistForm />
        </div>
      </section>

      <section className="template-section" id="direction">
        <div className="section-heading">
          <span className="section-kicker">Product direction</span>
          <h2>The public page is the waitlist. The CRM app stays private while we build.</h2>
          <p>
            FlowBridge CRM will launch as a serious SaaS product, not as a
            public construction site. Early visitors only see the waitlist and
            product direction. The app routes stay separate until the product is
            ready for beta users.
          </p>
        </div>
        <div className="template-grid">
          {waitlistSignals.map((signal) => (
            <article className="template-card" key={signal.title}>
              <div className="template-icon">
                <Sparkles size={22} />
              </div>
              <h3>{signal.title}</h3>
              <p>{signal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="setup-section" id="setup">
        <div className="section-heading align-left">
          <span className="section-kicker">Native setup path</span>
          <h2>Self-serve CRM setup, with FlowBridge support when needed.</h2>
          <p>
            The optional setup service will live inside product onboarding for
            invited users. Public visitors should not need to enter the app just
            to understand the offer.
          </p>
        </div>
        <div className="setup-mode-grid">
          <article className="setup-mode">
            <KanbanSquare size={24} />
            <h3>Build it yourself</h3>
            <p>
              Start from a prepared CRM foundation and customize your pipeline,
              fields, and follow-up workflow.
            </p>
          </article>
          <article className="setup-mode">
            <Sparkles size={24} />
            <h3>Request FlowBridge setup</h3>
            <p>
              Ask FlowBridge Digital to help configure the workspace, imports,
              and starting workflow once you are invited.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
