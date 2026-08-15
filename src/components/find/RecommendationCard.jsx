import { Star, MapPin, ShieldCheck, Utensils, ArrowUpRight } from "lucide-react";

function MatchBadge({ score }) {
  const num = Math.round(Number(score) || 0);
  let color = "from-amber-400 to-orange-500";
  if (num >= 90) color = "from-[#FF6B2C] to-[#F2541B]";
  else if (num >= 75) color = "from-orange-400 to-amber-500";
  else color = "from-amber-300 to-orange-400";

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${color} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
      <Star className="h-3.5 w-3.5 fill-white" />
      {num}% match
    </div>
  );
}

function DietaryBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <ShieldCheck className="h-3 w-3" />
      {label}
    </span>
  );
}

export default function RecommendationCard({ restaurant, index }) {
  if (!restaurant) return null;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F2541B]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-amber-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Utensils className="h-3.5 w-3.5" />
            {restaurant.cuisine || "Restaurant"}
            {restaurant.area && (
              <>
                <span className="text-border">•</span>
                <MapPin className="h-3.5 w-3.5" />
                {restaurant.area}
              </>
            )}
          </div>
          <h3 className="font-display text-xl font-bold leading-tight text-foreground">
            {restaurant.name}
          </h3>
        </div>
        <MatchBadge score={restaurant.match_score} />
      </div>

      {restaurant.dietary_badges?.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {restaurant.dietary_badges.map((b, i) => (
            <DietaryBadge key={i} label={b} />
          ))}
        </div>
      )}

      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
        {restaurant.explanation}
      </p>

      {restaurant.price_range && (
        <div className="relative mt-4 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-sm font-semibold text-foreground">
            {restaurant.price_range}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#F2541B] opacity-0 transition-opacity group-hover:opacity-100">
            View details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      )}
    </div>
  );
}
