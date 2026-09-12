import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/store/cart";
import { CONFIG } from "@/data/config";

// ── Fonts ──────────────────────────────────────────────────────
// Display font: bold, condensed — used for headings and prices
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// Body font: clean, readable sans-serif
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: CONFIG.seo.title,
  description: CONFIG.seo.description,
  keywords: [
    "Chez Zongo",
    "restaurant Oran",
    "street food Oran",
    "burgers Oran",
    "tacos Oran",
    "fast food Algérie",
    "menu digital",
  ],
  authors: [{ name: "Chez Zongo" }],
  creator: "Chez Zongo",
  metadataBase: new URL(CONFIG.seo.url),
  openGraph: {
    type: "website",
    url: CONFIG.seo.url,
    title: CONFIG.seo.title,
    description: CONFIG.seo.description,
    siteName: CONFIG.name,
    images: [{ url: CONFIG.seo.ogImage, width: 1200, height: 630 }],
    locale: "fr_DZ",
  },
  twitter: {
    card: "summary_large_image",
    title: CONFIG.seo.title,
    description: CONFIG.seo.description,
    images: [CONFIG.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FF5500",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Layout ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
