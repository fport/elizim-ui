"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const highlightedProducts = [
  { key: "item1" as const, image: "/highligted-1.png", slug: "bohca" },
  { key: "item2" as const, image: "/highligted-2.png", slug: "dantel" },
  { key: "item3" as const, image: "/highligted-3.png", slug: "nakis" },
  { key: "item4" as const, image: "/highligted-4.png", slug: "havlu" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function FeaturedProductsSection() {
  const t = useTranslations("featured");

  return (
    <section className="py-16 sm:py-20">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              {t("subtitle")}
            </p>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/urunler"
            className="group hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Mobile: Horizontal snap-scroll carousel */}
      <div className="sm:hidden">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {highlightedProducts.map((item) => (
            <Link
              key={item.key}
              href={{ pathname: "/urunler", query: { category: item.slug } }}
              className="group relative w-[72vw] max-w-[300px] flex-shrink-0 snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-muted shadow-lg shadow-black/5">
                <Image
                  src={item.image}
                  alt={t(`${item.key}Name`)}
                  fill
                  sizes="72vw"
                  className="object-cover"
                />
                {/* visionOS-style frosted glass label */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/65 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-black/50">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {t(`${item.key}Cat`)}
                  </p>
                  <h3 className="mt-0.5 text-[15px] font-bold leading-snug text-foreground">
                    {t(`${item.key}Name`)}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Full-width CTA */}
        <div className="mt-6 px-4">
          <Link
            href="/urunler"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="mx-auto hidden max-w-7xl px-4 sm:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-5 lg:grid-cols-4"
        >
          {highlightedProducts.map((item) => (
            <motion.div key={item.key} variants={cardVariants}>
              <Link
                href={{ pathname: "/urunler", query: { category: item.slug } }}
                className="group relative block overflow-hidden rounded-[1.75rem] bg-muted shadow-lg shadow-black/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={t(`${item.key}Name`)}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Frosted glass label */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/65 px-4 py-3 backdrop-blur-2xl transition-transform duration-500 group-hover:-translate-y-1 dark:border-white/10 dark:bg-black/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(`${item.key}Cat`)}
                  </p>
                  <h3 className="mt-0.5 text-base font-bold text-foreground">
                    {t(`${item.key}Name`)}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
