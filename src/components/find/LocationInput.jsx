"use client";

import { useState } from "react";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";

export default function LocationInput({ value, onChange }) {
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported on this device.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onChange(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (current location)`);
        setDetecting(false);
      },
      () => {
        setError("Couldn't access your location. Please type it instead.");
        setDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#F2541B]">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-foreground">
            Where are you?
          </h3>
          <p className="text-sm text-muted-foreground">
            Tell us your city, area, or postcode — or let us find you.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pl-0 sm:pl-12">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. Shoreditch, London or M1 5AA"
            className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-base font-medium text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#F2541B] focus:ring-4 focus:ring-orange-500/15"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={detectLocation}
          disabled={detecting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#F2541B]/40 bg-orange-50/50 py-3 text-sm font-semibold text-[#F2541B] transition-all hover:border-[#F2541B] hover:bg-orange-50 disabled:opacity-60"
        >
          {detecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Detecting your location…
            </>
          ) : (
            <>
              <LocateFixed className="h-4 w-4" />
              Use my current location
            </>
          )}
        </button>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
