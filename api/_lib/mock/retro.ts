import type { ExtractionResult } from "../../../shared/schema.js";

/**
 * Pre-baked extraction result for MOCK_MODE, keyed to the "Sprint retro"
 * sample. Quotes are verbatim spans from that transcript.
 */
export const RETRO_RESULT: ExtractionResult = {
  summary: [
    "The new deploy pipeline is a clear win — deploys dropped from forty to eleven minutes — but review latency and flaky CI tests are now the bottlenecks.",
    "Flaky tests get quarantined after two failures with a named two-week fix owner, and a reviewer rotation with same-day turnaround for small PRs is adopted.",
    "A WIP limit of two per person is adopted, standup is cut to ten minutes, and the weekly-versus-biweekly retro question is tabled to next time.",
  ],
  decisions: [
    {
      decision:
        "Flaky tests get quarantined after two failures, with a named owner and a two-week fix window, reported at sprint review.",
      owner: "Lena",
      quote:
        "flaky tests get quarantined after two failures, with a named owner and a two-week fix window, reported at sprint review",
    },
    {
      decision: "A daily reviewer rotation is adopted, with same-day reviews for PRs under four hundred lines.",
      owner: "Lena",
      quote: "Decision two: reviewer rotation, two names per day, same-day for small PRs.",
    },
    {
      decision: "A work-in-progress limit of two items per person is adopted, to be tuned at the next retro.",
      owner: "Lena",
      quote: "WIP limit of two, we tune it at the next retro.",
    },
    {
      decision: "Standup is shortened to ten minutes; longer discussions move to a follow-up huddle.",
      owner: "Lena",
      quote: "Decision three: standup is ten minutes, discussions get parked to a huddle.",
    },
  ],
  action_items: [
    {
      task: "Investigate the false-positive 3 a.m. pager alert and decide whether to fix or delete it",
      owner: "Marcus",
      due: "Friday",
      priority: "high",
      quote:
        "Marcus investigates the false-positive alert before handoff on Friday, and we decide whether to fix or delete it.",
    },
    {
      task: "Set up automatic test quarantine with a named un-flaking owner and a two-week fix window",
      owner: "Marcus",
      due: null,
      priority: "high",
      quote:
        "If a test flakes twice in a sprint it gets quarantined automatically and someone owns un-flaking it within two weeks.",
    },
    {
      task: "Report the quarantined-test count in the sprint review so it stays visible",
      owner: "Aiko",
      due: null,
      priority: "medium",
      quote: "quarantined count gets reported in the sprint review so it can't rot in a corner.",
    },
    {
      task: "Set up the daily reviewer rotation on the calendar",
      owner: "Sofia",
      due: null,
      priority: "medium",
      quote: "PRs under four hundred lines get looked at same-day.",
    },
    {
      task: "Bring data to the next retro to decide weekly versus biweekly retros",
      owner: "Sofia",
      due: "Next retro",
      priority: "low",
      quote: "Biweekly feels right, but can we decide that next retro with data instead of vibes?",
    },
  ],
  open_questions: [
    {
      question: "Was the false-positive alert that paged at 3 a.m. ever fixed, or will it page again next rotation?",
      quote: "Was that alert ever fixed, or is it going to wake Marcus up again next on-call rotation?",
    },
    {
      question: "Should the retro stay weekly or move to biweekly now that the pipeline is calm?",
      quote: "do we still need this weekly, or is biweekly retro enough now that the pipeline's calm?",
    },
  ],
  follow_up_email: {
    subject: "Retro recap: quarantine policy, reviewer rotation, WIP limit",
    body: `Hi team,

Thanks for an honest retro. Here's what we locked in:

Decisions
- Flaky tests are quarantined after two failures, with a named owner and a two-week fix window; the count is reported at sprint review.
- Reviewer rotation: two named reviewers per day, same-day turnaround for PRs under 400 lines.
- WIP limit of two per person, tuned at the next retro.
- Standup is ten minutes; discussions move to a follow-up huddle.

Action items
- Marcus — investigate the false-positive 3 a.m. alert before handoff on Friday; we fix or delete it.
- Marcus/Aiko — quarantine mechanism plus a visible quarantined-count report at sprint review.
- Sofia — put the reviewer rotation on the calendar; bring data next retro on weekly vs biweekly.

Open questions
- Is the 3 a.m. alert actually fixed, or will it fire again next rotation?
- Weekly or biweekly retros — decided with data next time.

Corrections welcome.

Best,
[Your name]`,
  },
};
