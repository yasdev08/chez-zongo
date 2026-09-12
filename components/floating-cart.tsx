"use client";

import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function FloatingCart() {
  const { totalItems, totalPrice, toggleCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-sm pointer-events-none">
      <button
        onClick={toggleCart}
        className="
          w-full pointer-events-auto
          btn-primary py-4 px-5 rounded-card
          flex items-center gap-3
          shadow-glow
          tap-scale
          animate-slide-up
        "
        aria-label={`Voir le panier — ${totalItems} article${totalItems !== 1 ? "s" : ""}`}
      >
        {/* Cart icon with badge */}
        <div className="relative flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            className="
              absolute -top-2 -right-2 w-5 h-5 rounded-full
              bg-white text-primary text-[10px] font-display font-bold
              flex items-center justify-center
            "
            aria-hidden="true"
          >
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        </div>

        <span className="font-display font-bold text-base tracking-wide">
          Voir la commande
        </span>

        <span className="ml-auto font-display font-bold text-base">
          {totalPrice > 0 ? formatPrice(totalPrice) : "Voir"}
        </span>
      </button>
    </div>
  );
}
