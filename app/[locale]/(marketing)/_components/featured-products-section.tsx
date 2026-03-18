"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";

const placeholderProducts = [
  {
    id: "1",
    title: "İşlemeli Keten Masa Örtüsü",
    slug: "islemeli-keten-masa-ortusu",
    price: 85000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    categoryName: "Örtü",
  },
  {
    id: "2",
    title: "El Yapımı Dantel Sehpa Takımı",
    slug: "el-yapimi-dantel-sehpa-takimi",
    price: 65000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    categoryName: "Dantel",
  },
  {
    id: "3",
    title: "Nakışlı Bohça Seti",
    slug: "nakisli-bohca-seti",
    price: 120000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    categoryName: "Bohça",
  },
  {
    id: "4",
    title: "Özel Tasarım Havlu Kenarı",
    slug: "ozel-tasarim-havlu-kenari",
    price: 45000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    categoryName: "Havlu",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function FeaturedProductsSection() {
  const t = useTranslations("featured");

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link
            href="/urunler"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:text-primary"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {placeholderProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
