"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { contactApi } from "@/lib/api";

const contactInfo = [
  {
    key: "whatsapp" as const,
    icon: MessageCircle,
    value: "+90 544 861 14 79",
    href: buildWhatsAppUrl(),
    color: "bg-[var(--whatsapp)]/10 text-[var(--whatsapp)]",
  },
  {
    key: "phone" as const,
    icon: Phone,
    value: "+90 544 861 14 79",
    href: "tel:+905448611479",
    color: "bg-primary/10 text-primary",
  },
  {
    key: "email" as const,
    icon: Mail,
    value: "info@elizim.art",
    href: "mailto:info@elizim.art",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    key: "address" as const,
    icon: MapPin,
    value: "Karabük, Türkiye",
    href: "https://maps.app.goo.gl/1oAL2gQ2y5gapyvq5",
    color: "bg-red-500/10 text-red-500",
  },
];

export function ContactPageClient() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await contactApi.submit({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        message: formState.message,
      });
      setStatus("success");
      setFormState({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 lg:col-span-2"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.key}
                  href={info.href}
                  target={info.key === "whatsapp" || info.key === "address" ? "_blank" : undefined}
                  rel={info.key === "whatsapp" || info.key === "address" ? "noopener noreferrer" : undefined}
                  className="glass-card flex items-center gap-4 rounded-xl p-5 transition-all"
                >
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${info.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t(`info.${info.key}`)}
                    </p>
                    <p className="mt-0.5 font-semibold">{info.value}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card space-y-5 rounded-2xl p-8"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t("form.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t("form.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t("form.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, phone: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
                  <CheckCircle2 className="size-4 shrink-0" />
                  {t("form.success")}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  {t("form.error")}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-60"
              >
                <Send className="size-4" />
                {t("form.send")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-2xl border border-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d32.62!3d41.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEyJzAwLjAiTiAzMsKwMzcnMTIuMCJF!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Elizim Konum"
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
