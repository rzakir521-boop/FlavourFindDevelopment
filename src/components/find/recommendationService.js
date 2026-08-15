export async function getRecommendations({ location, preferences, freeText }) {
  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, preferences, freeText }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await res.json();
  return data.suggestions;
}
