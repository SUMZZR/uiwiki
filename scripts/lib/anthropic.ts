const API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";

type AnthropicResponse = {
  content?: Array<{ type: string; text?: string }>;
  error?: { message?: string };
};

export async function askClaude(system: string, prompt: string, maxTokens = 12_000) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is required to generate content");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL,
      max_tokens: maxTokens,
      thinking: { type: "disabled" },
      system,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(120_000),
  });
  const payload = (await response.json()) as AnthropicResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Anthropic API failed with ${response.status}`);
  }

  const text = payload.content
    ?.filter((block) => block.type === "text")
    .map((block) => block.text ?? "")
    .join("\n")
    .trim();
  if (!text) throw new Error("Anthropic returned no text content");
  return text;
}

export function parseJsonResponse<T>(text: string): T {
  const withoutFence = text
    .replace(/^```(?:json)?\s*/iu, "")
    .replace(/\s*```$/u, "")
    .trim();
  return JSON.parse(withoutFence) as T;
}
