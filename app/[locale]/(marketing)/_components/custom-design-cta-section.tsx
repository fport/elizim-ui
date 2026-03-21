"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const showcaseImages = [
  { src: "/valentines-tshirt.jpg", alt: "Sevgililer günü tişört" },
  { src: "/birthday-hoodie.jpg", alt: "Doğum günü hoodie" },
  { src: "/wedding-couple.jpg", alt: "Düğün çift tişört" },
  { src: "/graduation-sweatshirt.jpg", alt: "Mezuniyet sweatshirt" },
];

export function CustomDesignCtaSection() {
  const t = useTranslations("customDesignCta");

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="liquid-blob absolute -right-24 -top-24 h-[300px] w-[300px] bg-primary/15"
              style={{ animation: "liquid-float 10s ease-in-out infinite" }}
            />
            <div
              className="liquid-blob absolute -bottom-20 -left-20 h-[250px] w-[250px] bg-accent/15"
              style={{ animation: "liquid-float-alt 12s ease-in-out infinite" }}
            />
          </div>

          <div className="relative grid items-center gap-0 lg:grid-cols-2">
            {/* Left — Content */}
            <div className="flex flex-col px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                {t("badge")}
              </div>

              <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t("title")}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("description")}
              </p>

              {/* Mini feature pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {(["feature1", "feature2", "feature3"] as const).map((key) => (
                  <span
                    key={key}
                    className="rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>

              <Link
                href="/ozel-tasarim"
                className="group mt-8 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                {t("cta")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right — Image mosaic */}
            <div className="relative hidden h-full min-h-[400px] lg:block">
              {/* Stacked, rotated card gallery */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3">
                  {showcaseImages.map((img, i) => (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        rotate: i % 2 === 0 ? -1 : 1,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                      className="relative overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 20vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile image strip */}
            <div className="flex gap-2.5 overflow-x-auto px-6 pb-8 scrollbar-none lg:hidden">
              {showcaseImages.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[3/4] w-36 shrink-0 overflow-hidden rounded-xl bg-muted shadow-md"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
