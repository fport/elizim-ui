"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Hand, Truck, Palette, ShieldCheck } from "lucide-react";

const trustItems = [
  { key: "handmade" as const, icon: Hand },
  { key: "custom" as const, icon: Palette },
  { key: "shipping" as const, icon: Truck },
  { key: "secure" as const, icon: ShieldCheck },
];

export function TrustStripSection() {
  const t = useTranslations("trustStrip");

  return (
    <section className="border-y border-border/60 bg-muted/30 px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 sm:gap-12 md:justify-between"
      >
        {trustItems.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2.5">
            <Icon className="size-5 text-primary/70" strokeWidth={1.5} />
            <span className="text-sm font-medium text-muted-foreground">
              {t(key)}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
