"use client";

import { MessageSquare } from "lucide-react";

export default function FreeTextInput({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#FFA500]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold leading-tight text-foreground">
            Anything else?
          </h3>
          <p className="text-sm text-muted-foreground">
            Describe any extra details — vibe, setting, budget, or specifics.
          </p>
        </div>
      </div>

      <div className="pl-0 sm:pl-12">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. I want somewhere cosy with outdoor seating and a good wine list, ideally under £30 a head"
          rows={3}
          className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3.5 text-base font-medium text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-[#FFA500] focus:ring-4 focus:ring-orange-500/15"
        />
      </div>
    </div>
  );
}
