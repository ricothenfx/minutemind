import { z } from "zod";

const nonEmpty = z.string().trim().min(1);

const ownerSchema = z
  .union([z.string(), z.null()])
  .transform((v) => (typeof v === "string" ? v.trim() : v))
  .transform((v) => (v === "" ? null : v));

const dueSchema = ownerSchema;

export const prioritySchema = z.preprocess(
  (v) => {
    if (typeof v !== "string") return v;
    const lowered = v.toLowerCase().trim();
    // Models sometimes emit "null"/"n/a"/"" as a string instead of JSON null.
    return lowered === "" || NULL_SENTINEL.test(lowered) ? null : lowered;
  },
  z.enum(["high", "medium", "low"]).nullable(),
);

export const decisionSchema = z.object({
  decision: nonEmpty,
  owner: ownerSchema,
  quote: nonEmpty,
});

export const actionItemSchema = z.object({
  task: nonEmpty,
  owner: dueSchema,
  due: dueSchema,
  priority: prioritySchema,
  quote: nonEmpty,
});

export const openQuestionSchema = z.object({
  question: nonEmpty,
  quote: nonEmpty,
});

export const followUpEmailSchema = z.object({
  subject: nonEmpty,
  body: nonEmpty,
});

export const extractionSchema = z.object({
  summary: z.array(nonEmpty),
  decisions: z.array(decisionSchema),
  action_items: z.array(actionItemSchema),
  open_questions: z.array(openQuestionSchema),
  follow_up_email: followUpEmailSchema,
});

export type Decision = z.infer<typeof decisionSchema>;
export type ActionItem = z.infer<typeof actionItemSchema>;
export type OpenQuestion = z.infer<typeof openQuestionSchema>;
export type FollowUpEmail = z.infer<typeof followUpEmailSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type ExtractionResult = z.infer<typeof extractionSchema>;

export const NULL_SENTINEL =
  /^(unassigned|unspecified|not specified|not mentioned|no deadline|none|n\/?a|tbd|null|unknown|-+)$/i;

/** Maps strings like "unassigned"/"N/A" to null; used when normalizing LLM output. */
export function nullIfSentinel(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (trimmed === "" || NULL_SENTINEL.test(trimmed)) return null;
  return trimmed;
}
