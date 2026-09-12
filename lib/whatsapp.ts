// ============================================================
// CHEZ ZONGO — WhatsApp Order URL Generator
// ============================================================

import { CONFIG } from "@/data/config";
import type { CartItem } from "@/store/cart";

/** Format a single cart item line for the WhatsApp message */
function formatCartLine(item: CartItem): string {
  const lines: string[] = [];

  let itemLine = `• ${item.name} ×${item.quantity}`;

  if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
    const opts = Object.values(item.selectedOptions).join(", ");
    itemLine += ` (${opts})`;
  }
  lines.push(itemLine);

  if (item.selectedExtras && item.selectedExtras.length > 0) {
    lines.push(`  + ${item.selectedExtras.join(", ")}`);
  }

  // Only show price line if price is known
  if (!item.priceUnknown && item.totalPrice > 0) {
    lines.push(
      `  ${(item.totalPrice * item.quantity).toLocaleString("fr-DZ")} ${CONFIG.currency}`
    );
  } else {
    lines.push(`  Prix à confirmer`);
  }

  return lines.join("\n");
}

/** Generate WhatsApp checkout URL from cart items */
export function generateWhatsAppURL(cartItems: CartItem[]): string {
  if (cartItems.length === 0) return "#";

  const knownTotal = cartItems
    .filter((i) => !i.priceUnknown)
    .reduce((sum, i) => sum + i.totalPrice * i.quantity, 0);

  const hasMissingPrices = cartItems.some((i) => i.priceUnknown);

  const itemLines = cartItems.map(formatCartLine).join("\n\n");

  const totalLine = hasMissingPrices
    ? `*TOTAL : ${knownTotal.toLocaleString("fr-DZ")} ${CONFIG.currency} + articles à confirmer*`
    : `*TOTAL : ${knownTotal.toLocaleString("fr-DZ")} ${CONFIG.currency}*`;

  const message = [
    `🍔 *${CONFIG.name}* — Nouvelle Commande`,
    `──────────────────`,
    itemLines,
    `──────────────────`,
    totalLine,
    ``,
    `📍 ${CONFIG.location}`,
    ``,
    `_Merci de confirmer ma commande !_`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
}

/** Simple WhatsApp link (no pre-filled message) */
export function getWhatsAppLink(): string {
  return `https://wa.me/${CONFIG.whatsappNumber}`;
}
