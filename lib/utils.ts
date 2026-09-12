import { CONFIG } from "@/data/config";
import type { BadgeType } from "@/data/menu";

/** Format price in Algerian Dinar. Returns empty string if price is undefined. */
export function formatPrice(amount: number | undefined): string {
  if (amount === undefined) return "";
  return `${amount.toLocaleString("fr-DZ")} ${CONFIG.currency}`;
}

/** Get badge display class */
export function getBadgeClass(badge: BadgeType): string {
  switch (badge) {
    case "BEST SELLER":
      return "badge-bestseller";
    case "NEW":
      return "badge-new";
    case "POPULAIRE":
      return "badge-populaire";
    default:
      return "badge-bestseller";
  }
}

/** Clamp quantity between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Generate a unique cart item key based on selections */
export function generateCartKey(
  itemId: string,
  selectedOptions: Record<string, string>
): string {
  const optStr = Object.entries(selectedOptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return optStr ? `${itemId}__${optStr}` : itemId;
}
