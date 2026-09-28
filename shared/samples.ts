/**
 * The five example transcripts offered by the sample picker in the input view.
 * Kept in shared/ so both the browser client (picker) and the API mock layer
 * (pre-baked grounded results) can key off the exact same text.
 * Filler words, crosstalk and small talk included on purpose.
 */

export interface SampleTranscript {
  id: string;
  label: string;
  transcript: string;
}

export const SAMPLES: readonly SampleTranscript[] = [
  {
    id: "standup",
    label: "Product standup",
    transcript: `[09:02] Maya: Alright, good morning everyone. Uh, let's get started while the coffee kicks in. Priya, joining us?
[09:02] Priya: Yeah yeah, one sec — headphones. Okay, I'm here.
[09:03] Maya: Perfect. Before we dive in — Daniel, I saw the marathon photos. Forty-two kilometers of what, exactly?
[09:03] Daniel: [laughs] Of poor life choices, mostly. Never again. Ask me again in spring.
[09:03] Maya: Amazing. Okay, agenda: billing revamp status, the launch date, beta feedback, and whatever else explodes. Go.
[09:04] Priya: So, uh, the migration dry-run. It works, mostly. There's a race condition when a customer downgrades mid-import — accounts can end up double-charged. It's edge-casey, but it's money, so it's not shippable as-is.
[09:04] Daniel: How bad is the fix, realistically?
[09:05] Priya: Honest answer? Two, maybe three days. And I'd want a full dry-run re-run against the staging snapshot afterwards.
[09:05] Maya: Okay. Priya, can you own that? Fix the race condition and re-run the dry-run, done by Friday?
[09:05] Priya: Yes. Friday EOD. If staging throws anything weird I'll flag it in the billing channel.
[09:06] Tomás: Quick one while we're on money stuff — I pushed the new invoice screen Thursday night. The usage meter reads a hundred times better, but the empty states are, uh, a crime scene. Someone needs to design those before beta people see them.
[09:07] Maya: Noted. Keep it with you, Tomás — empty states for the invoice screen by Tuesday EOD. And beta still kicks off the 15th, like we agreed last week?
[09:07] Tomás: Tuesday works. And yep, the 15th.
[09:08] Daniel: Before anything else — I want to make the launch call official so it stops floating around: we are moving the public launch from October 1st to October 14th. The billing cutover cannot land the same week as the conference booth. It just can't.
[09:08] Maya: Agreed. For the record, that's the second slip, so we hold the line on the 14th. Elena, can sales live with that?
[09:09] Elena: We'll live with it if the pricing page stops wobbling. Which, speaking of — legal still hasn't blessed the usage-based pricing copy. It's been "in review" for two weeks and nobody is chasing it.
[09:09] Daniel: I'll poke the platform team about the rate-limit questions legal attached — that unblocks half of it. No promises on their timeline, though. You know how that queue is.
[09:10] Maya: Okay, let me play it back: usage-based pricing ships in v1, pending legal sign-off, and existing customers stay grandfathered on legacy pricing for six months. Everyone good? Nods? Treating it as decided.
[09:11] Elena: One more from my side — beta customers keep asking for CSV export of invoices. Support is drowning in those tickets.
[09:11] Priya: It's like two days of code, but it drags a week of QA behind it.
[09:11] Maya: Then here's the call: CSV export is out of v1. We put it on the public roadmap and stop pretending it ships "next sprint." Elena, tell the beta folks directly — honestly, no fake dates.
[09:12] Elena: Fine. I'll email my beta contacts with the roadmap link. No date promised.
[09:12] Tomás: [crosstalk] Sorry, one thing before we move on —
[09:12] Elena: No no, go ahead.
[09:13] Tomás: The roadmap entry needs a screenshot or nobody clicks it. I'll add one while I'm in the empty states.
[09:13] Priya: Open question from me, then: after the cutover, do grandfathered customers keep the old invoice layout, or do they get forced onto the new one? Nobody has actually answered that.
[09:14] Daniel: Good question. Let's take it async — I'm not deciding invoice layouts in a standup, uh, again.
[09:14] Tomás: Related thing that keeps me up at night: the usage meter polling — is it actually every 60 seconds, or is that a misunderstanding? Because if it's really 60 seconds, API costs spike for the big tenants.
[09:14] Daniel: I believe it's 60 seconds today. I'll fold that into the platform-team questions.
[09:15] Maya: Last work item — the launch announcement. A draft needs to exist so review week isn't a scramble.
[09:15] Elena: I can take that? Or wait — wasn't that yours, Maya?
[09:15] Maya: Let's say whoever gets to it first — realistically me. I'll draft it and run it past comms before the 14th.
[09:16] Daniel: And, uh, docs. Someone should refresh the billing docs for the new plans. Anybody? Anybody.
[09:16] Priya: Not me — I'm buried in the race condition.
[09:16] Tomás: Also not me.
[09:16] Maya: Parked. We assign docs next Monday — put it on that agenda, and don't let me forget.
[09:17] Elena: Totally unrelated: HR says the offsite RSVP closes Wednesday. That's it from me.
[09:17] Maya: Perfect. Thanks everyone — a short-ish meeting, for once. Same time next week!
[09:17] Daniel: Bye all. Priya — Friday. I believe in you.
[09:17] Priya: [laughs] I heard it, I heard it.`,
  },
  {
    id: "retro",
    label: "Sprint retro",
    transcript: `[10:00] Lena: Okay, retro time. Same rules as always — blameless, no laptops unless you're scribing. I'll run us through the four columns. Marcus, you look exhausted.
[10:01] Marcus: Ha, on-call week. We had the pager go off Tuesday, three a.m. False alarm, but still.
[10:01] Lena: Ugh. Park that for the incidents column. Let's start with what went well.
[10:02] Aiko: The new deploy pipeline, honestly. We went from forty minutes to eleven. I shipped five times on Wednesday without thinking about it.
[10:02] Dev: Yes, and rollback actually works now. I used it Thursday and it was one button. One!
[10:03] Sofia: Docs got better too — the onboarding guide Aiko wrote saved me during the auth refactor.
[10:03] Lena: Good. What went badly?
[10:04] Marcus: Flaky tests, next question. The checkout suite failed on CI four times this sprint and every time it was green on retry. We just reflexively hit re-run now, which means the suite is theater.
[10:05] Aiko: Agreed, and it's worse — when everything is flaky, nobody believes a real failure either. Dev's socket-timeout bug on Thursday got dismissed as "probably flaky" for two hours. It wasn't.
[10:06] Dev: It was not. Two hours of my life.
[10:06] Lena: What else?
[10:07] Sofia: Review latency. My PR sat for three days last week. Not because anyone objected — everyone was just heads-down. By the time it merged, the branch had drifted and I rebased twice.
[10:08] Marcus: Same from me. We say "review within a day" but there's no actual mechanism behind it.
[10:09] Lena: Okay, patterns. I'm hearing: the pipeline is finally fast, so shipping isn't the bottleneck anymore — review and CI trust are. Anything I'm missing?
[10:10] Aiko: One more: small talk in the team channel has genuinely gone up and honestly I think that's good, but standup still takes twenty-five minutes when it should take ten. We read the board out loud like nobody can read.
[10:11] Dev: Guilty. Okay, what do we actually change?
[10:12] Lena: Proposals, go.
[10:13] Marcus: Quarantine budget. If a test flakes twice in a sprint it gets quarantined automatically and someone owns un-flaking it within two weeks. Otherwise we're all just renting a red light.
[10:14] Aiko: Second that, with the add-on that quarantined count gets reported in the sprint review so it can't rot in a corner.
[10:15] Sofia: For reviews: a rotation. Two named reviewers per day, on the calendar. If you're on rotation, reviews are your first priority, and PRs under four hundred lines get looked at same-day.
[10:16] Dev: And can we make standup ten minutes, walking the board and nothing more, and park every discussion into a follow-up huddle? Not a literal party. You know what I mean.
[10:17] Lena: Decision one, then: flaky tests get quarantined after two failures, with a named owner and a two-week fix window, reported at sprint review. Objections? None. Decision two: reviewer rotation, two names per day, same-day for small PRs. Nods? Good.
[10:18] Sofia: Should we also cap work in progress? My three-day PR was partly because everyone had six things open.
[10:19] Marcus: WIP limit of two per person feels right to start. We can tune it.
[10:20] Lena: Adopted — WIP limit of two, we tune it at the next retro. Decision three: standup is ten minutes, discussions get parked to a huddle.
[10:21] Aiko: Open question from me: the three a.m. pager Tuesday. Was that alert ever fixed, or is it going to wake Marcus up again next on-call rotation?
[10:22] Marcus: Not fixed. I muted the channel, which is not a fix, that's a fire hazard.
[10:23] Lena: Okay — Marcus investigates the false-positive alert before handoff on Friday, and we decide whether to fix or delete it. Anything else? ... One more from me: do we still need this weekly, or is biweekly retro enough now that the pipeline's calm?
[10:24] Sofia: Biweekly feels right, but can we decide that next retro with data instead of vibes?
[10:25] Lena: Fair — tabled to next time. Thanks everyone. Marcus, go sleep.`,
  },
  {
    id: "kickoff",
    label: "Client kickoff",
    transcript: `[14:00] Nora: Grace, Priyanka — thanks for making time. This is the formal kickoff for the Juniper Foods rebrand site. Felix, you want to frame the shape of the engagement before we get into dates?
[14:01] Felix: Sure. Sixteen weeks: discovery, design, build, content migration, QA, launch. The one thing I want to stress up front is that content is the long pole. You have roughly two hundred posts and recipes on the current site, and moving those is more work than the design. It always is.
[14:02] Grace: Two hundred and twelve, last count. And half of them have embedded PDFs from 2019, I'm sure.
[14:02] Felix: [laughs] PDFs migrate fine, they just look tragic. Okay.
[14:03] Nora: Let's do goals first, though. Grace, what does success look like in February, two months after launch?
[14:04] Grace: Recipe traffic up thirty percent, honestly, and the trade portal finally not embarrassing us in front of distributors. Right now the sales team forwards people ZIP files. ZIP files, in 2026.
[14:05] Priyanka: And from the brand side — the site needs to feel like the new packaging. The old site is, no offense to whoever built it, three rebrands ago.
[14:06] Nora: None taken, it predates us. Good, that frames design clearly. Now the platform question, because I know it's been floating: Felix, give them the recommendation in plain language.
[14:07] Felix: We recommend headless — a Next.js front end with the CMS behind it. Your marketing team keeps a normal editing experience, and we get the speed and the design freedom. The alternative, plain WordPress themes, is cheaper up front and slower and more painful every month after.
[14:08] Grace: And the cost difference over three years?
[14:09] Felix: Roughly a wash, even before you count the speed. Headless wins slightly on hosting, loses slightly on initial build. I'll put the actual spreadsheet in the recap.
[14:10] Grace: Then let's decide it today, I hate these decisions hanging. We go headless.
[14:10] Nora: Great — headless it is, decided. That unblocks design starting next week.
[14:11] Priyanka: One thing on dates — the holiday campaign launches November 15th and the site must be live before that. Not launch day, before. The packaging and the site need to land together.
[14:12] Nora: November 15th. Felix, realistic?
[14:12] Felix: Doable if, and only if, content freezes November 1st. After that, no edits to migrated pages, or QA re-runs and the date moves. I need that in writing, kindly.
[14:13] Grace: Content freeze November 1st, agreed. I'll tell the team this week. They'll grumble.
[14:13] Felix: They can grumble at me, I'll hold the line.
[14:14] Nora: Okay, dates. Design concepts to you October 3rd, sign-off by the 10th, build through late October, migration freeze the 1st, QA the first two weeks of November, launch on the 12th, three days of buffer before the campaign.
[14:15] Grace: The 12th works. I'm presenting this to our CEO Thursday, so — after this call I need a one-pager, not a forty-page SOW.
[14:15] Nora: One-pager by tomorrow morning, I'll write it personally.
[14:16] Priyanka: Scope question: the brief said six landing pages, but the campaign brief from our ad agency has three more — bundles, gift sets, store locator. Is that in scope?
[14:17] Felix: Store locator is in scope. Bundles and gift sets are not — that's roughly a week of design and build we didn't plan.
[14:18] Nora: Two options: we absorb it and push QA a week, or it's a small SOW amendment. I don't recommend pushing QA, given the hard date.
[14:19] Grace: Send me the amendment. If it's under five figures I can sign it without another procurement cycle.
[14:19] Nora: I'll have it to you with the one-pager. Decided then: three additional landing pages via amendment, store locator stays in base scope.
[14:20] Priyanka: On content: who writes the new landing page copy? Our copywriter left in June and we haven't replaced her.
[14:21] Nora: Options on the table — your team, our team, or a hybrid where we structure and you fill. Let's not solve it now, but we need an answer by the design sign-off, because copy shapes layout.
[14:22] Grace: Noted, answer by the 10th.
[14:22] Felix: Technical asks, and these block me: analytics access, the current hosting account, and a staging subdomain — does your IT allow that? Some enterprise IT departments treat subdomains like a landfill permit.
[14:23] Grace: [laughs] I'll intro you to Ravi in IT today. He's reasonable. Mostly.
[14:24] Priyanka: Last from me: accessibility. Our legal team asked after the last audit — what level are we committing to?
[14:24] Felix: WCAG 2.2 AA across the new site, tested with real screen readers, not just automated scans. Automated-only audits are security theater.
[14:25] Nora: Great session. Recap email today: decisions, dates, the two documents, and the access list. Thursdays same time for check-ins, starting this week. Grace, good luck with the CEO.`,
  },
  {
    id: "postmortem",
    label: "Incident postmortem",
    transcript: `[11:00] Rosa: Postmortem for Tuesday's outage. Blameless, and I mean it — we're here to fix the system, not to flog Ken. Ken, walk us through the timeline.
[11:01] Ken: Sure. 9:14, I deploy the auth-service config change — the token lifetime fix, routine. 9:16, first 401 spike. And, uh, honestly, I assumed it was the daily traffic bump.
[11:02] Yusuf: The alert fired at 9:25. Nine minutes after the first error. That gap is the part that bugs me.
[11:02] Ken: 9:25, page fires, I'm on it. 9:31, I roll the config back — but rollback, uh, didn't roll back. The config service cached the bad value for four minutes. 9:35, cache purge, errors drop. 9:41, error rate zero, monitor green, declared over. Forty-three minutes customer-facing, if we count from the first 401.
[11:03] Rosa: And the status page?
[11:03] Ken: Yellow at 9:28, red at 9:34, green at 9:47. So the page said green six minutes after I'd already fixed it and said nothing for twelve minutes while it was on fire.
[11:04] Dana: From support's side it was ugly. We had six hundred tickets by 10:00. The macro didn't exist, so every agent improvised, and at least two agents told customers "your password may have been reset" — which is terrifying and false.
[11:05] Rosa: Okay. Root cause?
[11:06] Yusuf: The config change had a unit bug — lifetime was in seconds, the service reads milliseconds. It deployed fine because config changes skip validation entirely. Code goes through CI, config goes straight to prod. That's the hole.
[11:07] Ken: And canary doesn't cover config either. A hundred percent of traffic got the bad value instantly.
[11:07] Rosa: So two systemic gaps: config has no validation gate, and config deploys have no canary. Anything else in the causal chain?
[11:08] Yusuf: The nine-minute alert gap. The 401-rate alert threshold is tuned for login-page noise, not token-validation failures. It saw elevated 401s and shrugged.
[11:09] Dana: And the status page — who updates it? Because "the on-call, when they get to it" is what actually happened.
[11:09] Ken: Fair. When you're elbow-deep in rollback, the status page is item number nine.
[11:10] Rosa: Actions, then. One: config changes go through the same validation as code — schema check in CI, enforced. Yusuf?
[11:10] Yusuf: Mine. Schema validation in CI by end of next sprint, and I'll add the unit-standardization — seconds everywhere, no more milliseconds ambiguity.
[11:11] Rosa: Two: canary plus automatic rollback extended to config deploys. Ken, you sketched this in the incident doc already?
[11:11] Ken: Sketched, yes. Design doc by Friday, implementation the sprint after. It touches the config service's cache, which is also why the rollback lagged four minutes — I'll cover the cache TTL in the same doc.
[11:12] Rosa: Three: comms. Status page updates become a named role in the incident runbook — the incident commander delegates a comms owner, first update within ten minutes of paging, updates every fifteen after.
[11:13] Yusuf: I'd add: the green-when-it's-actually-red problem. Status flips to green only when the error-rate monitor confirms, not when a human feels optimistic.
[11:13] Rosa: Adopted — status goes green on monitor confirmation only. That's four decisions so far, all adopted.
[11:14] Dana: Support side: I'm writing the outage macro — plain-language, no scary password language — and we need the compensation policy decided. Do we credit everyone who filed a ticket, or everyone on the affected plans?
[11:15] Rosa: Everyone on affected plans — deciding ticket-by-ticket is slower than just doing the right thing. Dana sizes it and brings the number to me by Friday.
[11:15] Dana: The macro ships Wednesday. The credit number Friday.
[11:16] Ken: Open question from me: the nine-minute alert gap gets fixed by the threshold change — who owns retuning the 401 alerts, and do we split the alert into login-noise versus token-validation?
[11:17] Yusuf: I'll own the split, but retuning needs data on normal login-noise rates, which I don't have. That's the open part.
[11:18] Rosa: Take it with the observability backlog. Second open question, from me: is single on-call sustainable at our size, or does Tuesday argue for a secondary? No decision today — Ken, put the numbers in the postmortem doc.
[11:19] Ken: Doc draft to everyone by Wednesday, review Thursday, publish to the incidents wiki Friday. With the on-call numbers included.
[11:20] Rosa: Last thing — customer email. It goes out with the postmortem, apologetic, factual, mentions the credit. Dana drafts, I edit, it ships with Friday's release notes. Thanks all. Ken — genuinely, your rollback instincts were right. The tools let you down.`,
  },
  {
    id: "design-review",
    label: "Design review",
    transcript: `[13:00] Ines: Design review, checkout flow, round two. Critique the work, not the designer — which today is me, so be gentle. Kidding. Ruth, screens are in the usual Figma, follow along.
[13:01] Ollie: Before visuals — where did we land on steps? Last review we said three steps and this looks like two.
[13:01] Ines: Two. I merged shipping and payment after the last round. Three steps tested as "long" in Caleb's interviews, even though it's the same fields. Perception is the product here.
[13:02] Caleb: To be fair to the data: five of eight participants in the last study said checkout "felt like paperwork." The step count itself wasn't the complaint, but the feeling of progress was.
[13:03] Ollie: Okay, two steps, sold. Walk me through step one.
[13:04] Ines: Contact, shipping address, delivery method. The one big call on this screen: the promo code field is gone. It's behind a small "Have a code?" link under the total.
[13:04] Marisol: As the frontend person I bless this. That field was three validation states, two help texts, and a support-ticket generator.
[13:05] Ollie: I'm nervous, though. Marketing lives and dies by those codes. Will people find the link?
[13:06] Caleb: Honest answer: people who have a code look for it, people who don't never notice it exists. That's the finding from the prototype round — discovery was near-perfect among code-havers precisely because they hunt for it.
[13:07] Ollie: Then I want the redemption number watched after launch. If it dips, the field comes back and I'll admit I was wrong in writing.
[13:07] Ines: Put it in the recap — promo field stays behind the link, redemption is a launch metric, revert is on the table.
[13:08] Ruth: On the address form — you kept the single field with the autocomplete?
[13:08] Ines: Yes. One search field, it queries the address provider, and the manual-entry form is still there behind "enter it myself." The autocomplete covers maybe ninety percent of users.
[13:09] Ruth: Two flags. One: the provider's API rate-limits, so we debounce and cache — fine, I'll handle it. Two: autocomplete fails silently for PO boxes and rural addresses, and the "enter it myself" path needs to be discoverable, not buried.
[13:10] Caleb: Second flag is real. In the study, the two rural participants didn't see the manual link and just gave up.
[13:11] Ines: Then the manual link moves up next to the search field instead of hiding at the bottom. Good catch, that's exactly what this meeting is for.
[13:12] Ollie: Copy pass — the pay button. "Place order"? "Pay now"?
[13:12] Ines: I prototyped "Pay $84.32" — showing the amount on the button. Cart abandonment on the old flow spiked at the payment step, and ambiguous buttons are part of why.
[13:13] Marisol: Love it, with one accessibility note: the amount has to be in the accessible name, not just visual, or screen readers say "Pay" with no amount.
[13:13] Ruth: Easy — the amount goes in the button text node, done.
[13:14] Ollie: What about the order-review step? Where did it go?
[13:14] Ines: It didn't go anywhere — step two IS review. Step one collects, step two shows the full order, editable inline, with the pay button. Nothing is bought without being seen.
[13:15] Caleb: And that solves the trust finding from the interviews. People wanted to see the total before feeling committed, not after.
[13:16] Marisol: One legal-ish thing on step two: the "email me receipts" box is pre-checked in this mock. I thought we killed that pattern in the last release?
[13:16] Ines: ...We did. It's leftover from the old component. Unchecking it. Good catch, thank you.
[13:17] Ollie: Ruth, engineering estimate for the two-step rebuild? Ballpark.
[13:17] Ruth: The screens are the easy part, call it a week. The address service integration and its failure modes are another week. Then QA. Say three weeks to be honest rather than two to be optimistic.
[13:18] Ollie: Three weeks it goes on the board, and if it lands in two I look like a hero. Fine.
[13:19] Ines: Decisions on the table: two steps, promo behind the link with redemption tracked as a launch metric, address autocomplete with a visible manual option, the amount on the pay button, and no pre-checked boxes, ever.
[13:20] Caleb: Research side, I'll run five moderated tests on the clickable prototype Thursday, and I want two participants on mobile-only, because last round was desktop-heavy and it showed.
[13:21] Ines: Perfect. Open items before we close: the empty-cart state design is still from the old system, and the gift-wrap option — is that in this quarter or next?
[13:22] Ollie: Gift wrap is next quarter, it didn't make the roadmap cut. Cart state — Ines, this week if you can.
[13:22] Ines: This week. And one genuinely open question: when the address provider is down, do we fall back to the full manual form automatically, or show an error and a retry? Ruth and I will sync — but flag it now if anyone has an opinion.
[13:23] Ruth: Auto-fallback, but I'll hear arguments Thursday. Okay — recap, and I'll start the integration spike tomorrow.`,
  },
];

/** The first sample, kept as a named export for backwards compatibility. */
export const SAMPLE_TRANSCRIPT: string = SAMPLES[0]!.transcript;
