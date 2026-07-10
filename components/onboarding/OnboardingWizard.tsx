"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { occupationTemplates, setupModes } from "@/data/templates";

export function OnboardingWizard() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState(occupationTemplates[0]?.id ?? "");
  const [selectedSetupMode, setSelectedSetupMode] = useState(setupModes[0]?.title ?? "");

  const selectedTemplate = useMemo(
    () => occupationTemplates.find((template) => template.id === selectedTemplateId),
    [selectedTemplateId],
  );

  return (
    <div className="onboarding-grid">
      <section className="onboarding-panel">
        <span className="section-kicker">Workspace setup</span>
        <h1>Shape your CRM before the blank screen appears.</h1>
        <p>
          Choose a business template, review what FlowBridge will prepare, then
          decide whether you want to configure it yourself or request setup help.
        </p>
        <label className="onboarding-field">
          <span>Workspace name</span>
          <input
            onChange={(event) => setWorkspaceName(event.target.value)}
            placeholder="Example: Brightline Aesthetics"
            value={workspaceName}
          />
        </label>
        <div className="onboarding-actions">
          <button type="button">
            Continue setup <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section className="onboarding-panel">
        <span className="section-kicker">Occupation template</span>
        <div className="template-picker">
          {occupationTemplates.map((template) => {
            const Icon = template.icon;
            const isSelected = template.id === selectedTemplateId;

            return (
              <button
                className={isSelected ? "template-option selected" : "template-option"}
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                type="button"
              >
                <Icon size={22} />
                <span>{template.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="onboarding-panel template-preview-panel">
        <span className="section-kicker">Template preview</span>
        <h2>{selectedTemplate?.name}</h2>
        <p>{selectedTemplate?.summary}</p>
        <div className="preview-lists">
          <div>
            <h3>Pipeline stages</h3>
            <ul>
              {selectedTemplate?.pipeline.map((stage) => (
                <li key={stage}>
                  <CheckCircle2 size={15} /> {stage}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Starter fields</h3>
            <ul>
              {selectedTemplate?.fields.map((field) => (
                <li key={field}>
                  <CheckCircle2 size={15} /> {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="onboarding-panel">
        <span className="section-kicker">Setup mode</span>
        <div className="setup-mode-picker">
          {setupModes.map((mode) => {
            const Icon = mode.icon;
            const isSelected = mode.title === selectedSetupMode;

            return (
              <button
                className={isSelected ? "setup-option selected" : "setup-option"}
                key={mode.title}
                onClick={() => setSelectedSetupMode(mode.title)}
                type="button"
              >
                <Icon size={22} />
                <span>{mode.title}</span>
                <small>{mode.description}</small>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
