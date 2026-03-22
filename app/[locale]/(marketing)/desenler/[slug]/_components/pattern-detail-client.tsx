"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileType,
  Palette,
  Ruler,
  Hash,
  BarChart3,
  Download,
  Info,
} from "lucide-react";
import { patternsApi, type Pattern } from "@/lib/api";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const TECHNIQUE_COLORS: Record<string, string> = {
  "Maraş İşi": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "Kanaviçe": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Logo": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export function PatternDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("patterns");
  const tCommon = useTranslations("common");
  const [activeImage, setActiveImage] = useState(0);

  const { data: patternData, isLoading } = useQuery({
    queryKey: ["pattern", slug],
    queryFn: async () => {
      const response = await patternsApi.getBySlug(slug);
      return response.pattern;
    },
    retry: false,
  });

  const { data: allPatternsRes } = useQuery({
    queryKey: ["patterns"],
    queryFn: () => patternsApi.getAll(),
  });

  const pattern = patternData;

  const relatedPatterns = useMemo(() => {
    if (!allPatternsRes?.patterns || !pattern) return [];
    return allPatternsRes.patterns
      .filter((p) => p.id !== pattern.id)
      .slice(0, 4);
  }, [allPatternsRes, pattern]);

  const parsedImages: string[] = useMemo(() => {
    if (!pattern?.images) return [];
    try {
      const parsed = JSON.parse(pattern.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [pattern?.images]);

  const images = useMemo(() => {
    if (parsedImages.length > 0) return parsedImages;
    if (pattern?.previewImageUrl) return [pattern.previewImageUrl];
    return ["/images/placeholder-product.jpg"];
  }, [parsedImages, pattern?.previewImageUrl]);

  if (isLoading || !pattern) {
    return (
      <section className="px-4 py-8 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-4 w-24 rounded skeleton-shimmer" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="aspect-square rounded-2xl skeleton-shimmer" />
            <div className="space-y-4">
              <div className="h-6 w-20 rounded-full skeleton-shimmer" />
              <div className="h-10 w-3/4 rounded skeleton-shimmer" />
              <div className="h-8 w-1/3 rounded skeleton-shimmer" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl skeleton-shimmer" />
                ))}
              </div>
              <div className="h-14 w-full rounded-full skeleton-shimmer" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formattedPrice = (pattern.price / 100).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
  });
  const formats = pattern.formats.split(",").map((f) => f.trim());
  const whatsappMessage = `Merhaba! "${pattern.title}" nakis deseniyle ilgileniyorum. Siparis vermek istiyorum.`;

  function handlePrevImage() {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <section className="px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <Link
          href="/desenler"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("backToPatterns")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery with protection */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[activeImage] || "/images/placeholder-product.jpg"}
                    alt={pattern.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    priority
                  />
                  {/* Watermark overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <span className="rotate-[-30deg] select-none text-3xl font-bold text-white/15 sm:text-4xl">
                      elizim.art
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5 text-foreground" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all",
                      i === activeImage
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${pattern.title} - ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      style={{ pointerEvents: "none", userSelect: "none" }}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div
                      className="absolute inset-0"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pattern info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Difficulty badge */}
            {pattern.difficulty && (
              <span
                className={cn(
                  "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                  TECHNIQUE_COLORS[pattern.difficulty] || "bg-muted text-foreground",
                )}
              >
                {pattern.difficulty}
              </span>
            )}

            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              {pattern.title}
            </h1>

            <p className="mt-4 text-3xl font-bold text-primary">
              {formattedPrice} {tCommon("currency")}
            </p>

            {/* Format badges */}
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                {t("formats")}
              </p>
              <div className="flex flex-wrap gap-2">
                {formats.map((fmt) => (
                  <span
                    key={fmt}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium"
                  >
                    <FileType className="size-4 text-primary" />
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Pattern specs */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {pattern.stitchCount && (
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Hash className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("stitchCount")}</p>
                    <p className="font-semibold">{pattern.stitchCount.toLocaleString("tr-TR")}</p>
                  </div>
                </div>
              )}
              {pattern.dimensions && (
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Ruler className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("dimensions")}</p>
                    <p className="font-semibold">{pattern.dimensions}</p>
                  </div>
                </div>
              )}
              {pattern.colorCount && (
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Palette className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("colorCount")}</p>
                    <p className="font-semibold">{pattern.colorCount}</p>
                  </div>
                </div>
              )}
              {pattern.difficulty && (
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <BarChart3 className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("technique")}</p>
                    <p className="font-semibold">{pattern.difficulty}</p>
                  </div>
                </div>
              )}
              {pattern.downloadCount > 0 && (
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Download className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t("downloads")}</p>
                    <p className="font-semibold">{pattern.downloadCount}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {pattern.description && (
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {pattern.description.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}

            {/* Digital note */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/30">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("digitalNote")}
              </p>
            </div>

            {/* WhatsApp order button */}
            <div className="mt-8">
              <a
                href={buildWhatsAppUrl(undefined, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                <MessageCircle className="size-5" />
                {t("orderWhatsapp")}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Related patterns */}
        {relatedPatterns.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 font-heading text-2xl font-bold">
              {t("relatedPatterns")}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {relatedPatterns.map((p, index) => {
                const pPrice = (p.price / 100).toLocaleString("tr-TR");
                const pFormats = p.formats.split(",").map((f) => f.trim());
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.05, 0.3),
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={{ pathname: "/desenler/[slug]", params: { slug: p.slug } }}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl",
                        "bg-card border border-border/50",
                        "transition-all duration-300",
                        "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
                        "hover:-translate-y-0.5",
                        "active:scale-[0.98]",
                      )}
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted/30">
                        <Image
                          src={p.previewImageUrl || "/images/placeholder-product.jpg"}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <span className="rotate-[-30deg] select-none text-xl font-bold text-white/15">
                            elizim.art
                          </span>
                        </div>
                        {p.difficulty && (
                          <span
                            className={cn(
                              "absolute top-2 start-2 z-10",
                              "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                              "text-[10px] font-bold uppercase tracking-wider",
                              "backdrop-blur-md shadow-sm",
                              TECHNIQUE_COLORS[p.difficulty] || "bg-muted text-foreground",
                            )}
                          >
                            <BarChart3 className="size-3" />
                            {p.difficulty}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1.5 p-3">
                        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground sm:text-sm">
                          {p.title}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {pFormats.map((fmt) => (
                            <span
                              key={fmt}
                              className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                              <FileType className="size-2.5" />
                              {fmt}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto flex items-baseline gap-1.5 pt-1">
                          <span className="text-base font-bold text-foreground sm:text-lg">
                            {pPrice}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {tCommon("currency")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
