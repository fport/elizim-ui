"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  Heart,
  Cake,
  CalendarHeart,
  Baby,
  GraduationCap,
  PartyPopper,
  Gift,
  Sparkles,
  Star,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  X,
  Palette,
  Brush,
  User,
  MessageSquare,
  StickyNote,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Step = "occasion" | "clothing" | "personalize" | "result";
const STEPS: Step[] = ["occasion", "clothing", "personalize", "result"];

const OCCASIONS = [
  { key: "occasionValentines", icon: Heart, color: "text-red-500" },
  { key: "occasionBirthday", icon: Cake, color: "text-amber-500" },
  { key: "occasionAnniversary", icon: CalendarHeart, color: "text-pink-500" },
  { key: "occasionMothersDay", icon: Heart, color: "text-rose-400" },
  { key: "occasionFathersDay", icon: Star, color: "text-blue-500" },
  { key: "occasionWedding", icon: Gift, color: "text-purple-500" },
  { key: "occasionGraduation", icon: GraduationCap, color: "text-indigo-500" },
  { key: "occasionNewYear", icon: PartyPopper, color: "text-yellow-500" },
  { key: "occasionBaby", icon: Baby, color: "text-sky-400" },
  { key: "occasionCustom", icon: HelpCircle, color: "text-muted-foreground" },
] as const;

const CLOTHING_TYPES = [
  { key: "clothingTshirt", emoji: "👕" },
  { key: "clothingPolo", emoji: "🎽" },
  { key: "clothingShirt", emoji: "👔" },
  { key: "clothingHoodie", emoji: "🧥" },
  { key: "clothingSweatshirt", emoji: "🧤" },
  { key: "clothingTankTop", emoji: "🩱" },
  { key: "clothingLongSleeve", emoji: "🥋" },
  { key: "clothingCrop", emoji: "👚" },
] as const;

const COLORS = [
  { key: "colorRed", value: "bg-red-500" },
  { key: "colorPink", value: "bg-pink-400" },
  { key: "colorBlack", value: "bg-gray-900 dark:bg-gray-100" },
  { key: "colorWhite", value: "bg-white border-2 border-gray-200" },
  { key: "colorNavy", value: "bg-blue-900" },
  { key: "colorGreen", value: "bg-emerald-500" },
  { key: "colorPastel", value: "bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200" },
  { key: "colorEarthy", value: "bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700" },
] as const;

const STYLES = [
  { key: "styleMinimal", icon: Sparkles },
  { key: "styleRomantic", icon: Heart },
  { key: "styleRetro", icon: Star },
  { key: "styleFun", icon: PartyPopper },
  { key: "styleElegant", icon: Gift },
  { key: "styleArtistic", icon: Brush },
] as const;

interface DesignState {
  occasion: string;
  clothing: string;
  recipientName: string;
  specialMessage: string;
  color: string;
  style: string;
  additionalNotes: string;
}

interface CreateYourOwnProps {
  onClose: () => void;
  initialOccasion?: string;
  initialClothing?: string;
}

export function CreateYourOwn({
  onClose,
  initialOccasion = "",
  initialClothing = "",
}: CreateYourOwnProps) {
  const t = useTranslations("customDesign");

  const hasPreselection = !!(initialOccasion && initialClothing);
  const [step, setStep] = useState<Step>(
    hasPreselection ? "personalize" : initialOccasion ? "clothing" : "occasion",
  );
  const [design, setDesign] = useState<DesignState>({
    occasion: initialOccasion,
    clothing: initialClothing,
    recipientName: "",
    specialMessage: "",
    color: "",
    style: "",
    additionalNotes: "",
  });

  const currentIndex = STEPS.indexOf(step);
  const canGoNext =
    (step === "occasion" && design.occasion) ||
    (step === "clothing" && design.clothing) ||
    step === "personalize";

  const goNext = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }, [step]);

  const generateWhatsAppMessage = useCallback(() => {
    const occasionLabel = design.occasion
      ? t(design.occasion as Parameters<typeof t>[0])
      : "";
    const clothingLabel = design.clothing
      ? t(design.clothing as Parameters<typeof t>[0])
      : "";
    const colorLabel = design.color
      ? t(design.color as Parameters<typeof t>[0])
      : "";
    const styleLabel = design.style
      ? t(design.style as Parameters<typeof t>[0])
      : "";

    const lines = [
      "Merhaba! Kendime ozel bir tasarım yaptirmak istiyorum:",
      "",
      `Ozel Gun: ${occasionLabel}`,
      `Kiyafet: ${clothingLabel}`,
      design.recipientName ? `Kime: ${design.recipientName}` : "",
      design.specialMessage ? `Mesaj: "${design.specialMessage}"` : "",
      colorLabel ? `Renk: ${colorLabel}` : "",
      styleLabel ? `Stil: ${styleLabel}` : "",
      design.additionalNotes ? `Ek Not: ${design.additionalNotes}` : "",
      "",
      "Detaylar icin gorusmek isterim!",
    ];

    return lines.filter(Boolean).join("\n");
  }, [design, t]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="relative mx-4 my-8 w-full max-w-3xl rounded-3xl border border-border bg-background p-6 shadow-2xl sm:my-16 sm:p-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute end-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <Sparkles className="mx-auto mb-2 size-8 text-primary" />
          <h2 className="font-heading text-xl font-bold sm:text-2xl">
            {t("createYourOwn")}
          </h2>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => {
            const stepKey = `step${s.charAt(0).toUpperCase()}${s.slice(1)}` as Parameters<typeof t>[0];
            const isActive = i <= currentIndex;
            return (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={cn(
                      "h-px w-6 transition-colors sm:w-10",
                      i <= currentIndex ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
                <button
                  onClick={() => {
                    if (i < currentIndex) setStep(STEPS[i]);
                  }}
                  disabled={i > currentIndex}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all sm:px-3 sm:py-1.5 sm:text-sm",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                    i < currentIndex && "cursor-pointer hover:bg-primary/20",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{t(stepKey)}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Step 1: Occasion */}
        {step === "occasion" && (
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
              {t("occasionTitle")}
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {OCCASIONS.map((occ) => {
                const Icon = occ.icon;
                const isSelected = design.occasion === occ.key;
                return (
                  <button
                    key={occ.key}
                    onClick={() =>
                      setDesign((prev) => ({ ...prev, occasion: occ.key }))
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all sm:p-4",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/30 hover:bg-muted/50",
                    )}
                  >
                    <Icon className={cn("size-6 sm:size-7", occ.color)} />
                    <span className="text-center text-[11px] font-medium leading-tight sm:text-xs">
                      {t(occ.key)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Clothing */}
        {step === "clothing" && (
          <div>
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
              {t("clothingTitle")}
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {CLOTHING_TYPES.map((cl) => {
                const isSelected = design.clothing === cl.key;
                return (
                  <button
                    key={cl.key}
                    onClick={() =>
                      setDesign((prev) => ({ ...prev, clothing: cl.key }))
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/30 hover:bg-muted/50",
                    )}
                  >
                    <span className="text-2xl sm:text-3xl">{cl.emoji}</span>
                    <span className="text-xs font-medium">{t(cl.key)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Personalize */}
        {step === "personalize" && (
          <div className="space-y-4">
            <h3 className="mb-4 text-center text-sm font-medium text-muted-foreground">
              {t("personalizeTitle")}
            </h3>

            {/* Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                <User className="size-3.5 text-primary" />
                {t("recipientName")}
              </label>
              <input
                type="text"
                value={design.recipientName}
                onChange={(e) =>
                  setDesign((prev) => ({
                    ...prev,
                    recipientName: e.target.value,
                  }))
                }
                placeholder={t("recipientNamePlaceholder")}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                <MessageSquare className="size-3.5 text-primary" />
                {t("specialMessage")}
              </label>
              <textarea
                value={design.specialMessage}
                onChange={(e) =>
                  setDesign((prev) => ({
                    ...prev,
                    specialMessage: e.target.value,
                  }))
                }
                placeholder={t("specialMessagePlaceholder")}
                rows={2}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Color */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Palette className="size-3.5 text-primary" />
                {t("colorPreference")}
              </label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => {
                  const isSelected = design.color === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          color: prev.color === c.key ? "" : c.key,
                        }))
                      }
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all",
                        isSelected
                          ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                          : "ring-1 ring-border hover:ring-primary/50",
                      )}
                    >
                      <span className={cn("size-3.5 rounded-full", c.value)} />
                      {t(c.key)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style */}
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Brush className="size-3.5 text-primary" />
                {t("stylePreference")}
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {STYLES.map((s) => {
                  const Icon = s.icon;
                  const isSelected = design.style === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          style: prev.style === s.key ? "" : s.key,
                        }))
                      }
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all",
                        isSelected
                          ? "bg-primary/10 text-primary ring-1 ring-primary"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {t(s.key)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                <StickyNote className="size-3.5 text-primary" />
                {t("additionalNotes")}
              </label>
              <textarea
                value={design.additionalNotes}
                onChange={(e) =>
                  setDesign((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
                placeholder={t("additionalNotesPlaceholder")}
                rows={2}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Step 4: Summary + WhatsApp */}
        {step === "result" && (
          <div className="space-y-5">
            <div className="text-center">
              <Check className="mx-auto mb-2 size-10 rounded-full bg-primary/10 p-2 text-primary" />
              <h3 className="font-heading text-lg font-bold">
                {t("resultTitle")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("resultDescription")}
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                {
                  label: t("stepOccasion"),
                  value: design.occasion
                    ? t(design.occasion as Parameters<typeof t>[0])
                    : "—",
                },
                {
                  label: t("stepClothing"),
                  value: design.clothing
                    ? t(design.clothing as Parameters<typeof t>[0])
                    : "—",
                },
                {
                  label: t("recipientName"),
                  value: design.recipientName || "—",
                },
                {
                  label: t("specialMessage"),
                  value: design.specialMessage || "—",
                },
                {
                  label: t("colorPreference"),
                  value: design.color
                    ? t(design.color as Parameters<typeof t>[0])
                    : "—",
                },
                {
                  label: t("stylePreference"),
                  value: design.style
                    ? t(design.style as Parameters<typeof t>[0])
                    : "—",
                },
              ]
                .filter((item) => item.value !== "—")
                .map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-muted/50 px-3 py-2.5"
                  >
                    <span className="block text-[11px] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              {design.additionalNotes && (
                <div className="rounded-xl bg-muted/50 px-3 py-2.5 sm:col-span-2">
                  <span className="block text-[11px] text-muted-foreground">
                    {t("additionalNotes")}
                  </span>
                  <span className="text-sm font-medium">
                    {design.additionalNotes}
                  </span>
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={buildWhatsAppUrl(undefined, generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3",
                "bg-[color:var(--whatsapp)] text-sm font-medium text-white",
                "transition-all hover:opacity-90 hover:shadow-lg",
              )}
            >
              <MessageCircle className="size-4" />
              {t("orderViaWhatsapp")}
            </a>
          </div>
        )}

        {/* Nav buttons */}
        {step !== "result" && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goBack}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                currentIndex === 0
                  ? "invisible"
                  : "border border-border bg-background hover:bg-muted",
              )}
            >
              <ArrowLeft className="size-4" />
              {t("back")}
            </button>

            <button
              onClick={() => {
                if (step === "personalize") setStep("result");
                else goNext();
              }}
              disabled={!canGoNext}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-medium transition-all",
                canGoNext
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "cursor-not-allowed bg-muted text-muted-foreground",
              )}
            >
              {step === "personalize" ? t("generateDesign") : t("next")}
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
