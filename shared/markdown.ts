import type { ExtractionResult } from "./schema";
import { countWords } from "./contract";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Renders an extraction result as a clean Markdown document (copy + download). */
export function resultToMarkdown(result: ExtractionResult): string {
  const lines: string[] = [];
  const words = result.action_items.length + result.decisions.length + result.open_questions.length;

  lines.push("# MinuteMind — Meeting extraction");
  lines.push("");
  lines.push(`_Generated ${today()} · grounded quotes included · ${words} extracted items_`);
  lines.push("");

  if (result.summary.length > 0) {
    lines.push("## Summary");
    lines.push("");
    for (const bullet of result.summary) {
      lines.push(`- ${bullet}`);
    }
    lines.push("");
  }

  if (result.decisions.length > 0) {
    lines.push(`## Decisions (${result.decisions.length})`);
    lines.push("");
    result.decisions.forEach((d, i) => {
      lines.push(`${i + 1}. **${d.decision}**`);
      if (d.owner) lines.push(`   - Owner: ${d.owner}`);
      lines.push(`   - Quote: "${d.quote}"`);
    });
    lines.push("");
  }

  if (result.action_items.length > 0) {
    lines.push(`## Action items (${result.action_items.length})`);
    lines.push("");
    result.action_items.forEach((a, i) => {
      lines.push(`${i + 1}. **${a.task}**`);
      lines.push(`   - Owner: ${a.owner ?? "Unassigned"}`);
      lines.push(`   - Due: ${a.due ?? "No deadline"}`);
      if (a.priority) lines.push(`   - Priority: ${a.priority}`);
      lines.push(`   - Quote: "${a.quote}"`);
    });
    lines.push("");
  }

  if (result.open_questions.length > 0) {
    lines.push(`## Open questions (${result.open_questions.length})`);
    lines.push("");
    result.open_questions.forEach((q, i) => {
      lines.push(`${i + 1}. ${q.question}`);
      lines.push(`   - Quote: "${q.quote}"`);
    });
    lines.push("");
  }

  lines.push("## Follow-up email");
  lines.push("");
  lines.push(`**Subject:** ${result.follow_up_email.subject}`);
  lines.push("");
  lines.push(result.follow_up_email.body);
  lines.push("");

  return lines.join("\n");
}

export function wordCountLabel(transcript: string): string {
  return countWords(transcript).toLocaleString("en-US");
}

export function slugFilename(prefix = "minutemind"): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${prefix}-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.md`;
}
