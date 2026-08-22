"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import LocationInput from "@/components/find/LocationInput";
import PreferenceTags from "@/components/find/PreferenceTags";
import FreeTextInput from "@/components/find/FreeTextInput";
import RecommendationCard from "@/components/find/RecommendationCard";
import { PREFERENCE_CATEGORIES } from "@/components/find/preferenceData";
import { getRecommendations } from "@/components/find/recommendationService";
import { Wand2, Loader2, RotateCcw, Sparkles, Utensils, Frown, SearchX } from "lucide-react";

const LOADING_MESSAGES = [
  "Tasting the options…",
  "Matching your cravings…",
  "Checking dietary fit…",
  "Narrowing down the neighbourhood…",
  "Plating up your recommendations…",
];

export default function Find() {
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState({
    cravings: [],
    dietary: [],
    cuisine: [],
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [freeText, setFreeText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const togglePreference = (categoryId, optionId) => {
    setPreferences((prev) => {
      const current = prev[categoryId] || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [categoryId]: next };
    });
  };

  const totalSelected =
    preferences.cravings.length + preferences.dietary.length + preferences.cuisine.length;

  const canSearch = location.trim().length > 0 && totalSelected > 0;

  const handleSearch = async () => {
    if (!canSearch) return;
    setLoading(true);
    setError("");
    setResults([]);
    setHasSearched(true);

    let msgIndex = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const msgTimer = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 1800);

    try {
      const restaurants = await getRecommendations({ location, preferences, freeText });
      setResults(restaurants);
    } catch (e) {
      setError("Something went wrong finding your recommendations. Please try again.");
    } finally {
      clearInterval(msgTimer);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLocation("");
    setPreferences({ cravings: [], dietary: [], cuisine: [] });
    setFreeText("");
    setResults([]);
    setError("");
    setHasSearched(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Reveal className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFA500]/20 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#FFA500]">
            <Sparkles className="h-4 w-4" />
            Let&apos;s find your match
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Tell us what you&apos;re craving
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The more you share, the better we can match you. Tap the tags that fit.
          </p>
        </Reveal>

        <Reveal delay={100} className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <LocationInput value={location} onChange={setLocation} />

          <div className="h-px bg-border" />

          {PREFERENCE_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <PreferenceTags
                category={cat}
                selected={preferences[cat.id] || []}
                onToggle={togglePreference}
              />
            </div>
          ))}

          <div className="h-px bg-border" />

          <FreeTextInput value={freeText} onChange={setFreeText} />
        </Reveal>

        <div className="sticky bottom-4 z-30 mt-6">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/90 p-3 shadow-lg backdrop-blur-xl">
            <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
              {totalSelected > 0
                ? `${totalSelected} preference${totalSelected > 1 ? "s" : ""} selected`
                : "Select at least one preference"}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/30"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              type="button"
              onClick={handleSearch}
              disabled={!canSearch || loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFC247] to-[#FFA500] px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/30 transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Finding…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Find my food
                </>
              )}
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFC247] to-[#FFA500] shadow-lg shadow-orange-500/30">
                <Utensils className="h-9 w-9 text-white" />
              </div>
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/30" />
            </div>
            <p className="font-display text-xl font-bold text-foreground">{loadingMsg}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our AI is curating your personalised matches.
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-center">
            <Frown className="mb-3 h-10 w-10 text-destructive" />
            <p className="font-display text-lg font-bold text-foreground">{error}</p>
            <button
              onClick={handleSearch}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-[#FFA500] hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Your matches
                </h2>
                <p className="text-sm text-muted-foreground">
                  {results.length} venues tailored to your taste.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {results.map((r, i) => (
                <RecommendationCard key={i} restaurant={r} index={i} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleSearch}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-[#FFA500]/40 hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Regenerate recommendations
              </button>
            </div>
          </div>
        )}

        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="animate-fade-in-up mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/30 p-10 text-center">
            <SearchX className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-display text-lg font-bold text-foreground">
              No matches for that combination
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try loosening a filter or two, or broadening your location.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-[#FFA500]/40 hover:bg-secondary active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filters
            </button>
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-secondary/30 p-10 text-center">
            <Utensils className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-display text-lg font-bold text-foreground">
              Your recommendations will appear here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Set your location and preferences, then hit &quot;Find my food&quot;.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
