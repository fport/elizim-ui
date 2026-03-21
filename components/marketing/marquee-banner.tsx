"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Gift, Truck, MessageCircle, Sparkles, Star } from "lucide-react";

const ICONS = [MessageCircle, Gift, Truck, Sparkles, Star] as const;

const MESSAGE_KEYS = [
  "whatsappOrder",
  "freeShipping",
  "handmadeQuality",
  "customDesign",
  "fastDelivery",
] as const;

export function MarqueeBanner() {
  const t = useTranslations("marqueeBanner");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY <= 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = MESSAGE_KEYS.map((key, i) => ({
    text: t(key),
    Icon: ICONS[i],
  }));

  // Duplicate items for seamless infinite scroll
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden bg-primary text-primary-foreground transition-all duration-300"
      style={{ maxHeight: visible ? 40 : 0, opacity: visible ? 1 : 0 }}
    >
      <div className="marquee-scroll flex w-max items-center gap-8 py-2">
        {repeatedItems.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 text-xs font-semibold sm:text-sm"
          >
            <item.Icon className="size-3.5 sm:size-4" />
            <span>{item.text}</span>
            <span className="ml-4 text-primary-foreground/40">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
