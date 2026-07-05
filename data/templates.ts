import {
  Building2,
  ClipboardCheck,
  Home,
  type LucideIcon,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export type OccupationTemplate = {
  id: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  pipeline: string[];
  fields: string[];
  reminders: string[];
  metric: string;
};

export const occupationTemplates: OccupationTemplate[] = [
  {
    id: "medspa-clinic",
    name: "MedSpa / Clinic",
    icon: Stethoscope,
    summary:
      "Track leads, consultations, appointments, treatment interest, follow-ups, and rebooking without becoming an EHR.",
    pipeline: [
      "New Lead",
      "Consult Booked",
      "Consult Complete",
      "Plan Sent",
      "Booked",
      "Follow-Up",
    ],
    fields: ["Treatment interest", "Lead source", "Consult date"],
    reminders: ["Confirm consultation", "Follow up after consult"],
    metric: "Consults due this week",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    summary:
      "Organize buyer and seller leads from first inquiry through showings, offers, closing, and past-client follow-up.",
    pipeline: [
      "New Lead",
      "Qualified",
      "Showing",
      "Offer",
      "Under Contract",
      "Closed",
    ],
    fields: ["Lead type", "Budget range", "Target area"],
    reminders: ["Speed-to-lead follow-up", "Past client check-in"],
    metric: "Active buyer/seller opportunities",
  },
  {
    id: "home-services",
    name: "Home Services",
    icon: Building2,
    summary:
      "Manage estimate requests, site visits, quotes, scheduled work, completed jobs, and repeat service reminders.",
    pipeline: [
      "New Request",
      "Estimate Scheduled",
      "Quote Sent",
      "Approved",
      "Scheduled",
      "Completed",
    ],
    fields: ["Service type", "Property address", "Estimate date"],
    reminders: ["Quote follow-up", "Post-job review request"],
    metric: "Quotes waiting for response",
  },
];

export const setupModes = [
  {
    title: "Set it up myself",
    icon: ClipboardCheck,
    description:
      "Start with the prepared FlowBridge template and customize your pipeline as you go.",
  },
  {
    title: "Have FlowBridge set this up",
    icon: Sparkles,
    description:
      "Send your setup request to FlowBridge Digital for structure, imports, and workflow configuration.",
  },
];
