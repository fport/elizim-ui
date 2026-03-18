"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Gem, Palette, Truck } from "lucide-react";

const features = [
  { key: "quality" as const, icon: Gem },
  { key: "design" as const, icon: Palette },
  { key: "delivery" as const, icon: Truck },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
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

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {features.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="glass-card flex flex-col items-center gap-5 rounded-2xl p-8 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
