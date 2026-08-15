"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PinCard from "@/components/pinboard/PinCard";
import CreatePinForm from "@/components/pinboard/CreatePinForm";
import { SAMPLE_PINS, CUISINE_FILTERS } from "@/components/pinboard/pinData";
import { Plus, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { id: "recent", label: "Most Recent" },
  { id: "rating", label: "Highest Rated" },
];

export default function PinBoard() {
  const [pins, setPins] = useState(SAMPLE_PINS);
  const [showForm, setShowForm] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const filtered = useMemo(() => {
    let list = [...pins];

    if (cuisineFilter !== "All") {
      list = list.filter((p) => p.cuisineTags.includes(cuisineFilter));
    }

    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [pins, cuisineFilter, sortBy]);

  const handleNewPin = (pin) => {
    setPins((prev) => [pin, ...prev]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F2541B]/20 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F2541B]">
            <Sparkles className="h-4 w-4" />
            Community picks
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            The Pin Board
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Real recommendations from real people. Share your favourites and
            discover hidden gems.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
            {CUISINE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCuisineFilter(filter)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all active:scale-95 ${
                  cuisineFilter === filter
                    ? "border-transparent bg-gradient-to-r from-[#FF6B2C] to-[#F2541B] text-white shadow-sm shadow-orange-500/30"
                    : "border-border bg-card text-foreground hover:border-[#F2541B]/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ArrowUpDown className="h-3.5 w-3.5" />
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    sortBy === opt.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#F2541B] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/30 transition-all hover:brightness-105 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add a pin
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((pin) => (
              <div key={pin.id} className="mb-4">
                <PinCard pin={pin} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-secondary/30 p-16 text-center">
            <p className="font-display text-lg font-bold text-foreground">
              No pins match that filter
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different cuisine or be the first to share one.
            </p>
          </div>
        )}
      </main>

      <Footer />

      <CreatePinForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleNewPin}
      />
    </div>
  );
}
