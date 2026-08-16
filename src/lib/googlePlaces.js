import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const CACHE_TABLE = "places_search_cache";
const CACHE_TTL_DAYS = 30;

// Essentials-tier fields only (id, name, address, coordinates) — the cheapest
// pricing tier Google offers. Do not add fields (ratings, photos, hours,
// phone numbers, reviews) without checking with the project owner first,
// since those move the call into a more expensive pricing tier.
const FIELD_MASK = "places.id,places.displayName,places.formattedAddress,places.location";

function roundCoord(n) {
  // ~1km precision — nearby searches within that radius share a cache entry.
  return Math.round(n * 100) / 100;
}

function buildCacheKey({ textQuery, coords }) {
  const normalizedQuery = textQuery.trim().toLowerCase();
  const locationPart = coords
    ? `${roundCoord(coords.lat)},${roundCoord(coords.lng)}`
    : "no-coords";
  return `${normalizedQuery}|${locationPart}`;
}

async function getCachedResults(cacheKey) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(CACHE_TABLE)
    .select("results, expires_at")
    .eq("query_key", cacheKey)
    .maybeSingle();

  if (error) {
    console.error("places cache read error:", error);
    return null;
  }
  if (!data) return null;
  if (new Date(data.expires_at) < new Date()) return null;

  return data.results;
}

async function saveResultsToCache(cacheKey, results) {
  const supabase = getSupabaseAdmin();
  const expiresAt = new Date(Date.now() + CACHE_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { error } = await supabase
    .from(CACHE_TABLE)
    .upsert({ query_key: cacheKey, results, expires_at: expiresAt }, { onConflict: "query_key" });

  if (error) {
    console.error("places cache write error:", error);
  }
}

function mapPlace(place) {
  return {
    id: place.id,
    name: place.displayName?.text || "Unnamed restaurant",
    address: place.formattedAddress || "",
    lat: place.location?.latitude ?? null,
    lng: place.location?.longitude ?? null,
  };
}

async function callGooglePlacesTextSearch({ textQuery, coords }) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey.startsWith("paste-")) {
    throw new Error(
      "Google Places isn't configured yet. Add your real GOOGLE_PLACES_API_KEY to .env.local."
    );
  }

  const body = { textQuery, includedType: "restaurant" };
  if (coords) {
    body.locationBias = {
      circle: {
        center: { latitude: coords.lat, longitude: coords.lng },
        radius: 5000,
      },
    };
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Google Places error:", response.status, errText);
    throw new Error("Google Places request failed");
  }

  const data = await response.json();
  return (data.places || []).map(mapPlace);
}

export async function searchRestaurants({ textQuery, coords }) {
  const cacheKey = buildCacheKey({ textQuery, coords });

  const cached = await getCachedResults(cacheKey);
  if (cached) {
    return { results: cached, source: "cache" };
  }

  const results = await callGooglePlacesTextSearch({ textQuery, coords });
  await saveResultsToCache(cacheKey, results);

  return { results, source: "google" };
}
