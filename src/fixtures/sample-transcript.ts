/**
 * Realistic, messy product-standup transcript used by the "Load sample transcript"
 * button and by MOCK_MODE (the pre-baked response quotes it verbatim).
 * Filler words, crosstalk and small talk included on purpose.
 */
export const SAMPLE_TRANSCRIPT = `[09:02] Maya: Alright, good morning everyone. Uh, let's get started while the coffee kicks in. Priya, joining us?
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
[09:17] Priya: [laughs] I heard it, I heard it.`;
