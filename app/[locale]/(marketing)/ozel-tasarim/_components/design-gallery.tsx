"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Heart,
  Cake,
  CalendarHeart,
  Baby,
  GraduationCap,
  PartyPopper,
  Gift,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateYourOwn } from "./create-your-own";

/* ── Occasion filter config ── */
const OCCASION_FILTERS = [
  { key: "all", icon: Filter },
  { key: "occasionValentines", icon: Heart },
  { key: "occasionBirthday", icon: Cake },
  { key: "occasionAnniversary", icon: CalendarHeart },
  { key: "occasionMothersDay", icon: Heart },
  { key: "occasionFathersDay", icon: Star },
  { key: "occasionWedding", icon: Gift },
  { key: "occasionGraduation", icon: GraduationCap },
  { key: "occasionNewYear", icon: PartyPopper },
  { key: "occasionBaby", icon: Baby },
] as const;

/* ── Showcase designs (admin tarafindan doldurulacak) ── */
interface ShowcaseDesign {
  id: string;
  image: string;
  occasion: string;
  clothing: string;
  title: string;
  description: string;
  price?: string;
}

const SHOWCASE_DESIGNS: ShowcaseDesign[] = [
  {
    id: "1",
    image: "/valentines-tshirt.jpg",
    occasion: "occasionValentines",
    clothing: "clothingTshirt",
    title: "Sevgililer Gunu Ozel Tisort",
    description: "Kisisellestirilmis isim ve tarih ile romantik kalp deseni",
    price: "349",
  },
  {
    id: "2",
    image: "/birthday-hoodie.jpg",
    occasion: "occasionBirthday",
    clothing: "clothingHoodie",
    title: "Dogum Gunu Surpriz Kapusonlu",
    description: "Yas ve isim ile ozel tasarım dogum gunu hediyesi",
    price: "549",
  },
  {
    id: "3",
    image: "/mothers-day-shirt.jpg",
    occasion: "occasionMothersDay",
    clothing: "clothingShirt",
    title: "Anneler Gunu Nakisli Gomlek",
    description: "El nakisi cicek desenleri ile anneye ozel gomlek",
    price: "449",
  },
  {
    id: "4",
    image: "/wedding-couple.jpg",
    occasion: "occasionWedding",
    clothing: "clothingTshirt",
    title: "Dugun Cift Tisort Seti",
    description: "Gelin & Damat isimleri ile ozel dugun hatirasi",
    price: "599",
  },
  {
    id: "5",
    image: "/graduation-sweatshirt.jpg",
    occasion: "occasionGraduation",
    clothing: "clothingSweatshirt",
    title: "Mezuniyet Hatirasi Sweatshirt",
    description: "Okul ismi ve yili ile mezuniyet hediyesi",
    price: "499",
  },
  {
    id: "6",
    image: "/baby-onesie.jpg",
    occasion: "occasionBaby",
    clothing: "clothingTshirt",
    title: "Bebek Hosgeldin Seti",
    description: "Bebek ismi ve dogum tarihi ile ozel baby shower hediyesi",
    price: "299",
  },
  {
    id: "7",
    image: "/fathers-day-polo.jpg",
    occasion: "occasionFathersDay",
    clothing: "clothingPolo",
    title: "Babalar Gunu Polo Yaka",
    description: "Super Baba yazili ozel nakis islemeli polo tisort",
    price: "399",
  },
  {
    id: "8",
    image: "/newyear-longsleeve.jpg",
    occasion: "occasionNewYear",
    clothing: "clothingLongSleeve",
    title: "Yeni Yil Kutlama Uzun Kollu",
    description: "Aile isimleri ile ozel yeni yil hatirasi",
    price: "429",
  },
  {
    id: "9",
    image: "/anniversary-crop.jpg",
    occasion: "occasionAnniversary",
    clothing: "clothingCrop",
    title: "Yildonumu Ozel Crop Top",
    description: "Cift isimleri ve yildonumu tarihi ile ozel tasarım",
    price: "329",
  },
];

export function DesignGallery() {
  const t = useTranslations("customDesign");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCreateOwn, setShowCreateOwn] = useState(false);
  const [prefillOccasion, setPrefillOccasion] = useState("");
  const [prefillClothing, setPrefillClothing] = useState("");

  const filtered =
    activeFilter === "all"
      ? SHOWCASE_DESIGNS
      : SHOWCASE_DESIGNS.filter((d) => d.occasion === activeFilter);

  function handleWantSimilar(design: ShowcaseDesign) {
    setPrefillOccasion(design.occasion);
    setPrefillClothing(design.clothing);
    setShowCreateOwn(true);
  }

  function handleCreateOwn() {
    setPrefillOccasion("");
    setPrefillClothing("");
    setShowCreateOwn(true);
  }

  return (
    <div>
      {/* ── CTA: Kendim Olusturmak Istiyorum ── */}
      <div className="mb-16">
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
          {/* Decorative blobs */}
          <div className="absolute -end-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-10 -start-10 size-32 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-start">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:size-24">
              <Wand2 className="size-10 text-primary sm:size-12" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("createYourOwn")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                {t("createYourOwnDescription")}
              </p>
            </div>
            <button
              onClick={handleCreateOwn}
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
      </div>

      {/* ── Inspiration Section ── */}
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          {t("inspirationTitle")}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("inspirationSubtitle")}
        </p>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {OCCASION_FILTERS.map((f) => {
          const Icon = f.icon;
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              <Icon className="size-3.5" />
              {f.key === "all" ? t("filterAll") : t(f.key)}
            </button>
          );
        })}
      </div>

      {/* Design grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((design) => (
            <motion.div
              key={design.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card group overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {design.image ? (
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-2 size-10 text-primary/30" />
                      <span className="text-xs text-muted-foreground">
                        {t(design.clothing as Parameters<typeof t>[0])}
                      </span>
                    </div>
                  </div>
                )}
                {/* Occasion badge */}
                <span className="absolute start-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
                  {t(design.occasion as Parameters<typeof t>[0])}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-heading text-base font-bold">
                  {design.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {design.description}
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
                    onClick={() => handleWantSimilar(design)}
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

      {/* Create Your Own Modal/Wizard */}
      <AnimatePresence>
        {showCreateOwn && (
          <CreateYourOwn
            onClose={() => setShowCreateOwn(false)}
            initialOccasion={prefillOccasion}
            initialClothing={prefillClothing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
