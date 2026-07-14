import {
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  KanbanSquare,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import { previewPipeline } from "@/lib/pipeline";

const dashboardMetrics = [
  { label: "Open pipeline", value: "$84k", note: "Across 17 opportunities" },
  { label: "Follow-ups due", value: "9", note: "4 high priority today" },
  { label: "New leads", value: "28", note: "+14% this week" },
  { label: "Setup progress", value: "62%", note: "Template review active" },
];

const setupSteps = [
  "Confirm occupation template",
  "Review prepared pipeline",
  "Add first contact",
  "Create first follow-up task",
];

const taskList = [
  { title: "Call Avery Stone", detail: "Consultation inquiry", due: "Today" },
  { title: "Prepare buyer next steps", detail: "Nina Patel", due: "Tomorrow" },
  { title: "Send quote follow-up", detail: "Morgan Lee", due: "Friday" },
];

export default function Home() {
  return (
    <main className="crm-review-shell">
      <aside className="crm-sidebar">
        <a className="crm-brand" href="/">
          <span className="brand-mark">
            <Image src="/icon.png" alt="" width={28} height={28} priority />
          </span>
          <span>FlowBridge CRM</span>
        </a>
        <nav className="crm-nav" aria-label="CRM navigation">
          <a className="active" href="/">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#pipeline">
            <KanbanSquare size={18} /> Pipeline
          </a>
          <a href="#contacts">
            <Users size={18} /> Contacts
          </a>
          <a href="#tasks">
            <CalendarClock size={18} /> Tasks
          </a>
          <a href="/onboarding">
            <Settings size={18} /> Setup
          </a>
        </nav>
        <div className="crm-sidebar-note">
          <span>Review mode</span>
          <p>Vercel root is showing the CRM build. Waitlist remains available at `/waitlist`.</p>
        </div>
      </aside>

      <section className="crm-main">
        <header className="crm-header">
          <div>
            <span className="section-kicker">MedSpa / Clinic workspace</span>
            <h1>Business pipeline</h1>
          </div>
          <div className="crm-header-actions">
            <a className="secondary-button crm-link" href="/waitlist">
              Waitlist page
            </a>
            <button className="primary-button crm-button" type="button">
              <Plus size={18} /> New opportunity
            </button>
          </div>
        </header>

        <section className="crm-metric-grid" aria-label="Dashboard metrics">
          {dashboardMetrics.map((metric) => (
            <article className="crm-metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>

        <section className="crm-work-grid">
          <div className="crm-panel crm-pipeline-panel" id="pipeline">
            <div className="crm-panel-header">
              <div>
                <span className="section-kicker">Pipeline</span>
                <h2>Opportunities by stage</h2>
              </div>
              <button className="crm-filter-button" type="button">
                This week <ChevronDown size={16} />
              </button>
            </div>
            <div className="crm-kanban">
              {previewPipeline.map((column) => (
                <section className="crm-kanban-column" key={column.id}>
                  <header>
                    <span>{column.title}</span>
                    <small>{column.cards.length}</small>
                  </header>
                  {column.cards.map((card) => (
                    <article className="crm-deal-card" key={card.id}>
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
          </div>

          <aside className="crm-panel crm-right-rail">
            <section>
              <div className="crm-panel-header compact">
                <div>
                  <span className="section-kicker">Setup assistant</span>
                  <h2>Foundation</h2>
                </div>
              </div>
              <ul className="crm-checklist">
                {setupSteps.map((step) => (
                  <li key={step}>
                    <CheckCircle2 size={16} /> {step}
                  </li>
                ))}
              </ul>
            </section>

            <section id="tasks">
              <div className="crm-panel-header compact">
                <div>
                  <span className="section-kicker">Follow-ups</span>
                  <h2>Due next</h2>
                </div>
                <Bell size={18} />
              </div>
              <div className="crm-task-list">
                {taskList.map((task) => (
                  <article className="crm-task" key={task.title}>
                    <strong>{task.title}</strong>
                    <span>{task.detail}</span>
                    <small>{task.due}</small>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </section>
    </main>
  );
}
