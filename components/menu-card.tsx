"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { formatPrice, getBadgeClass } from "@/lib/utils";

type Props = {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
};

export default function MenuCard({ item, onOpen }: Props) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const hasIngredients = item.ingredients && item.ingredients.length > 0;
  const hasPrice = item.price !== undefined;

  return (
    <article
      className="
        group relative bg-card rounded-card border border-border
        overflow-hidden cursor-pointer tap-scale
        transition-all duration-200
        hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-0.5
        active:scale-[0.98]
      "
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name}${hasPrice ? ` — ${formatPrice(item.price)}` : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
    >
      {/* Image — only shown if an image is provided */}
      {item.image && (
        <div className="relative w-full aspect-[4/3] bg-card-hover overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 shimmer" aria-hidden="true" />
          )}
          {!imgError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`
                object-cover transition-all duration-300
                group-hover:scale-105
                ${imgLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
            />
          ) : null}

          {/* Badge */}
          {item.badge && (
            <span
              className={`
                absolute top-2 left-2 px-2 py-0.5
                text-[10px] font-display font-bold tracking-wide uppercase rounded-pill
                ${getBadgeClass(item.badge)}
              `}
            >
              {item.badge}
            </span>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        {/* Badge — shown in card body when there's no image */}
        {item.badge && !item.image && (
          <span
            className={`
              inline-block mb-1.5 px-2 py-0.5
              text-[10px] font-display font-bold tracking-wide uppercase rounded-pill
              ${getBadgeClass(item.badge)}
            `}
          >
            {item.badge}
          </span>
        )}

        {/* Name */}
        <h3 className="font-display font-bold text-foreground text-base leading-tight">
          {item.name}
        </h3>

        {/* Ingredients — clean comma-separated list */}
        {hasIngredients && (
          <p className="text-muted-foreground text-xs font-body mt-1 leading-relaxed">
            {item.ingredients!.join(", ")}
          </p>
        )}

        {/* Price — only rendered when confirmed */}
        {hasPrice && (
          <p className="font-display font-bold text-primary text-base mt-2">
            {formatPrice(item.price)}
          </p>
        )}
      </div>
    </article>
  );
}
