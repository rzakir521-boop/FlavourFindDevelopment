import { Utensils } from "lucide-react";

export default function RecommendationCard({ restaurant, index }) {
  if (!restaurant) return null;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F2541B]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-amber-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Utensils className="h-3.5 w-3.5" />
          {restaurant.food_type || "Restaurant"}
        </div>
        <h3 className="font-display text-xl font-bold leading-tight text-foreground">
          {restaurant.name}
        </h3>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
        {restaurant.reasoning}
      </p>
    </div>
  );
}
