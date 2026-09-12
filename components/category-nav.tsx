"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Category } from "@/data/menu";

type Props = {
  categories: Category[];
  activeCategory: string;
  onSelect: (slug: string) => void;
};

export default function CategoryNav({ categories, activeCategory, onSelect }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Auto-scroll active pill into view
  useEffect(() => {
    const pill = pillRefs.current[activeCategory];
    const nav = navRef.current;
    if (!pill || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const scrollLeft =
      nav.scrollLeft +
      pillRect.left -
      navRect.left -
      navRect.width / 2 +
      pillRect.width / 2;

    nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeCategory]);

  const handleSelect = useCallback(
    (slug: string) => {
      onSelect(slug);
      document
        .getElementById(`category-${slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [onSelect]
  );

  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      <div
        ref={navRef}
        className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide"
        role="tablist"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              ref={(el) => { pillRefs.current[cat.slug] = el; }}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(cat.slug)}
              className={`
                category-pill px-4 py-2 rounded-pill text-sm font-body font-medium
                border transition-all duration-200
                ${
                  isActive
                    ? "bg-primary border-primary text-white"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-card"
                }
              `}
            >
              {cat.navLabel}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
