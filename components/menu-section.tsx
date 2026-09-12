"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { CATEGORIES, MENU_ITEMS, type MenuItem } from "@/data/menu";
import MenuCard from "./menu-card";
import CategoryNav from "./category-nav";
import ItemModal from "./item-modal";
import SearchBar from "./search-bar";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const observerActive = useRef(true);

  // Only show categories that have at least one available item
  const availableCategories = useMemo(() => {
    return CATEGORIES.filter((cat) =>
      MENU_ITEMS.some(
        (item) => item.category === cat.slug && item.available !== false
      )
    );
  }, []);

  // Set initial active category
  useEffect(() => {
    if (availableCategories.length > 0 && !activeCategory) {
      setActiveCategory(availableCategories[0].slug);
    }
  }, [availableCategories, activeCategory]);

  // Intersection observer — update active category pill on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    availableCategories.forEach((cat) => {
      const el = document.getElementById(`category-${cat.slug}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && observerActive.current) {
            setActiveCategory(cat.slug);
          }
        },
        { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [availableCategories]);

  const handleCategorySelect = useCallback((slug: string) => {
    observerActive.current = false;
    setActiveCategory(slug);
    setTimeout(() => { observerActive.current = true; }, 800);
  }, []);

  // Search filter — searches name, ingredients, category label
  const filteredItems = searchQuery.trim()
    ? MENU_ITEMS.filter((item) => {
        if (item.available === false) return false;
        const q = searchQuery.toLowerCase();
        const catLabel =
          CATEGORIES.find((c) => c.slug === item.category)?.label ?? "";
        return (
          item.name.toLowerCase().includes(q) ||
          item.ingredients?.some((ing) => ing.toLowerCase().includes(q)) ||
          item.description?.toLowerCase().includes(q) ||
          catLabel.toLowerCase().includes(q)
        );
      })
    : null;

  return (
    <div>
      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Search results */}
      {filteredItems !== null ? (
        <section className="px-4 py-6" aria-label="Résultats de recherche">
          <p className="text-muted-foreground text-sm font-body mb-4">
            {filteredItems.length} résultat
            {filteredItems.length !== 1 ? "s" : ""} pour «{" "}
            <span className="text-foreground">{searchQuery}</span> »
          </p>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                Aucun résultat
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                Essayez un autre mot-clé.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} onOpen={setSelectedItem} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Category navigation — only shows categories with products */}
          {activeCategory && (
            <CategoryNav
              categories={availableCategories}
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />
          )}

          {/* Menu sections */}
          <div className="pb-32">
            {availableCategories.map((cat) => {
              const items = MENU_ITEMS.filter(
                (item) =>
                  item.category === cat.slug && item.available !== false
              );

              return (
                <section
                  key={cat.slug}
                  id={`category-${cat.slug}`}
                  aria-labelledby={`heading-${cat.slug}`}
                  className="px-4 pt-8 pb-4"
                >
                  {/* Section heading uses full label */}
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      id={`heading-${cat.slug}`}
                      className="font-display font-bold text-2xl text-foreground tracking-tight"
                    >
                      {cat.label}
                    </h2>
                    <span className="text-muted-foreground text-sm font-body">
                      {items.length}
                    </span>
                  </div>

                  {/* Items grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onOpen={setSelectedItem}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}

      {/* Item detail modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
