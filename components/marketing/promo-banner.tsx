"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { X, Megaphone } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { PromoBanner as PromoBannerType } from "@/lib/api";

interface PromoBannerProps {
  banner: PromoBannerType;
}

export function PromoBanner({ banner }: PromoBannerProps) {
  const t = useTranslations("promoBanner");
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "relative flex items-center justify-center gap-3 px-4 py-2.5 text-sm",
              banner.bgColor || "bg-primary text-primary-foreground",
            )}
          >
            <Megaphone className="size-4 shrink-0" />

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center">
              {banner.badgeText && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {banner.badgeText}
                </span>
              )}
              <span className="font-semibold">{banner.title}</span>
              {banner.description && (
                <span className="hidden opacity-90 sm:inline">
                  — {banner.description}
                </span>
              )}
              {banner.linkUrl && banner.linkText && (
                <Link
                  href={banner.linkUrl as never}
                  className="inline-flex items-center gap-1 font-bold underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  {banner.linkText}
                </Link>
              )}
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-white/20"
              aria-label={t("dismiss")}
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
