"use client";

import Image from "next/image";
import { CONFIG } from "@/data/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92svh] flex flex-col items-center justify-center overflow-hidden px-5 pb-10 pt-safe-top">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary opacity-[0.06] blur-[80px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-6 w-52 h-52 relative">
          <Image
            src="/images/logo.png"
            alt="Chez Zongo logo"
            fill
            className="object-contain filter invert"
            priority
            sizes="208px"
          />
        </div>

        {/* Tagline */}
        <p className="font-display text-sm tracking-[0.25em] uppercase text-primary mb-2">
          Street Food Premium
        </p>

        {/* Location badge */}
        <div className="flex items-center gap-1.5 mb-8">
          <svg
            className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-muted-foreground text-sm font-body">
            {CONFIG.location}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={scrollToMenu}
            className="btn-primary w-full py-4 px-8 rounded-card text-lg font-display tracking-wide tap-scale"
            aria-label="Voir le menu"
          >
            Voir le menu
          </button>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full py-4 px-8 rounded-card text-lg font-display tracking-wide tap-scale flex items-center justify-center gap-2"
            aria-label="Commander sur WhatsApp"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Commander sur WhatsApp
          </a>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToMenu}
          className="mt-12 flex flex-col items-center gap-1.5 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Défiler vers le menu"
        >
          <span className="text-xs font-body tracking-widest uppercase">
            Menu
          </span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
