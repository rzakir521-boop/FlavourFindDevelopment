"use client";

import { useState } from "react";
import { Heart, MapPin, Star, User } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function PinCard({ pin }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(pin.likes || 0);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="group break-inside-avoid rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFA500]/30 hover:shadow-lg hover:shadow-orange-500/10">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-tight text-foreground">
            {pin.restaurantName}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {pin.area}
          </div>
        </div>
        <StarRating rating={pin.rating} />
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {pin.cuisineTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#FFA500]/20 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-[#FFA500]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {pin.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
            <User className="h-3 w-3" />
          </div>
          {pin.username}
        </div>
        <button
          type="button"
          onClick={toggleLike}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all hover:bg-secondary"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              liked
                ? "fill-rose-500 text-rose-500"
                : "fill-none text-muted-foreground"
            }`}
          />
          <span className={liked ? "text-rose-500" : "text-muted-foreground"}>
            {likeCount}
          </span>
        </button>
      </div>
    </div>
  );
}
