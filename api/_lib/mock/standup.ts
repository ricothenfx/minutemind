import type { ExtractionResult } from "../../../shared/schema";

/**
 * Pre-baked extraction result for MOCK_MODE, keyed to the "Product standup"
 * sample. Quotes are verbatim spans from the sample transcript, so the demo
 * shows real grounded output without any API key.
 */
export const STANDUP_RESULT: ExtractionResult = {
  summary: [
    "Public launch moves from October 1st to October 14th; beta still starts on the 15th.",
    "Usage-based pricing ships in v1 pending legal sign-off, with existing customers grandfathered for six months; CSV export is cut from v1 and parked on the public roadmap.",
    "The migration race condition that can double-charge customers is the critical path — Priya owns the fix by Friday EOD.",
  ],
  decisions: [
    {
      decision:
        "The public launch moves from October 1st to October 14th so the billing cutover avoids conference week.",
      owner: "Daniel",
      quote:
        "we are moving the public launch from October 1st to October 14th. The billing cutover cannot land the same week as the conference booth.",
    },
    {
      decision:
        "Usage-based pricing ships in v1, pending legal sign-off, with existing customers grandfathered for six months.",
      owner: "Maya",
      quote:
        "usage-based pricing ships in v1, pending legal sign-off, and existing customers stay grandfathered on legacy pricing for six months",
    },
    {
      decision: "CSV export is out of v1 and moves to the public roadmap.",
      owner: "Maya",
      quote:
        'CSV export is out of v1. We put it on the public roadmap and stop pretending it ships "next sprint."',
    },
    {
      decision: "Beta starts on October 15th as agreed last week.",
      owner: null,
      quote: "beta still kicks off the 15th, like we agreed last week?",
    },
  ],
  action_items: [
    {
      task: "Fix the migration race condition and re-run the full dry-run against the staging snapshot",
      owner: "Priya",
      due: "Friday EOD",
      priority: "high",
      quote: "Priya, can you own that? Fix the race condition and re-run the dry-run, done by Friday?",
    },
    {
      task: "Design the empty states for the new invoice screen",
      owner: "Tomás",
      due: "Tuesday EOD",
      priority: "medium",
      quote: "Keep it with you, Tomás — empty states for the invoice screen by Tuesday EOD.",
    },
    {
      task: "Get legal sign-off on the usage-based pricing copy",
      owner: null,
      due: null,
      priority: "high",
      quote:
        'legal still hasn\'t blessed the usage-based pricing copy. It\'s been "in review" for two weeks and nobody is chasing it.',
    },
    {
      task: "Poke the platform team about the rate-limit questions and confirm the 60-second polling interval",
      owner: "Daniel",
      due: null,
      priority: null,
      quote:
        "I'll poke the platform team about the rate-limit questions legal attached — that unblocks half of it.",
    },
    {
      task: "Email beta contacts about CSV export moving to the public roadmap",
      owner: "Elena",
      due: null,
      priority: null,
      quote: "Fine. I'll email my beta contacts with the roadmap link. No date promised.",
    },
    {
      task: "Draft the launch announcement and run it past comms",
      owner: "Maya",
      due: "Before the 14th",
      priority: "medium",
      quote:
        "Let's say whoever gets to it first — realistically me. I'll draft it and run it past comms before the 14th.",
    },
    {
      task: "Refresh the billing docs for the new plans (owner to be assigned Monday)",
      owner: null,
      due: null,
      priority: "low",
      quote: "And, uh, docs. Someone should refresh the billing docs for the new plans.",
    },
    {
      task: "Add a screenshot to the CSV-export roadmap entry",
      owner: "Tomás",
      due: null,
      priority: "low",
      quote: "The roadmap entry needs a screenshot or nobody clicks it.",
    },
  ],
  open_questions: [
    {
      question:
        "After the cutover, do grandfathered customers keep the old invoice layout or get forced onto the new one?",
      quote:
        "do grandfathered customers keep the old invoice layout, or do they get forced onto the new one? Nobody has actually answered that.",
    },
    {
      question: "Is the usage meter actually polling every 60 seconds?",
      quote:
        "is it actually every 60 seconds, or is that a misunderstanding? Because if it's really 60 seconds, API costs spike for the big tenants.",
    },
  ],
  follow_up_email: {
    subject: "Recap: billing revamp — launch date, decisions, and next steps",
    body: `Hi team,

Thanks for a focused session. Quick recap so nobody has to replay the recording:

Decisions
- Public launch moves to October 14th (beta still starts the 15th).
- Usage-based pricing ships in v1, pending legal sign-off; existing customers stay grandfathered for six months.
- CSV export is out of v1 and goes on the public roadmap.

Action items
- Priya — fix the migration race condition and re-run the dry-run by Friday EOD.
- Tomás — invoice-screen empty states by Tuesday EOD, plus a screenshot for the roadmap entry.
- Maya — launch announcement draft to comms before the 14th.
- Elena — email beta contacts about CSV export (no dates promised).
- Daniel — chase the platform team on the rate-limit questions, including the 60-second polling check.
- Unassigned — legal sign-off on the pricing copy, and the billing docs refresh (docs owner assigned Monday).

Open questions
- Do grandfathered customers keep the old invoice layout after the cutover?
- Is the usage meter really polling every 60 seconds?

Corrections welcome — otherwise see you next week.

Best,
[Your name]`,
  },
};
