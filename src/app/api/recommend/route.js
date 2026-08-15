import Anthropic from "@anthropic-ai/sdk";
import { PREFERENCE_CATEGORIES } from "@/components/find/preferenceData";

const client = new Anthropic();

function labelsFor(categoryId, selectedIds) {
  const category = PREFERENCE_CATEGORIES.find((c) => c.id === categoryId);
  if (!category || !selectedIds?.length) return [];
  return category.options
    .filter((o) => selectedIds.includes(o.id))
    .map((o) => o.label);
}

function buildPrompt({ preferences, freeText }) {
  const cravings = labelsFor("cravings", preferences?.cravings);
  const dietary = labelsFor("dietary", preferences?.dietary);
  const cuisine = labelsFor("cuisine", preferences?.cuisine);

  const lines = [
    "Suggest real restaurants and takeaways in Camden, London that match the following diner preferences.",
    "",
    cravings.length ? `Flavour cravings: ${cravings.join(", ")}` : null,
    dietary.length ? `Dietary requirements: ${dietary.join(", ")}` : null,
    cuisine.length ? `Preferred cuisines: ${cuisine.join(", ")}` : null,
    freeText?.trim() ? `Additional details from the diner: ${freeText.trim()}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  return JSON.parse(raw.trim());
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { preferences, freeText } = body || {};

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system:
        "You are a knowledgeable local food guide for Camden, London. Given a diner's preferences, " +
        "suggest 5 real restaurants or takeaways located in or very near Camden, London that genuinely fit. " +
        "Respond with ONLY a JSON array (no markdown, no commentary) where each item has exactly these keys: " +
        '"name" (restaurant name), "food_type" (short cuisine/food type label), and "reasoning" (one short, ' +
        "friendly sentence on why it fits this diner's preferences).",
      messages: [
        {
          role: "user",
          content: buildPrompt({ preferences, freeText }),
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock) {
      throw new Error("No text response from model");
    }

    const suggestions = extractJson(textBlock.text);
    if (!Array.isArray(suggestions)) {
      throw new Error("Model response was not a JSON array");
    }

    return Response.json({ suggestions });
  } catch (error) {
    console.error("recommend route error:", error);
    return Response.json(
      { error: "We couldn't reach our recommendation engine. Please try again." },
      { status: 502 },
    );
  }
}
