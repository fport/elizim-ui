"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/routing";
import { CreateYourOwn } from "../../_components/create-your-own";

interface ShowcaseDesign {
  id: string;
  image: string;
  occasion: string;
  clothing: string;
  titleKey: string;
  descKey: string;
  price?: string;
}

const ALL_DESIGNS: ShowcaseDesign[] = [
  { id: "1", image: "/valentines-tshirt.jpg", occasion: "occasionValentines", clothing: "clothingTshirt", titleKey: "design1Title", descKey: "design1Desc", price: "349" },
  { id: "2", image: "/birthday-hoodie.jpg", occasion: "occasionBirthday", clothing: "clothingHoodie", titleKey: "design2Title", descKey: "design2Desc", price: "549" },
  { id: "3", image: "/mothers-day-shirt.jpg", occasion: "occasionMothersDay", clothing: "clothingShirt", titleKey: "design3Title", descKey: "design3Desc", price: "449" },
  { id: "4", image: "/wedding-couple.jpg", occasion: "occasionWedding", clothing: "clothingTshirt", titleKey: "design4Title", descKey: "design4Desc", price: "599" },
  { id: "5", image: "/graduation-sweatshirt.jpg", occasion: "occasionGraduation", clothing: "clothingSweatshirt", titleKey: "design5Title", descKey: "design5Desc", price: "499" },
  { id: "6", image: "/baby-onesie.jpg", occasion: "occasionBaby", clothing: "clothingTshirt", titleKey: "design6Title", descKey: "design6Desc", price: "299" },
  { id: "7", image: "/fathers-day-polo.jpg", occasion: "occasionFathersDay", clothing: "clothingPolo", titleKey: "design7Title", descKey: "design7Desc", price: "399" },
  { id: "8", image: "/newyear-longsleeve.jpg", occasion: "occasionNewYear", clothing: "clothingLongSleeve", titleKey: "design8Title", descKey: "design8Desc", price: "429" },
  { id: "9", image: "/anniversary-crop.jpg", occasion: "occasionAnniversary", clothing: "clothingCrop", titleKey: "design9Title", descKey: "design9Desc", price: "329" },
];

interface OccasionPageClientProps {
  slug: string;
  occasionKey: string;
}

export function OccasionPageClient({ slug, occasionKey }: OccasionPageClientProps) {
  const t = useTranslations("customDesign");
  const tp = useTranslations("occasionPages");
  const [showCreateOwn, setShowCreateOwn] = useState(false);

  const filtered = ALL_DESIGNS.filter((d) => d.occasion === occasionKey);
  const seoKey = slug as Parameters<typeof tp>[0];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="liquid-blob -top-20 left-1/4 h-72 w-72 bg-primary/20" />
        <div
          className="liquid-blob -bottom-10 right-1/4 h-56 w-56 bg-accent/30"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {t(occasionKey as Parameters<typeof t>[0])}
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {tp(`${seoKey}.heroTitle` as Parameters<typeof tp>[0])}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {tp(`${seoKey}.heroDescription` as Parameters<typeof tp>[0])}
          </p>
        </div>
      </section>

      {/* CTA: Kendim Olusturmak Istiyorum */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "relative overflow-hidden rounded-3xl",
            "bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5",
            "border border-primary/15 p-8 sm:p-10",
          )}
        >
          <div className="absolute -end-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-10 -start-10 size-32 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-start">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:size-24">
              <Wand2 className="size-10 text-primary sm:size-12" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {tp(`${seoKey}.ctaTitle` as Parameters<typeof tp>[0])}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                {tp(`${seoKey}.ctaDescription` as Parameters<typeof tp>[0])}
              </p>
            </div>
            <button
              onClick={() => setShowCreateOwn(true)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-2xl px-7 py-3.5",
                "bg-primary text-sm font-semibold text-primary-foreground",
                "transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25",
                "active:scale-[0.97]",
              )}
            >
              {t("createYourOwnCta")}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Filtered designs */}
      {filtered.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold sm:text-3xl">
            {tp(`${seoKey}.galleryTitle` as Parameters<typeof tp>[0])}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((design) => (
                <motion.div
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card group overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={design.image}
                      alt={tp(`${seoKey}.heroTitle` as Parameters<typeof tp>[0])}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-base font-bold">
                      {t(design.titleKey as Parameters<typeof t>[0])}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {t(design.descKey as Parameters<typeof t>[0])}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      {design.price && (
                        <span className="text-xs text-muted-foreground">
                          {t("startingFrom")}{" "}
                          <span className="text-base font-bold text-foreground">
                            {design.price} TL
                          </span>
                        </span>
                      )}
                      <button
                        onClick={() => setShowCreateOwn(true)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2",
                          "bg-primary/10 text-xs font-medium text-primary",
                          "transition-all hover:bg-primary/20",
                        )}
                      >
                        {t("wantSimilar")}
                        <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* WhatsApp CTA */}
      <section className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6">
        <a
          href={buildWhatsAppUrl(undefined, tp(`${seoKey}.whatsappMessage` as Parameters<typeof tp>[0]))}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-2xl px-8 py-4",
            "bg-[color:var(--whatsapp)] text-base font-semibold text-white",
            "transition-all hover:opacity-90 hover:shadow-xl",
          )}
        >
          <MessageCircle className="size-5" />
          {t("orderViaWhatsapp")}
        </a>
      </section>

      {/* SEO Content */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {tp(`${seoKey}.seoTitle` as Parameters<typeof tp>[0])}
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>{tp(`${seoKey}.seoP1` as Parameters<typeof tp>[0])}</p>
            <p>{tp(`${seoKey}.seoP2` as Parameters<typeof tp>[0])}</p>
            <p>{tp(`${seoKey}.seoP3` as Parameters<typeof tp>[0])}</p>
          </div>

          {/* Internal links to other occasions */}
          <div className="mt-10">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {tp("otherOccasions")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { s: "sevgililer-gunu", k: "occasionValentines" },
                { s: "dogum-gunu", k: "occasionBirthday" },
                { s: "yildonumu", k: "occasionAnniversary" },
                { s: "anneler-gunu", k: "occasionMothersDay" },
                { s: "babalar-gunu", k: "occasionFathersDay" },
                { s: "dugun", k: "occasionWedding" },
                { s: "mezuniyet", k: "occasionGraduation" },
                { s: "yeni-yil", k: "occasionNewYear" },
                { s: "bebek", k: "occasionBaby" },
              ]
                .filter((o) => o.s !== slug)
                .map((o) => (
                  <Link
                    key={o.s}
                    href={{ pathname: "/ozel-tasarim/[slug]", params: { slug: o.s } }}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {t(o.k as Parameters<typeof t>[0])}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Create Your Own Modal */}
      <AnimatePresence>
        {showCreateOwn && (
          <CreateYourOwn
            onClose={() => setShowCreateOwn(false)}
            initialOccasion={occasionKey}
            initialClothing=""
          />
        )}
      </AnimatePresence>
    </main>
  );
}
