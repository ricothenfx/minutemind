import type { ExtractionResult } from "../../../shared/schema.js";

/**
 * Pre-baked extraction result for MOCK_MODE, keyed to the "Client kickoff"
 * sample. Quotes are verbatim spans from that transcript.
 */
export const KICKOFF_RESULT: ExtractionResult = {
  summary: [
    "Juniper Foods rebrand site kickoff: a headless Next.js + CMS platform is decided, with launch locked to November 12th, ahead of the hard November 15th holiday-campaign date.",
    "Scope grows by three landing pages via an SOW amendment, while the store locator stays in base scope; content freezes November 1st or the date moves.",
    "Success means thirty percent more recipe traffic and a distributor-facing trade portal that no longer embarrasses the sales team.",
  ],
  decisions: [
    {
      decision: "The platform will be headless — a Next.js front end with the CMS behind it.",
      owner: "Grace",
      quote: "Then let's decide it today, I hate these decisions hanging. We go headless.",
    },
    {
      decision: "Content freezes on November 1st; edits after that push QA and the launch date.",
      owner: "Grace",
      quote: "Content freeze November 1st, agreed.",
    },
    {
      decision:
        "Three additional landing pages (bundles, gift sets) are added via an SOW amendment; the store locator stays in base scope.",
      owner: "Nora",
      quote: "Decided then: three additional landing pages via amendment, store locator stays in base scope.",
    },
    {
      decision: "The site commits to WCAG 2.2 AA accessibility, tested with real screen readers.",
      owner: "Felix",
      quote: "WCAG 2.2 AA across the new site, tested with real screen readers, not just automated scans.",
    },
    {
      decision: "Launch is set for November 12th, with three days of buffer before the November 15th campaign.",
      owner: "Nora",
      quote: "QA the first two weeks of November, launch on the 12th, three days of buffer before the campaign.",
    },
  ],
  action_items: [
    {
      task: "Write a one-pager for Grace's CEO presentation",
      owner: "Nora",
      due: "Tomorrow morning",
      priority: "high",
      quote: "One-pager by tomorrow morning, I'll write it personally.",
    },
    {
      task: "Send the SOW amendment for the three additional landing pages (with the one-pager)",
      owner: "Nora",
      due: "Tomorrow morning",
      priority: "high",
      quote: "I'll have it to you with the one-pager. Decided then: three additional landing pages via amendment",
    },
    {
      task: "Review and sign the SOW amendment if it comes in under five figures",
      owner: "Grace",
      due: null,
      priority: "medium",
      quote: "Send me the amendment. If it's under five figures I can sign it without another procurement cycle.",
    },
    {
      task: "Announce the November 1st content freeze to the Juniper Foods content team",
      owner: "Grace",
      due: "This week",
      priority: "high",
      quote: "I'll tell the team this week.",
    },
    {
      task: "Intro Felix to Ravi in IT for analytics access, hosting account, and the staging subdomain",
      owner: "Grace",
      due: "Today",
      priority: "high",
      quote: "I'll intro you to Ravi in IT today.",
    },
    {
      task: "Decide who writes the landing-page copy (client team, agency, or hybrid)",
      owner: null,
      due: "Design sign-off (October 10th)",
      priority: "medium",
      quote: "we need an answer by the design sign-off, because copy shapes layout.",
    },
    {
      task: "Send the kickoff recap email with decisions, dates, documents, and the access list",
      owner: "Nora",
      due: "Today",
      priority: null,
      quote: "Recap email today: decisions, dates, the two documents, and the access list.",
    },
  ],
  open_questions: [
    {
      question: "Who writes the new landing-page copy, given the client's copywriter left in June?",
      quote: "who writes the new landing page copy? Our copywriter left in June and we haven't replaced her.",
    },
    {
      question: "Will the SOW amendment for the three extra landing pages land under five figures?",
      quote: "Send me the amendment. If it's under five figures I can sign it without another procurement cycle.",
    },
  ],
  follow_up_email: {
    subject: "Juniper Foods kickoff — decisions, timeline, and what we need from you",
    body: `Hi Grace and Priyanka,

Thanks for a productive kickoff. Recap:

Decisions
- Headless platform: Next.js front end, CMS behind it.
- Content freeze November 1st; launch on November 12th, ahead of the November 15th campaign.
- Bundles and gift-set landing pages added via SOW amendment; store locator stays in base scope.
- WCAG 2.2 AA accessibility, tested with real screen readers.

Timeline
- Design concepts October 3rd, sign-off October 10th, build through late October, QA early November, launch the 12th.

Action items
- Nora — one-pager and SOW amendment to you by tomorrow morning.
- Grace — announce the content freeze to your team this week; intro Felix to Ravi in IT today.
- Juniper + agency — decide landing-page copy ownership by the design sign-off (October 10th).

Weekly check-ins: Thursdays, same time, starting this week.

Best,
Nora`,
  },
};
