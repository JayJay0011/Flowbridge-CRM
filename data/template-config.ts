export const occupationTemplateIds = ["medspa-clinic", "real-estate", "home-services"] as const;

export const setupModeTitles = ["Set it up myself", "Have FlowBridge set this up"] as const;

export type OccupationTemplateId = (typeof occupationTemplateIds)[number];
export type SetupModeTitle = (typeof setupModeTitles)[number];
