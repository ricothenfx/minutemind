import type { ExtractionResult } from "../../../shared/schema";

/**
 * Pre-baked extraction result for MOCK_MODE, keyed to the "Incident postmortem"
 * sample. Quotes are verbatim spans from that transcript.
 */
export const POSTMORTEM_RESULT: ExtractionResult = {
  summary: [
    "A config deploy with a seconds-versus-milliseconds unit bug rejected auth tokens for 43 customer-facing minutes; config changes skip CI validation and canary entirely.",
    "Config changes will now pass schema validation in CI, and config deploys get canary plus automatic rollback, closing the two systemic gaps behind the outage.",
    "Incident comms get a named owner with a ten-minute first-update SLA, the status page only goes green on monitor confirmation, and all affected plans receive a credit.",
  ],
  decisions: [
    {
      decision: "Config changes go through the same validation as code, enforced by a schema check in CI.",
      owner: "Rosa",
      quote: "config changes go through the same validation as code — schema check in CI, enforced",
    },
    {
      decision: "Canary plus automatic rollback is extended to config deploys, including the config-service cache.",
      owner: "Rosa",
      quote: "canary plus automatic rollback extended to config deploys.",
    },
    {
      decision:
        "A named comms owner handles status-page updates: first update within ten minutes of paging, then every fifteen minutes.",
      owner: "Rosa",
      quote:
        "the incident commander delegates a comms owner, first update within ten minutes of paging, updates every fifteen after.",
    },
    {
      decision: "The status page flips to green only when the error-rate monitor confirms recovery.",
      owner: "Rosa",
      quote: "Status flips to green only when the error-rate monitor confirms, not when a human feels optimistic.",
    },
    {
      decision: "All customers on affected plans receive a credit, rather than deciding ticket-by-ticket.",
      owner: "Rosa",
      quote: "Everyone on affected plans — deciding ticket-by-ticket is slower than just doing the right thing.",
    },
  ],
  action_items: [
    {
      task: "Add config schema validation to CI and standardize time units to seconds",
      owner: "Yusuf",
      due: "End of next sprint",
      priority: "high",
      quote:
        "Schema validation in CI by end of next sprint, and I'll add the unit-standardization — seconds everywhere, no more milliseconds ambiguity.",
    },
    {
      task: "Write the design doc for canary + auto-rollback on config deploys, including the cache TTL fix",
      owner: "Ken",
      due: "Friday",
      priority: "high",
      quote: "Design doc by Friday, implementation the sprint after.",
    },
    {
      task: "Circulate the postmortem doc draft and publish it to the incidents wiki",
      owner: "Ken",
      due: "Wednesday (draft), Friday (publish)",
      priority: "high",
      quote: "Doc draft to everyone by Wednesday, review Thursday, publish to the incidents wiki Friday.",
    },
    {
      task: "Write the plain-language support outage macro",
      owner: "Dana",
      due: "Wednesday",
      priority: "high",
      quote: "I'm writing the outage macro — plain-language, no scary password language",
    },
    {
      task: "Size the credits for everyone on affected plans and bring the number to Rosa",
      owner: "Dana",
      due: "Friday",
      priority: "medium",
      quote: "Dana sizes it and brings the number to me by Friday.",
    },
    {
      task: "Draft the customer email (apologetic, factual, mentions the credit)",
      owner: "Dana",
      due: "With Friday's release notes",
      priority: "medium",
      quote: "Dana drafts, I edit, it ships with Friday's release notes.",
    },
  ],
  open_questions: [
    {
      question: "Who owns retuning the 401 alerts, and should the alert split into login-noise versus token-validation?",
      quote: "who owns retuning the 401 alerts, and do we split the alert into login-noise versus token-validation?",
    },
    {
      question: "Is single on-call sustainable at this team size, or is a secondary on-call needed?",
      quote: "is single on-call sustainable at our size, or does Tuesday argue for a secondary?",
    },
    {
      question: "What are the normal login-noise rates needed to retune the alert threshold?",
      quote: "retuning needs data on normal login-noise rates, which I don't have.",
    },
  ],
  follow_up_email: {
    subject: "Postmortem: Tuesday's auth outage — fixes, credits, and remaining questions",
    body: `Hi team,

Thanks for a blameless, productive session on Tuesday's outage.

What happened
- A config deploy with a unit bug (seconds vs milliseconds) made the auth service reject tokens for 43 minutes. Config skips CI validation and canary, so it reached 100% of traffic instantly.

Decisions
- Config changes pass schema validation in CI; time units standardize to seconds.
- Canary + automatic rollback extended to config deploys (including the cache TTL that delayed rollback).
- Status-page updates get a named comms owner: first update within 10 minutes of paging, then every 15.
- Status goes green only on monitor confirmation.
- Everyone on affected plans gets a credit.

Action items
- Yusuf — config schema validation in CI by end of next sprint.
- Ken — canary/rollback design doc by Friday; postmortem doc Wednesday, wiki Friday.
- Dana — outage macro Wednesday; credit sizing Friday; customer email with Friday's release notes.

Open questions
- Who retunes the 401 alerts, and do we split login-noise from token-validation?
- Single on-call vs a secondary — numbers go in the postmortem doc.

Corrections welcome.

Best,
[Your name]`,
  },
};
