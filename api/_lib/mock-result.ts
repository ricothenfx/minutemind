import { SAMPLES } from "../../shared/samples";
import type { ExtractionResult } from "../../shared/schema";
import { STANDUP_RESULT } from "./mock/standup";
import { RETRO_RESULT } from "./mock/retro";
import { KICKOFF_RESULT } from "./mock/kickoff";
import { POSTMORTEM_RESULT } from "./mock/postmortem";
import { DESIGN_REVIEW_RESULT } from "./mock/design-review";

const RESULTS_BY_SAMPLE_ID: Record<string, ExtractionResult> = {
  standup: STANDUP_RESULT,
  retro: RETRO_RESULT,
  kickoff: KICKOFF_RESULT,
  postmortem: POSTMORTEM_RESULT,
  "design-review": DESIGN_REVIEW_RESULT,
};

/**
 * Returns the pre-baked result for a known sample transcript, so every demo
 * sample shows real grounded output in MOCK_MODE. Unknown input falls back to
 * the original standup result (the historical default).
 */
export function getMockResult(transcript: string): ExtractionResult {
  const trimmed = transcript.trim();
  const sample = SAMPLES.find((s) => s.transcript === trimmed);
  return (sample && RESULTS_BY_SAMPLE_ID[sample.id]) || STANDUP_RESULT;
}
