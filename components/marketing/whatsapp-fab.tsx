"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

export function WhatsAppFab() {
  const [hovered, setHovered] = useState(false);
  const t = useTranslations("contactCta");

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "fixed bottom-6 end-6 z-50 flex items-center gap-2",
        "rounded-full shadow-lg transition-all duration-300",
        "bg-[var(--whatsapp)] text-white",
        "hover:scale-105 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--whatsapp)] focus-visible:ring-offset-2",
      )}
      aria-label="WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-[var(--whatsapp)]",
          "animate-ping opacity-30",
        )}
        aria-hidden="true"
      />

      <span className="relative flex items-center gap-2 px-4 py-3">
        <MessageCircle className="size-6" />
        {hovered && (
          <span className="whitespace-nowrap text-sm font-medium animate-in fade-in slide-in-from-end-2 duration-200">
            {t("cta")}
          </span>
        )}
      </span>
    </a>
  );
}
