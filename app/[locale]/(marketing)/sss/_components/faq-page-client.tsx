"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Sipariş nasıl verebilirim?",
    answer:
      "WhatsApp üzerinden (+90 544 861 14 79) veya web sitemiz üzerinden kolayca sipariş verebilirsiniz. Ürün sayfasındaki 'WhatsApp ile Sipariş Ver' butonuna tıklayarak doğrudan bizimle iletişime geçebilirsiniz.",
  },
  {
    question: "Ürünler ne kadar sürede teslim edilir?",
    answer:
      "El işi ürünlerimizin üretim süresi ürüne göre 3-14 gün arasında değişmektedir. Her ürün sayfasında tahmini teslimat süresi belirtilmektedir. Kargo süresi ise 1-3 iş günüdür.",
  },
  {
    question: "Özel tasarım yaptırabilir miyim?",
    answer:
      "Evet! Özel tasarım isteklerinizi WhatsApp üzerinden bizimle paylaşabilirsiniz. Renk, boyut, motif ve desen tercihinize göre kişiselleştirilmiş ürünler üretiyoruz.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Havale/EFT ve kapıda ödeme seçeneklerimiz mevcuttur. Ödeme detayları sipariş sırasında WhatsApp üzerinden paylaşılmaktadır.",
  },
  {
    question: "İade ve değişim politikanız nedir?",
    answer:
      "Ürünlerimiz el işi olduğu için standart iade politikası uygulanmaktadır. Üretim hatası durumunda 14 gün içinde değişim yapılmaktadır. Özel tasarım ürünlerde iade kabul edilmemektedir.",
  },
  {
    question: "Ürünlerin bakımı nasıl yapılmalıdır?",
    answer:
      "El işi ürünlerimizi elde, ılık su ile yıkamanızı öneriyoruz. Çamaşır makinesinde yıkama önerilmez. Düz bir zeminde, gölge bir alanda kurutulmalıdır. Detaylı bakım talimatları ürünle birlikte gönderilmektedir.",
  },
  {
    question: "Toptan sipariş verebilir miyim?",
    answer:
      "Evet, toptan siparişler için WhatsApp üzerinden bizimle iletişime geçebilirsiniz. Düğün, nişan, kına gibi özel organizasyonlar için toplu sipariş indirimleri uygulanmaktadır.",
  },
  {
    question: "Yurt dışına gönderim yapıyor musunuz?",
    answer:
      "Şu an için yalnızca Türkiye içi gönderim yapmaktayız. Yurt dışı gönderim için özel talepler WhatsApp üzerinden değerlendirilmektedir.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-start"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold">{item.question}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
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
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPageClient() {
  const t = useTranslations("faq");
  const tCta = useTranslations("contactCta");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl px-6 sm:px-8"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="mb-4 text-muted-foreground">
            Sorunuzun cevabını bulamadınız mı?
          </p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            <MessageCircle className="size-5" />
            {tCta("cta")}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
