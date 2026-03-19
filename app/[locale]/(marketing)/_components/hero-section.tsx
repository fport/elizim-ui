"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

const heroCategories = [
  { key: "cat1" as const, slug: "nakis", image: "/hero-2.png" },
  { key: "cat2" as const, slug: "dantel", image: "/hero-7.png" },
  { key: "cat3" as const, slug: "bohca", image: "/hero-1.png" },
  { key: "cat4" as const, slug: "ortu", image: "/hero-4.png" },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden px-4 py-6 sm:py-16 lg:py-20">
      {/* Liquid blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="liquid-blob absolute -left-20 top-1/4 h-[500px] w-[500px] bg-primary/8"
          style={{ animation: "liquid-float 8s ease-in-out infinite" }}
        />
        <div
          className="liquid-blob absolute -right-20 bottom-1/3 h-[400px] w-[400px] bg-primary/5"
          style={{ animation: "liquid-float-alt 10s ease-in-out infinite" }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text — compact on mobile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1
              variants={childVariants}
              className="font-heading text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="mt-4 hidden max-w-lg text-base text-muted-foreground sm:block sm:text-lg"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={childVariants} className="mt-5 sm:mt-8">
              <Link
                href="/urunler"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Bento product grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid min-h-[50vh] grid-cols-2 grid-rows-3 gap-2.5 sm:min-h-[420px] sm:gap-4"
          >
            {/* Large left — spans 2 rows */}
            <motion.div variants={imageVariants} className="col-span-1 row-span-2">
              <Link
                href={{ pathname: "/urunler", query: { category: heroCategories[0].slug } }}
                className="group relative block h-full overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={heroCategories[0].image}
                  alt={t(heroCategories[0].key)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm dark:bg-white/15 dark:text-white">
                  {t(heroCategories[0].key)}
                </span>
              </Link>
            </motion.div>

            {/* Top right */}
            <motion.div variants={imageVariants} className="col-span-1 row-span-1">
              <Link
                href={{ pathname: "/urunler", query: { category: heroCategories[1].slug } }}
                className="group relative block h-full min-h-[100px] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={heroCategories[1].image}
                  alt={t(heroCategories[1].key)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm dark:bg-white/15 dark:text-white">
                  {t(heroCategories[1].key)}
                </span>
              </Link>
            </motion.div>

            {/* Middle right */}
            <motion.div variants={imageVariants} className="col-span-1 row-span-1">
              <Link
                href={{ pathname: "/urunler", query: { category: heroCategories[2].slug } }}
                className="group relative block h-full min-h-[100px] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={heroCategories[2].image}
                  alt={t(heroCategories[2].key)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm dark:bg-white/15 dark:text-white">
                  {t(heroCategories[2].key)}
                </span>
              </Link>
            </motion.div>

            {/* Bottom full width */}
            <motion.div variants={imageVariants} className="col-span-2 row-span-1">
              <Link
                href={{ pathname: "/urunler", query: { category: heroCategories[3].slug } }}
                className="group relative block h-full min-h-[100px] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={heroCategories[3].image}
                  alt={t(heroCategories[3].key)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm dark:bg-white/15 dark:text-white">
                  {t(heroCategories[3].key)}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
