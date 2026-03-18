"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ayşe Yılmaz",
    location: "İstanbul",
    rating: 5,
    text: "Sipariş ettiğim dantel masa örtüsü harika olmuş. İşçilik gerçekten çok kaliteli, her dikişi özenle yapılmış. Teşekkürler Elizim!",
  },
  {
    id: "2",
    name: "Fatma Demir",
    location: "Ankara",
    rating: 5,
    text: "Kızımın çeyizi için birçok ürün aldım. Bohça seti muhteşemdi, herkes çok beğendi. Kesinlikle tekrar sipariş vereceğim.",
  },
  {
    id: "3",
    name: "Zeynep Kara",
    location: "İzmir",
    rating: 5,
    text: "WhatsApp üzerinden çok kolay sipariş verdim. Ürün tam istediğim gibi geldi. Hızlı kargo da cabası!",
  },
  {
    id: "4",
    name: "Elif Şahin",
    location: "Bursa",
    rating: 4,
    text: "Anneme hediye olarak nakışlı havlu seti aldım. Çok memnun kaldı. El işçiliği gerçekten fark yaratıyor.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Testimonial grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="glass-card flex flex-col gap-4 rounded-2xl p-6"
            >
              <StarRating rating={testimonial.rating} />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
