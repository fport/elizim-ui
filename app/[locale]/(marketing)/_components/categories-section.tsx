"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  { slug: "nakis", nameKey: "Nakış", image: "/hero-2.png" },
  { slug: "dantel", nameKey: "Dantel", image: "/hero-7.png" },
  { slug: "bohca", nameKey: "Bohça", image: "/hero-1.png" },
  { slug: "havlu", nameKey: "Havlu", image: "/highligted-4.png" },
  { slug: "ceyiz", nameKey: "Çeyiz", image: "/hero-6.png" },
  { slug: "ortu", nameKey: "Örtü", image: "/hero-8.png" },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function CategoriesSection() {
  const t = useTranslations("categories");

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {t("subtitle")}
          </p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Category grid - visual cards with images */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div key={cat.slug} variants={cardVariants}>
              <Link
                href={{ pathname: "/urunler", query: { category: cat.slug } }}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={cat.image}
                  alt={cat.nameKey}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors group-hover:from-black/70" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                  <span className="font-heading text-lg font-bold text-white sm:text-xl">
                    {cat.nameKey}
                  </span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
