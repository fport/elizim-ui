"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-24">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/15 blur-[80px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          variants={childVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
        >
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          Elizim.art
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={childVariants}
          className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={childVariants}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={childVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/urunler"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/hakkimizda"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-8 py-4 text-base font-semibold transition-all hover:bg-muted"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        {/* Decorative bottom element */}
        <motion.div
          variants={childVariants}
          className="mt-16 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-border" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-1.5 rounded-full bg-primary/40"
              />
            ))}
          </div>
          <div className="h-px w-12 bg-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}
