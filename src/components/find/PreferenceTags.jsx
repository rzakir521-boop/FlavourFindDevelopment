"use client";

import { useMemo, useState } from "react";
import { Flame, Leaf, UtensilsCrossed, Search, X } from "lucide-react";

const ICONS = { Flame, Leaf, UtensilsCrossed };

export default function PreferenceTags({ category, selected, onToggle }) {
  const [query, setQuery] = useState("");
  const Icon = ICONS[category.icon] || Flame;

  const selectedOptions = category.options.filter((o) => selected.includes(o.id));

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return category.options.filter(
      (o) => !selected.includes(o.id) && o.label.toLowerCase().includes(q)
    );
  }, [query, category.options, selected]);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#FFA500]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-foreground">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground">{category.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3 pl-0 sm:pl-12">
        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {selectedOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onToggle(category.id, opt.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-gradient-to-r from-[#FFC247] to-[#FFA500] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:scale-[1.04] hover:brightness-105 active:scale-95"
              >
                {opt.label}
                <X className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${category.options.length} options…`}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-9 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#FFA500] focus:ring-4 focus:ring-orange-500/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {query.trim() ? (
          matches.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {matches.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onToggle(category.id, opt.id)}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:scale-[1.04] hover:border-[#FFA500]/40 hover:bg-secondary active:scale-95"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No matches for &quot;{query}&quot;.
            </p>
          )
        ) : (
          selectedOptions.length === 0 && (
            <p className="text-sm text-muted-foreground/70">
              Start typing to see options — e.g. &quot;{category.options[0]?.label.toLowerCase()}&quot;.
            </p>
          )
        )}
      </div>
    </div>
  );
}
