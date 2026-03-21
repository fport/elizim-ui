"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqKeys = ["1", "2", "3", "4", "5", "6"] as const;

function AccordionItem({
  index,
  questionKey,
  answerKey,
  isOpen,
  onToggle,
  t,
}: {
  index: number;
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "group rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-primary/20 bg-primary/[0.03]"
          : "border-border/60 hover:border-border",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-start sm:px-6 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-medium tabular-nums text-primary/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-semibold sm:text-base">
          {t(questionKey)}
        </span>
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/60 text-muted-foreground group-hover:border-border",
          )}
        >
          {isOpen ? (
            <X className="size-3.5" strokeWidth={2} />
          ) : (
            <Plus className="size-3.5" strokeWidth={2} />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 ps-14 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
              {t(answerKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const t = useTranslations("faqSection");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left - sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            {/* Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                {t("label")}
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
              {t("title")}
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {t("contactText")}{" "}
              <Link
                href="/iletisim"
                className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
              >
                {t("contactLink")}
              </Link>
              {t("contactSuffix")}
            </p>

            {/* Stats */}
            <div className="mt-8 flex gap-10">
              <div>
                <span className="text-3xl font-bold tabular-nums">6</span>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("statQuestions")}
                </p>
              </div>
              <div>
                <span className="text-3xl font-bold tabular-nums">7/24</span>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("statSupport")}
                </p>
              </div>
            </div>

            {/* View all link */}
            <Link
              href="/sss"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {t("viewAll")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right - accordion */}
          <div className="flex flex-col gap-3">
            {faqKeys.map((key, index) => (
              <AccordionItem
                key={key}
                index={index}
                questionKey={`q${key}`}
                answerKey={`a${key}`}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
