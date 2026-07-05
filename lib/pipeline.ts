export type DealCard = {
  id: string;
  title: string;
  contact: string;
  value: string;
  due: string;
};

export type PipelineColumn = {
  id: string;
  title: string;
  cards: DealCard[];
};

export const previewPipeline: PipelineColumn[] = [
  {
    id: "new-lead",
    title: "New Lead",
    cards: [
      {
        id: "lead-1",
        title: "Consultation inquiry",
        contact: "Avery Stone",
        value: "$2,400",
        due: "Follow up today",
      },
      {
        id: "lead-2",
        title: "Kitchen remodel estimate",
        contact: "Morgan Lee",
        value: "$8,900",
        due: "Call in 2h",
      },
    ],
  },
  {
    id: "consult",
    title: "Consult / Estimate",
    cards: [
      {
        id: "consult-1",
        title: "Buyer consult",
        contact: "Nina Patel",
        value: "$640k",
        due: "Prepare next steps",
      },
    ],
  },
  {
    id: "proposal",
    title: "Plan / Quote Sent",
    cards: [
      {
        id: "proposal-1",
        title: "Treatment plan sent",
        contact: "Jordan Miles",
        value: "$1,850",
        due: "Due tomorrow",
      },
    ],
  },
  {
    id: "booked",
    title: "Booked / Approved",
    cards: [
      {
        id: "booked-1",
        title: "Approved service job",
        contact: "Taylor Brooks",
        value: "$4,200",
        due: "Schedule crew",
      },
    ],
  },
];
