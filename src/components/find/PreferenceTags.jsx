"use client";

import { Flame, Leaf, UtensilsCrossed } from "lucide-react";

const ICONS = { Flame, Leaf, UtensilsCrossed };

export default function PreferenceTags({ category, selected, onToggle }) {
  const Icon = ICONS[category.icon] || Flame;

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

      <div className="flex flex-wrap gap-2.5 pl-0 sm:pl-12">
        {category.options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(category.id, opt.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-95 ${
                isSelected
                  ? "border-transparent bg-gradient-to-r from-[#FFC247] to-[#FFA500] text-white shadow-md shadow-orange-500/30 hover:brightness-105"
                  : "border-border bg-card text-foreground hover:border-[#FFA500]/40 hover:bg-secondary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
