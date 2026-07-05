# FlowBridge CRM MVP Specification

## Positioning

FlowBridge CRM is an occupation-adaptive CRM for lead-heavy service businesses. It helps business owners start with a prepared pipeline, fields, dashboard, reminders, and setup path based on their occupation.

The product inherits FlowBridge Digital's systems-thinking, automation-focused, operational infrastructure positioning, but it should feel like a serious SaaS platform rather than an agency service page.

## Launch Occupations

1. MedSpa/Clinic
   - Scope: leads, consultations, appointments, follow-ups, rebooking, and business pipeline management.
   - Exclusions: EHR, diagnosis, medical charting, prescriptions, medical record storage, or clinical compliance positioning.

2. Real Estate
   - Scope: buyer leads, seller leads, showings, offers, under-contract follow-up, closings, and past-client retention.

3. Home Services
   - Scope: inbound leads, estimates, site visits, quote follow-up, scheduled jobs, completed jobs, and repeat service reminders.

## MVP Features

- Account authentication.
- Workspace creation.
- Occupation selection.
- Occupation template preview.
- Setup mode selection.
- Contacts.
- Companies or client organizations.
- Deals/jobs/opportunities.
- Kanban pipeline.
- Drag and drop stage changes.
- Notes.
- Tasks and reminders.
- File upload.
- Dashboard metric cards.
- FlowBridge setup service request.
- Basic email reminders.

## MVP Exclusions

- Stripe subscriptions.
- AI assistant.
- SMS.
- Calendar sync.
- Client portals.
- Complex automation builder.
- Advanced reporting builder.
- EHR or medical record features.

## Core User Flow

1. User creates account.
2. User creates workspace.
3. User selects occupation.
4. User previews template.
5. User selects setup mode:
   - Set it up myself.
   - Have FlowBridge set it up for me.
6. System creates workspace CRM from selected template.
7. User lands on dashboard and setup assistant.
8. User adds first contact, opportunity, and reminder.

## Setup Service Flow

The setup service is a native product path. It should appear during onboarding and remain available in the app.

Required fields:

- Business name.
- Occupation.
- Current tools.
- Current CRM, if any.
- Import needs.
- Pipeline needs.
- Team size.
- Preferred timeline.
- Notes.

Request statuses:

- Requested.
- Reviewing.
- In setup.
- Ready.
- Closed.

## Template System

Templates must be versioned and copied into each workspace when applied. Updating a master template must not overwrite a user's active workspace configuration.

Each template defines:

- Pipeline stages.
- Custom contact fields.
- Custom company/client fields.
- Custom deal/job fields.
- Task presets.
- Reminder presets.
- Dashboard cards.
- Setup checklist.

## Initial Data Model

- users
- workspaces
- workspace_members
- occupation_templates
- template_versions
- pipelines
- pipeline_stages
- contacts
- companies
- deals
- deal_stage_history
- custom_field_definitions
- custom_field_values
- notes
- tasks
- reminders
- files
- setup_requests
- activity_logs

All tenant-owned tables must include `workspace_id`. Supabase Row Level Security should be enabled before production use.

## Pricing Direction

Beta:

- Beta Solo: $49/month, up to 2 users.
- Beta Team: $99/month, up to 5 users.
- Beta Pro: $199/month, up to 12 users.

Post-beta:

- Starter: $79/month, up to 2 users.
- Growth: $149/month, up to 6 users.
- Scale: $299/month, up to 15 users.
- Extra users: $20/user/month.

Setup services:

- Setup Lite: $499.
- Setup Standard: $1,500.
- Setup Premium: $3,000+.
