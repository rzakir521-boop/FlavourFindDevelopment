import { MapPin, ExternalLink } from "lucide-react";

export default function RecommendationCard({ restaurant, index }) {
  if (!restaurant) return null;

  const mapsUrl =
    restaurant.lat && restaurant.lng
      ? `https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}${
          restaurant.id ? `&query_place_id=${restaurant.id}` : ""
        }`
      : null;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFA500]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-amber-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <h3 className="font-display text-xl font-bold leading-tight text-foreground">
          {restaurant.name}
        </h3>

        {restaurant.address && (
          <div className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{restaurant.address}</span>
          </div>
        )}

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFA500] hover:underline"
          >
            View on Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
