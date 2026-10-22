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

// Each selected cuisine costs one Google search, so cap how many we run at once.
const MAX_CUISINES = 6;
const MAX_RESULTS = 20;

// Taste and dietary choices are "core": they go into every search. Each cuisine
// then gets its own search on top of that core (or one cuisine-less search if
// no cuisine was picked).
function buildTextQueries({ location, preferences, freeText, coords }) {
  const cravings = labelsFor("cravings", preferences?.cravings);
  const dietary = labelsFor("dietary", preferences?.dietary);
  const cuisines = labelsFor("cuisine", preferences?.cuisine).slice(0, MAX_CUISINES);

  const buildQuery = (cuisine) => {
    const parts = [];
    parts.push(cuisine ? cuisine + " restaurants" : "restaurants");
    if (dietary.length) parts.push(dietary.join(", ") + " friendly");
    if (cravings.length) parts.push("with " + cravings.join(", ") + " flavours");
    if (freeText?.trim()) parts.push(freeText.trim());
    if (!coords) parts.push("near " + location);
    return parts.join(" ");
  };

  return cuisines.length ? cuisines.map(buildQuery) : [buildQuery(null)];
}

// Takes one result from each cuisine's list in turn so every cuisine is
// represented, skipping restaurants already added by an earlier cuisine.
function interleaveResults(resultLists) {
  const seen = new Set();
  const merged = [];
  const longest = Math.max(0, ...resultLists.map((list) => list.length));

  for (let i = 0; i < longest && merged.length < MAX_RESULTS; i++) {
    for (const list of resultLists) {
      const place = list[i];
      if (place && !seen.has(place.id)) {
        seen.add(place.id);
        merged.push(place);
        if (merged.length >= MAX_RESULTS) break;
      }
    }
  }
  return merged;
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
  const textQueries = buildTextQueries({ location, preferences, freeText, coords });

  try {
    const settled = await Promise.allSettled(
      textQueries.map((textQuery) => searchRestaurants({ textQuery, coords })),
    );
    const succeeded = settled.filter((s) => s.status === "fulfilled");
    if (!succeeded.length) throw settled[0].reason;

    const suggestions = interleaveResults(succeeded.map((s) => s.value.results));
    return Response.json({ suggestions });
  } catch (error) {
    console.error("recommend route error:", error);
    return Response.json(
      { error: "We couldn't reach our recommendation engine. Please try again." },
      { status: 502 },
    );
  }
}
