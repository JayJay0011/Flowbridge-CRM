# FlowBridge CRM Build Checklist

This document is the implementation tracker for FlowBridge CRM. Keep it updated before and after each build phase.

## Product Rules

- [x] Position as an occupation-adaptive CRM, not a generic CRM clone.
- [x] Launch occupations limited to MedSpa/Clinic, Real Estate, and Home Services.
- [x] MedSpa/Clinic language stays focused on leads, consultations, appointments, follow-ups, and business pipeline management.
- [x] FlowBridge setup service is a native onboarding path.
- [x] Keep MVP strict: CRM foundation before automation, AI, SMS, or advanced reporting.
- [x] During build, Vercel root can show CRM review build while `/waitlist` keeps the waitlist available.

## Phase 1: Product Foundation

- [x] Create repository project scaffold.
- [x] Add project tracking checklist.
- [x] Add initial product blueprint/specification.
- [x] Add FlowBridge Digital brand icon as product favicon and app mark.
- [x] Build first waitlist/product preview page.
- [x] Move waitlist page to `/waitlist` for future domain routing.
- [x] Broaden public waitlist form so it does not expose only the three internal launch occupations.
- [x] Add temporary request-access confirmation state.
- [x] Add Supabase waitlist migration.
- [x] Add waitlist API route.
- [x] Wire waitlist form to backend API.
- [x] Verify initial page in browser.
- [x] Push initial scaffold to GitHub.

## Phase 2: App Shell And Onboarding

- [x] Add Supabase project configuration.
- [x] Implement auth pages.
- [x] Implement workspace creation.
- [x] Implement occupation selection.
- [x] Implement template preview.
- [x] Implement setup mode selection: self-setup or FlowBridge setup.
- [x] Store setup requests.
- [x] Store waitlist submissions.
- [x] Add optional waitlist confirmation email through Resend.
- [x] Add CRM review dashboard shell at Vercel root.
- [ ] Configure Supabase environment variables in Vercel.
- [ ] Configure Resend environment variables in Vercel.

## Phase 3: CRM Core

- [ ] Contacts.
- [ ] Companies/clients.
- [ ] Deals/jobs/opportunities.
- [ ] Kanban pipeline.
- [ ] Drag and drop stage movement.
- [ ] Notes.
- [ ] Tasks.
- [ ] Reminders.
- [ ] Files.

## Phase 4: Templates

- [ ] Template versioning model.
- [ ] MedSpa/Clinic template.
- [ ] Real Estate template.
- [ ] Home Services template.
- [ ] Workspace template application logic.
- [ ] Template reapply/reset rules.

## Phase 5: Dashboard And Notifications

- [ ] Dashboard metric cards.
- [ ] Follow-ups due today.
- [ ] Overdue task logic.
- [ ] Pipeline value.
- [ ] Resend reminder emails.

## Later, Not MVP

- [ ] Stripe subscriptions.
- [ ] AI support assistant.
- [ ] SMS.
- [ ] Calendar sync.
- [ ] Advanced workflow automation.
- [ ] Client portals.
- [ ] Native mobile app.

## Current Status

Current build target: use the Vercel root for CRM build review, keep `/waitlist` ready for the future public domain, and continue Phase 3 CRM core.
