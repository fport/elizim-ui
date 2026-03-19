"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactCtaSection() {
  const t = useTranslations("contactCta");
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const translateX = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-100, 100], [-8, 8]), springConfig);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      {/* Liquid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div
          className="liquid-blob absolute left-1/3 top-1/3 h-[400px] w-[400px] bg-primary/6"
          style={{ animation: "liquid-float 10s ease-in-out infinite" }}
        />
        <div
          className="liquid-blob absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-[var(--whatsapp)]/8"
          style={{ animation: "liquid-float-alt 8s ease-in-out infinite" }}
        />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          {t("subtitle")}
        </motion.p>

        {/* WhatsApp button with magnetic effect */}
        <motion.a
          ref={buttonRef}
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ x: translateX, y: translateY }}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--whatsapp)] px-10 py-5 text-lg font-bold text-white shadow-lg shadow-[var(--whatsapp)]/25 transition-shadow hover:shadow-xl hover:shadow-[var(--whatsapp)]/30"
        >
          <MessageCircle className="size-6" />
          {t("cta")}
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          +90 544 861 14 79
        </motion.p>
      </div>
    </section>
  );
}
