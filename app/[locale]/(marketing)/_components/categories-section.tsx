"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { Scissors, Flower2, Gift, Waves, Heart, TableProperties } from "lucide-react";

const categories = [
  { slug: "nakis", icon: Scissors, nameKey: "Nakış" },
  { slug: "dantel", icon: Flower2, nameKey: "Dantel" },
  { slug: "bohca", icon: Gift, nameKey: "Bohça" },
  { slug: "havlu", icon: Waves, nameKey: "Havlu" },
  { slug: "ceyiz", icon: Heart, nameKey: "Çeyiz" },
  { slug: "ortu", icon: TableProperties, nameKey: "Örtü" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function CategoriesSection() {
  const t = useTranslations("categories");

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-6"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <motion.div key={cat.slug} variants={cardVariants}>
                <Link
                  href={{ pathname: "/urunler", query: { category: cat.slug } }}
                  className="glass-card group flex min-w-[140px] flex-col items-center gap-4 rounded-2xl p-6 sm:min-w-0"
                >
                  <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-7" />
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold">
                    {cat.nameKey}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
