"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppURL } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } =
    useCart();

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  const whatsappURL = generateWhatsAppURL(items);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 overlay animate-fade-in"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Votre commande"
        className={`
          fixed top-0 right-0 z-50 h-full w-full max-w-sm
          bg-card border-l border-border
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          safe-bottom
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Votre commande
            </h2>
            <p className="text-muted-foreground text-xs font-body mt-0.5">
              {totalItems} article{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
            aria-label="Fermer le panier"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                Panier vide
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                Ajoutez des articles depuis le menu pour commencer votre commande.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-3 rounded-card border border-border text-sm font-body text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                Voir le menu
              </button>
            </div>
          ) : (
            <ul className="space-y-3" aria-label="Articles dans le panier">
              {items.map((cartItem) => (
                <li
                  key={cartItem.cartKey}
                  className="flex gap-3 bg-card-hover rounded-xl p-3 border border-border"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    {cartItem.image ? (
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-2xl">🍔</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-foreground leading-tight">
                      {cartItem.name}
                    </h4>
                    {Object.keys(cartItem.selectedOptions).length > 0 && (
                      <p className="text-muted-foreground text-xs font-body mt-0.5">
                        {Object.values(cartItem.selectedOptions).join(", ")}
                      </p>
                    )}
                    {cartItem.selectedExtras.length > 0 && (
                      <p className="text-muted-foreground text-xs font-body">
                        + {cartItem.selectedExtras.join(", ")}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display font-bold text-primary text-sm">
                        {formatPrice(cartItem.totalPrice * cartItem.quantity)}
                      </span>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(cartItem.cartKey, cartItem.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          aria-label="Retirer un"
                        >
                          {cartItem.quantity === 1 ? (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          )}
                        </button>
                        <span className="w-6 text-center text-xs font-display font-bold text-foreground">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(cartItem.cartKey, cartItem.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          aria-label="Ajouter un"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(cartItem.cartKey)}
                    className="flex-shrink-0 self-start w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
                    aria-label={`Supprimer ${cartItem.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with total + checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border flex-shrink-0 safe-bottom">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-muted-foreground text-sm">
                {items.some((i) => i.priceUnknown) ? "Total partiel" : "Total"}
              </span>
              <span className="font-display font-bold text-xl text-foreground">
                {totalPrice > 0 ? formatPrice(totalPrice) : "—"}
              </span>
            </div>
            {items.some((i) => i.priceUnknown) && (
              <p className="text-xs text-muted-foreground font-body mb-3">
                Certains articles n&apos;ont pas encore de prix — ils seront confirmés par le restaurant.
              </p>
            )}

            {/* WhatsApp checkout */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 rounded-card flex items-center justify-center gap-2 text-base font-display tracking-wide tap-scale"
              aria-label="Commander sur WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Commander sur WhatsApp
            </a>

            <p className="text-center text-muted-foreground text-xs font-body mt-2">
              Vous serez redirigé vers WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}
