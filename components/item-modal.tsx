"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { MenuItem, OptionGroup, Extra } from "@/data/menu";
import { useCart } from "@/store/cart";
import { formatPrice, getBadgeClass, generateCartKey } from "@/lib/utils";

type Props = {
  item: MenuItem | null;
  onClose: () => void;
};

export default function ItemModal({ item, onClose }: Props) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, { choiceId: string; label: string; priceAdd: number }>
  >({});
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [imgError, setImgError] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const isOpen = !!item;

  // Reset state on new item
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setImgError(false);
      const defaults: typeof selectedOptions = {};
      item.options?.forEach((group) => {
        if (group.required && group.choices.length > 0) {
          const first = group.choices[0];
          defaults[group.id] = {
            choiceId: first.id,
            label: first.label,
            priceAdd: first.priceAdd ?? 0,
          };
        }
      });
      setSelectedOptions(defaults);
      setSelectedExtras([]);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOptionSelect = useCallback(
    (group: OptionGroup, choiceId: string) => {
      const choice = group.choices.find((c) => c.id === choiceId)!;
      setSelectedOptions((prev) => ({
        ...prev,
        [group.id]: {
          choiceId,
          label: choice.label,
          priceAdd: choice.priceAdd ?? 0,
        },
      }));
    },
    []
  );

  const handleExtraToggle = useCallback((extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra.id)
        ? prev.filter((id) => id !== extra.id)
        : [...prev, extra.id]
    );
  }, []);

  if (!item) return null;

  const priceUnknown = item.price === undefined;
  const hasIngredients = item.ingredients && item.ingredients.length > 0;

  // Compute unit price (only meaningful when base price is known)
  const optionExtraTotal = Object.values(selectedOptions).reduce(
    (sum, o) => sum + o.priceAdd,
    0
  );
  const extrasTotal = (item.extras ?? [])
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const unitPrice = priceUnknown ? 0 : (item.price! + optionExtraTotal + extrasTotal);

  const canAdd =
    !item.options ||
    item.options.every(
      (g) => !g.required || selectedOptions[g.id] !== undefined
    );

  const handleAddToCart = () => {
    if (!canAdd) return;

    const optionLabels: Record<string, string> = {};
    Object.entries(selectedOptions).forEach(([gId, sel]) => {
      const group = item.options?.find((g) => g.id === gId);
      if (group) optionLabels[group.label] = sel.label;
    });

    const extraLabels = (item.extras ?? [])
      .filter((e) => selectedExtras.includes(e.id))
      .map((e) => e.label);

    const cartKey = generateCartKey(
      item.id,
      Object.fromEntries(
        Object.entries(selectedOptions).map(([gId, sel]) => [gId, sel.choiceId])
      )
    );

    addItem({
      cartKey,
      id: item.id,
      name: item.name,
      price: item.price ?? 0,
      totalPrice: unitPrice,
      priceUnknown,
      image: item.image,
      quantity,
      selectedOptions: optionLabels,
      selectedExtras: extraLabels,
    });

    onClose();
    setTimeout(() => openCart(), 200);
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black/70 overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="
          fixed z-50 bg-card border border-border rounded-t-[24px] md:rounded-card
          bottom-0 left-0 right-0
          md:bottom-auto md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:max-w-lg md:w-full
          max-h-[90svh] md:max-h-[85vh]
          overflow-y-auto
          animate-slide-up md:animate-scale-in
          safe-bottom
        "
      >
        {/* Drag handle (mobile) */}
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-1 bg-card md:hidden">
          <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image — only rendered if provided */}
        {item.image && !imgError && (
          <div className="relative w-full aspect-video bg-card-hover overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover img-fade-in"
              sizes="(max-width: 768px) 100vw, 512px"
              priority
              onError={() => setImgError(true)}
            />
            {item.badge && (
              <span
                className={`
                  absolute top-3 left-3 px-3 py-1
                  text-xs font-display font-bold tracking-wide uppercase rounded-pill
                  ${getBadgeClass(item.badge)}
                `}
              >
                {item.badge}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Badge (when no image) */}
          {item.badge && !item.image && (
            <span
              className={`
                inline-block mb-2 px-3 py-1
                text-xs font-display font-bold tracking-wide uppercase rounded-pill
                ${getBadgeClass(item.badge)}
              `}
            >
              {item.badge}
            </span>
          )}

          {/* Name + Price */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="font-display font-bold text-2xl text-foreground leading-tight">
              {item.name}
            </h2>
            {!priceUnknown && (
              <span className="font-display font-bold text-xl text-primary flex-shrink-0">
                {formatPrice(unitPrice)}
              </span>
            )}
          </div>

          {/* Ingredients */}
          {hasIngredients && (
            <ul className="mb-5 space-y-1" aria-label="Composition">
              {item.ingredients!.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm font-body text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                  {ing}
                </li>
              ))}
            </ul>
          )}

          {/* Description (internal note, if any) */}
          {item.description && (
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">
              {item.description}
            </p>
          )}

          {/* Options */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-4 mb-5">
              {item.options.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-bold text-sm text-foreground uppercase tracking-wide">
                      {group.label}
                    </span>
                    {group.required && (
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-pill font-body">
                        Requis
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.choices.map((choice) => {
                      const isSelected =
                        selectedOptions[group.id]?.choiceId === choice.id;
                      return (
                        <button
                          key={choice.id}
                          onClick={() => handleOptionSelect(group, choice.id)}
                          className={`
                            px-3 py-2 rounded-lg text-sm font-body border transition-all
                            ${isSelected
                              ? "bg-primary border-primary text-white"
                              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }
                          `}
                        >
                          {choice.label}
                          {choice.priceAdd && choice.priceAdd > 0
                            ? ` +${choice.priceAdd} DA`
                            : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Extras */}
          {item.extras && item.extras.length > 0 && (
            <div className="mb-5">
              <span className="font-display font-bold text-sm text-foreground uppercase tracking-wide block mb-2">
                Suppléments
              </span>
              <div className="space-y-2">
                {item.extras.map((extra) => {
                  const checked = selectedExtras.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      onClick={() => handleExtraToggle(extra)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg border text-left
                        transition-all font-body
                        ${checked
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/30"
                        }
                      `}
                    >
                      <span className="text-sm">{extra.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-primary font-medium">
                          +{extra.price} DA
                        </span>
                        <div
                          className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                            ${checked ? "border-primary bg-primary" : "border-border"}
                          `}
                        >
                          {checked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Add */}
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            {/* Quantity controls */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden flex-shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-card-hover transition-colors"
                aria-label="Diminuer la quantité"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span className="w-8 text-center font-display font-bold text-lg text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-card-hover transition-colors"
                aria-label="Augmenter la quantité"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`
                flex-1 py-3 rounded-card font-display font-bold text-base tracking-wide
                transition-all tap-scale
                ${canAdd
                  ? "btn-primary"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                }
              `}
            >
              {priceUnknown
                ? `Ajouter ×${quantity}`
                : `Ajouter — ${formatPrice(unitPrice * quantity)}`}
            </button>
          </div>

          {!canAdd && (
            <p className="text-xs text-primary mt-2 text-center font-body">
              Veuillez sélectionner toutes les options requises
            </p>
          )}
        </div>
      </div>
    </>
  );
}
