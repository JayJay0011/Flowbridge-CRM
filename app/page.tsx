import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  KanbanSquare,
  Layers3,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { occupationTemplates, setupModes } from "@/data/templates";
import { previewPipeline } from "@/lib/pipeline";

const metrics = [
  { label: "New leads", value: "28", note: "+14% this week" },
  { label: "Follow-ups due", value: "9", note: "4 high priority" },
  { label: "Open pipeline", value: "$84k", note: "Across 17 opportunities" },
];

const checklist = [
  "Choose occupation",
  "Review prepared template",
  "Select setup mode",
  "Add first lead",
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
          <a href="#templates">Templates</a>
          <a href="#product">Product</a>
          <a href="#setup">Setup service</a>
          <a className="nav-action" href="#waitlist">
            Join waitlist
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <h1>FlowBridge CRM adapts to the way your business sells.</h1>
          <p>
            Choose your business type and start with the right pipeline, fields,
            follow-ups, and dashboard already in place.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#waitlist">
              Join early access <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#setup">
              View setup service
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

        <div className="product-preview" id="product" aria-label="CRM preview">
          <div className="app-sidebar">
            <div className="sidebar-logo">
              <Image src="/icon.png" alt="" width={30} height={30} priority />
            </div>
            <span className="sidebar-item active">Dashboard</span>
            <span className="sidebar-item">Pipeline</span>
            <span className="sidebar-item">Contacts</span>
            <span className="sidebar-item">Tasks</span>
            <span className="sidebar-item">Setup</span>
          </div>
          <div className="app-content">
            <div className="app-topbar">
              <div>
                <span className="app-label">MedSpa / Clinic workspace</span>
                <h2>Business pipeline</h2>
              </div>
              <button className="small-button">New opportunity</button>
            </div>

            <div className="metric-grid">
              {metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.note}</small>
                </div>
              ))}
            </div>

            <div className="preview-body">
              <div className="pipeline-board">
                {previewPipeline.map((column) => (
                  <section className="pipeline-column" key={column.id}>
                    <header>
                      <span>{column.title}</span>
                      <small>{column.cards.length}</small>
                    </header>
                    {column.cards.map((card) => (
                      <article className="deal-card" key={card.id}>
                        <strong>{card.title}</strong>
                        <span>{card.contact}</span>
                        <div>
                          <small>{card.value}</small>
                          <small>{card.due}</small>
                        </div>
                      </article>
                    ))}
                  </section>
                ))}
              </div>

              <aside className="setup-panel" id="setup">
                <span className="app-label">Setup assistant</span>
                <h3>Your CRM foundation</h3>
                <ul>
                  {checklist.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} /> {item}
                    </li>
                  ))}
                </ul>
                <div className="setup-choice">
                  <Clock3 size={18} />
                  <span>FlowBridge setup request available during onboarding</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section" id="templates">
        <div className="section-heading">
          <span className="section-kicker">Adaptive setup examples</span>
          <h2>Start with a CRM shape that matches how your business works.</h2>
          <p>
            FlowBridge CRM is being designed for lead-heavy service businesses.
            These examples show the kind of guided setup the product will
            support without forcing every business into the same blank CRM.
          </p>
        </div>
        <div className="template-grid">
          {occupationTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <article className="template-card" key={template.id}>
                <div className="template-icon">
                  <Icon size={22} />
                </div>
                <h3>{template.name}</h3>
                <p>{template.summary}</p>
                <div className="template-details">
                  <span>
                    <Layers3 size={15} /> {template.pipeline.slice(0, 3).join(", ")}
                  </span>
                  <span>
                    <Mail size={15} /> {template.reminders[0]}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="setup-section">
        <div className="section-heading align-left">
          <span className="section-kicker">Native setup path</span>
          <h2>Self-serve when ready, FlowBridge-assisted when needed.</h2>
        </div>
        <div className="setup-mode-grid">
          {setupModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <article className="setup-mode" key={mode.title}>
                <Icon size={24} />
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="waitlist" id="waitlist">
        <div>
          <h2>Join early access for FlowBridge CRM.</h2>
          <p>
            Tell us what kind of business you run and how you currently manage
            leads, follow-ups, and client work. We will use that signal to shape
            private beta access and setup support.
          </p>
        </div>
        <WaitlistForm />
      </section>
    </main>
  );
}
