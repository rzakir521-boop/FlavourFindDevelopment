"use client";

import { useState } from "react";
import { Plus, X, Star, MapPin, Send } from "lucide-react";
import { CUISINE_FILTERS } from "./pinData";

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starVal = i + 1;
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHover(starVal)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(starVal)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                starVal <= (hover || value)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-border"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

const cuisineOptions = CUISINE_FILTERS.filter((c) => c !== "All");

export default function CreatePinForm({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    restaurantName: "",
    area: "",
    description: "",
    cuisineTags: [],
    rating: 0,
  });

  const canSubmit =
    form.restaurantName.trim() &&
    form.description.trim() &&
    form.rating > 0 &&
    form.cuisineTags.length > 0;

  const toggleCuisine = (cuisine) => {
    setForm((prev) => ({
      ...prev,
      cuisineTags: prev.cuisineTags.includes(cuisine)
        ? prev.cuisineTags.filter((c) => c !== cuisine)
        : prev.cuisineTags.length < 3
          ? [...prev.cuisineTags, cuisine]
          : prev.cuisineTags,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({
      ...form,
      id: crypto.randomUUID(),
      likes: 0,
      username: "you",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setForm({
      restaurantName: "",
      area: "",
      description: "",
      cuisineTags: [],
      rating: 0,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative mx-4 mb-4 w-full max-w-lg space-y-5 rounded-3xl border border-border bg-card p-6 shadow-2xl sm:mb-0 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">
            Share a restaurant
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">
            Restaurant name
          </label>
          <input
            type="text"
            value={form.restaurantName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, restaurantName: e.target.value }))
            }
            placeholder="e.g. Dishoom"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#FFA500] focus:ring-4 focus:ring-orange-500/15"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">
            Area / Location
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={form.area}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, area: e.target.value }))
              }
              placeholder="e.g. Shoreditch"
              className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-base font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#FFA500] focus:ring-4 focus:ring-orange-500/15"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">
            Your review
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="What did you love about it?"
            rows={3}
            className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#FFA500] focus:ring-4 focus:ring-orange-500/15"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">
            Cuisine (up to 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((c) => {
              const selected = form.cuisineTags.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCuisine(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                    selected
                      ? "border-transparent bg-gradient-to-r from-[#FFC247] to-[#FFA500] text-white shadow-sm"
                      : "border-border bg-background text-foreground hover:border-[#FFA500]/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">
            Rating
          </label>
          <StarInput
            value={form.rating}
            onChange={(val) => setForm((prev) => ({ ...prev, rating: val }))}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FFC247] to-[#FFA500] py-3.5 text-base font-bold text-white shadow-md shadow-orange-500/30 transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Share your pin
        </button>
      </form>
    </div>
  );
}
