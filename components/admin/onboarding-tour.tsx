"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/stores/onboarding-store";

interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const STEPS: TourStep[] = [
  {
    target: "#admin-sidebar",
    title: "Yan Menu",
    content:
      "Buradan tum sayfalara ulasabilirsin. Urunler, siparisler, mesajlar ve daha fazlasi burada.",
    placement: "right",
  },
  {
    target: "#nav-dashboard",
    title: "Ana Panel",
    content:
      "Burasi ana sayfan. Siparis sayisi, mesaj bildirimleri ve genel durumu burada gorebilirsin.",
    placement: "right",
  },
  {
    target: "#nav-products",
    title: "Urunler",
    content:
      "Buradan urunlerini ekleyebilir, duzenleyebilir ve silebilirsin. Fiyat ve fotograf guncellemelerini buradan yapabilirsin.",
    placement: "right",
  },
  {
    target: "#nav-orders",
    title: "Siparisler",
    content:
      "WhatsApp uzerinden gelen siparisleri buradan takip edebilirsin. Siparis durumunu guncelleyebilirsin.",
    placement: "right",
  },
  {
    target: "#nav-messages",
    title: "Mesajlar",
    content:
      "Musterilerden gelen mesajlari buradan gorebilirsin ve cevaplayabilirsin.",
    placement: "right",
  },
  {
    target: "#nav-gallery",
    title: "Galeri",
    content:
      "Urun fotograflarini ve atolye fotograflarini buradan yukleyebilir ve yonetebilirsin.",
    placement: "right",
  },
  {
    target: "#nav-settings",
    title: "Ayarlar",
    content:
      "Site ayarlarini, iletisim bilgilerini ve diger tercihleri buradan degistirebilirsin.",
    placement: "right",
  },
  {
    target: "#tour-help-button",
    title: "Yardim Butonu",
    content:
      "Unutursan bu butona basarak bu turu tekrar baslat! Her zaman burada olacak.",
    placement: "right",
  },
];

function getTooltipPosition(
  rect: DOMRect,
  placement: TourStep["placement"] = "right"
) {
  const gap = 16;
  switch (placement) {
    case "top":
      return {
        top: rect.top - gap,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      };
    case "bottom":
      return {
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, 0)",
      };
    case "left":
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - gap,
        transform: "translate(-100%, -50%)",
      };
    case "right":
    default:
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
        transform: "translate(0, -50%)",
      };
  }
}

export function OnboardingTour() {
  const {
    isRunning,
    currentStep,
    hasCompletedTour,
    startTour,
    stopTour,
    nextStep,
    prevStep,
    completeTour,
  } = useOnboardingStore();

  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>(
    {}
  );
  const [mounted, setMounted] = useState(false);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-start tour for first-time users
  useEffect(() => {
    if (mounted && !hasCompletedTour) {
      const timer = setTimeout(() => startTour(), 500);
      return () => clearTimeout(timer);
    }
  }, [mounted, hasCompletedTour, startTour]);

  const positionTooltip = useCallback(() => {
    if (!isRunning || currentStep >= STEPS.length) return;

    const step = STEPS[currentStep];
    const el = document.querySelector(step.target);
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Highlight
    setHighlightStyle({
      top: rect.top - 4,
      left: rect.left - 4,
      width: rect.width + 8,
      height: rect.height + 8,
    });

    // Tooltip
    const pos = getTooltipPosition(rect, step.placement);
    setTooltipStyle(pos);

    // Scroll element into view if needed
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [isRunning, currentStep]);

  useEffect(() => {
    if (!isRunning) return;

    positionTooltip();

    // Reposition on resize/scroll
    window.addEventListener("resize", positionTooltip);
    window.addEventListener("scroll", positionTooltip, true);

    // Observe target element size changes
    const step = STEPS[currentStep];
    if (step) {
      const el = document.querySelector(step.target);
      if (el) {
        resizeObserver.current = new ResizeObserver(positionTooltip);
        resizeObserver.current.observe(el);
      }
    }

    return () => {
      window.removeEventListener("resize", positionTooltip);
      window.removeEventListener("scroll", positionTooltip, true);
      resizeObserver.current?.disconnect();
    };
  }, [isRunning, currentStep, positionTooltip]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isRunning) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") stopTour();
      if (e.key === "ArrowRight" || e.key === "Enter") {
        if (currentStep < STEPS.length - 1) nextStep();
        else completeTour();
      }
      if (e.key === "ArrowLeft") prevStep();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, currentStep, stopTour, nextStep, prevStep, completeTour]);

  if (!mounted || !isRunning) return null;

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div className="fixed inset-0 z-[9999]" aria-live="polite">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={stopTour}
      />

      {/* Highlight ring around target element */}
      <div
        className="pointer-events-none fixed z-[1] rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background transition-all duration-300 ease-out"
        style={highlightStyle}
      />

      {/* Cutout so the target element is visible */}
      <div
        className="pointer-events-none fixed z-[1] rounded-xl bg-background/5 backdrop-brightness-150 transition-all duration-300 ease-out"
        style={highlightStyle}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={cn(
            "fixed z-[2] w-80 rounded-2xl border border-border bg-card p-5 shadow-2xl"
          )}
          style={tooltipStyle}
        >
          {/* Step indicator */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentStep
                      ? "w-6 bg-primary"
                      : i < currentStep
                        ? "w-1.5 bg-primary/40"
                        : "w-1.5 bg-muted"
                  )}
                />
              ))}
            </div>
            <button
              onClick={stopTour}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Turu kapat"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <h3 className="mb-1.5 text-base font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {step.content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={stopTour}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Atla
            </button>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={prevStep}
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-lg",
                    "border border-border text-muted-foreground",
                    "transition-colors hover:bg-muted hover:text-foreground"
                  )}
                  aria-label="Onceki adim"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}
              <button
                onClick={isLast ? completeTour : nextStep}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-4 py-2",
                  "bg-primary text-sm font-medium text-primary-foreground",
                  "transition-colors hover:bg-primary/90"
                )}
              >
                {isLast ? (
                  <>
                    <PartyPopper className="size-4" />
                    Tamamla
                  </>
                ) : (
                  <>
                    Sonraki
                    <ChevronRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="mt-3 text-center text-[11px] text-muted-foreground/60">
            Ok tuslari ile gezinebilirsin
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
