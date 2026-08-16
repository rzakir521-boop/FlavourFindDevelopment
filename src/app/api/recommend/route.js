import { PREFERENCE_CATEGORIES } from "@/components/find/preferenceData";
import { searchRestaurants } from "@/lib/googlePlaces";

function labelsFor(categoryId, selectedIds) {
  const category = PREFERENCE_CATEGORIES.find((c) => c.id === categoryId);
  if (!category || !selectedIds?.length) return [];
  return category.options
    .filter((o) => selectedIds.includes(o.id))
    .map((o) => o.label);
}

const COORD_PATTERN = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/;

function parseCoords(location) {
  const match = location?.match(COORD_PATTERN);
  if (!match) return null;
  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
}

function buildTextQuery({ location, preferences, freeText, coords }) {
  const cravings = labelsFor("cravings", preferences?.cravings);
  const dietary = labelsFor("dietary", preferences?.dietary);
  const cuisine = labelsFor("cuisine", preferences?.cuisine);

  const parts = [];
  parts.push(cuisine.length ? cuisine.join(" or ") + " restaurants" : "restaurants");
  if (dietary.length) parts.push(dietary.join(", ") + " friendly");
  if (cravings.length) parts.push("with " + cravings.join(", ") + " flavours");
  if (freeText?.trim()) parts.push(freeText.trim());
  if (!coords) parts.push("near " + location);

  return parts.join(" ");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { location, preferences, freeText } = body || {};

  if (!location?.trim()) {
    return Response.json({ error: "A location is required." }, { status: 400 });
  }

  const coords = parseCoords(location);
  const textQuery = buildTextQuery({ location, preferences, freeText, coords });

  try {
    const { results } = await searchRestaurants({ textQuery, coords });
    return Response.json({ suggestions: results });
  } catch (error) {
    console.error("recommend route error:", error);
    return Response.json(
      { error: "We couldn't reach our recommendation engine. Please try again." },
      { status: 502 },
    );
  }
}
