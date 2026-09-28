import type { ExtractionResult } from "../../../shared/schema.js";

/**
 * Pre-baked extraction result for MOCK_MODE, keyed to the "Design review"
 * sample. Quotes are verbatim spans from that transcript.
 */
export const DESIGN_REVIEW_RESULT: ExtractionResult = {
  summary: [
    "The checkout flow shrinks to two steps — collecting on step one, a full editable order review on step two — based on research that three steps felt like paperwork.",
    "The promo-code field moves behind a 'Have a code?' link with redemption tracked as a launch metric and a revert on the table; the pay button shows the exact amount.",
    "Address autocomplete ships with a visible manual-entry option after research found rural users missing a buried link; no pre-checked boxes anywhere.",
  ],
  decisions: [
    {
      decision: "The checkout is two steps: step one collects, step two is the editable order review with the pay button.",
      owner: "Ines",
      quote: "Two. I merged shipping and payment after the last round.",
    },
    {
      decision:
        "The promo-code field stays behind the 'Have a code?' link, redemption is a launch metric, and reverting is on the table.",
      owner: "Ines",
      quote: "promo field stays behind the link, redemption is a launch metric, revert is on the table.",
    },
    {
      decision: "The manual address-entry link moves up next to the search field so it is discoverable.",
      owner: "Ines",
      quote: "the manual link moves up next to the search field instead of hiding at the bottom.",
    },
    {
      decision:
        'The pay button shows the exact amount ("Pay $84.32"), with the amount in the accessible name for screen readers.',
      owner: "Ines",
      quote: 'I prototyped "Pay $84.32" — showing the amount on the button.',
    },
    {
      decision: "No pre-checked marketing boxes anywhere in checkout.",
      owner: "Ines",
      quote: "no pre-checked boxes, ever.",
    },
  ],
  action_items: [
    {
      task: "Run five moderated usability tests on the clickable prototype, two participants mobile-only",
      owner: "Caleb",
      due: "Thursday",
      priority: "high",
      quote:
        "I'll run five moderated tests on the clickable prototype Thursday, and I want two participants on mobile-only",
    },
    {
      task: "Start the integration spike for the address service",
      owner: "Ruth",
      due: "Tomorrow",
      priority: "high",
      quote: "I'll start the integration spike tomorrow.",
    },
    {
      task: "Handle debounce and caching for the rate-limited address-provider API",
      owner: "Ruth",
      due: null,
      priority: "medium",
      quote: "the provider's API rate-limits, so we debounce and cache — fine, I'll handle it.",
    },
    {
      task: "Redesign the empty-cart state (replacing the old-system version)",
      owner: "Ines",
      due: "This week",
      priority: "medium",
      quote: "Cart state — Ines, this week if you can.",
    },
    {
      task: 'Uncheck the pre-checked "email me receipts" box in the mock',
      owner: "Ines",
      due: null,
      priority: "low",
      quote: "It's leftover from the old component. Unchecking it.",
    },
  ],
  open_questions: [
    {
      question:
        "When the address provider is down, should checkout fall back to the full manual form automatically, or show an error and a retry?",
      quote:
        "when the address provider is down, do we fall back to the full manual form automatically, or show an error and a retry?",
    },
    {
      question: "Will promo-code redemption dip now that the field is behind a link — and if so, does the field come back?",
      quote: "I want the redemption number watched after launch. If it dips, the field comes back",
    },
  ],
  follow_up_email: {
    subject: "Checkout design review — two-step flow decided, launch metrics set",
    body: `Hi team,

Round two of the checkout design review is locked. Recap:

Decisions
- Two steps: collect on step one, full editable order review on step two.
- Promo-code field behind the "Have a code?" link; redemption is a launch metric with a revert on the table.
- Address autocomplete with the manual-entry link moved up next to the search field.
- Pay button shows the exact amount, in the accessible name too ("Pay $84.32").
- No pre-checked boxes, ever.

Action items
- Caleb — five moderated tests on the prototype Thursday, two mobile-only.
- Ruth — address-service integration spike starts tomorrow; debounce + caching on her plate.
- Ines — empty-cart state redesign this week; pre-checked box removed from the mock.

Open questions
- Address-provider outage: automatic fallback to the manual form, or error + retry? Ruth and Ines sync Thursday.
- Watch promo redemption post-launch.

Engineering estimate for the rebuild: three weeks, honestly rather than optimistically.

Best,
Ines`,
  },
};
