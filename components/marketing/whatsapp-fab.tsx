"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.316 22.612c-.39 1.1-1.932 2.014-3.178 2.28-.852.18-1.964.324-5.71-1.228-4.798-1.986-7.882-6.85-8.122-7.17-.228-.318-1.924-2.562-1.924-4.888 0-2.326 1.218-3.468 1.65-3.942.39-.428 1.026-.638 1.636-.638.198 0 .376.01.536.018.432.018.648.042 .934.724.354.85 1.218 2.972 1.326 3.19.108.218.216.51.066.81-.138.306-.258.498-.48.762-.216.264-.456.588-.648.79-.216.228-.444.476-.186.924.258.444 1.152 1.898 2.472 3.074 1.698 1.514 3.126 1.984 3.57 2.202.348.174.762.138 1.032-.156.342-.37.762-.984 1.19-1.59.306-.432.69-.486 1.074-.324.39.156 2.466 1.164 2.886 1.374.42.216.702.318.804.498.108.18.108 1.044-.282 2.146Z" />
    </svg>
  );
}

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
        "group fixed bottom-6 end-6 z-50",
        "flex items-center justify-center",
        "size-14 rounded-full",
        "shadow-lg transition-all duration-300",
        "bg-[#25D366] text-white",
        "hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        "animate-[whatsapp-bounce_2s_ease-in-out_infinite]",
        hovered && "animate-none",
      )}
      aria-label="WhatsApp"
    >
      {/* Outer pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-[whatsapp-ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-0"
        aria-hidden="true"
      />
      {/* Inner glow ring */}
      <span
        className="absolute inset-[-3px] rounded-full bg-[#25D366]/20 animate-[whatsapp-glow_2s_ease-in-out_infinite]"
        aria-hidden="true"
      />

      <WhatsAppIcon className="relative size-7 drop-shadow-sm" />

      {/* Tooltip label */}
      <span
        className={cn(
          "absolute end-[calc(100%+10px)] rounded-lg bg-gray-900 px-3 py-1.5",
          "whitespace-nowrap text-sm font-semibold text-white shadow-lg",
          "transition-all duration-200 ease-out",
          hovered
            ? "translate-x-0 opacity-100"
            : "translate-x-2 opacity-0 pointer-events-none",
        )}
      >
        {t("cta")}
      </span>
    </a>
  );
}
