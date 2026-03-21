"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type PromoVariant = "spring" | "gift" | "flash";

interface PromoBannerSectionProps {
  variant?: PromoVariant;
}

function EditorialBanner({
  badge,
  headline,
  highlight,
  sub,
  cta,
  ctaHref,
  theme,
}: {
  badge: string;
  headline: string;
  highlight: string;
  sub: string;
  cta: string;
  ctaHref: string;
  theme: "warm" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isDark
          ? "bg-foreground text-background dark:bg-card dark:text-foreground"
          : "bg-primary/5 text-foreground dark:bg-primary/10",
      )}
    >
      {/* Decorative oversized text in background */}
      <div
        className="pointer-events-none absolute -right-[5%] top-1/2 -translate-y-1/2 select-none font-heading text-[12rem] font-black leading-none opacity-[0.03] sm:text-[18rem]"
        aria-hidden="true"
      >
        {highlight}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-14 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-xl"
        >
          {/* Small label */}
          <span
            className={cn(
              "mb-3 inline-block border-b-2 pb-0.5 text-[11px] font-bold uppercase tracking-[0.2em]",
              isDark
                ? "border-primary text-primary dark:border-primary dark:text-primary"
                : "border-foreground/30 text-foreground/60",
            )}
          >
            {badge}
          </span>

          {/* Big headline with highlight */}
          <h3 className="font-heading text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl lg:text-4xl">
            {headline}{" "}
            <span
              className={cn(
                "italic",
                isDark ? "text-primary" : "text-primary",
              )}
            >
              {highlight}
            </span>
          </h3>

          <p
            className={cn(
              "mt-3 text-sm leading-relaxed sm:text-base",
              isDark
                ? "text-background/60 dark:text-muted-foreground"
                : "text-muted-foreground",
            )}
          >
            {sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href={ctaHref as never}
            className={cn(
              "group relative inline-flex items-center gap-3 overflow-hidden rounded-none border-2 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300",
              isDark
                ? "border-background text-background hover:bg-background hover:text-foreground dark:border-foreground dark:text-foreground dark:hover:bg-foreground dark:hover:text-background"
                : "border-foreground text-foreground hover:bg-foreground hover:text-background",
            )}
          >
            {cta}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const variantConfig = {
  spring: { theme: "warm" as const },
  gift: { theme: "dark" as const },
  flash: { theme: "warm" as const },
};

export function PromoBannerSection({
  variant = "spring",
}: PromoBannerSectionProps) {
  const t = useTranslations("promoSection");
  const config = variantConfig[variant];

  return (
    <EditorialBanner
      badge={t(`${variant}.badge`)}
      headline={t(`${variant}.title`)}
      highlight={t(`${variant}.highlight`)}
      sub={t(`${variant}.description`)}
      cta={t(`${variant}.cta`)}
      ctaHref="/urunler"
      theme={config.theme}
    />
  );
}
