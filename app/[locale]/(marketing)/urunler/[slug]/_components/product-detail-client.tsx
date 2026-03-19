"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  Truck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { productsApi, categoriesApi, type Product } from "@/lib/api";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/stores/cart-store";
import { ProductCard } from "../../../_components/product-card";
import { cn } from "@/lib/utils";

const placeholderProduct: Product = {
  id: "1",
  title: "İşlemeli Keten Masa Örtüsü",
  slug: "islemeli-keten-masa-ortusu",
  description:
    "El işçiliği ile üretilen keten masa örtüsü. Geleneksel Anadolu motifleri ile süslenen bu masa örtüsü, evinize sıcaklık ve zarafet katacaktır. Tamamen doğal keten kumaş üzerine, usta ellerle işlenmiş nakış desenleri ile bezeli bu özel ürün, hem günlük kullanım hem de özel davetler için idealdir.\n\nBoyutlar: 150x200 cm\nMalzeme: %100 Doğal Keten\nBakım: Elde yıkama önerilir",
  price: 85000,
  thumbnailUrl: "/images/placeholder-product.jpg",
  images: JSON.stringify([
    "/images/placeholder-product.jpg",
    "/images/placeholder-product-2.jpg",
    "/images/placeholder-product-3.jpg",
  ]),
  categoryId: "1",
  deliveryTime: "7 gün",
  tags: null,
  instagramPostId: null,
  isActive: true,
  whatsappText: null,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
};

const relatedPlaceholder: Product[] = [
  {
    id: "2",
    title: "El Yapımı Dantel Sehpa Takımı",
    slug: "el-yapimi-dantel-sehpa-takimi",
    description: "",
    price: 65000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: null,
    categoryId: "2",
    deliveryTime: "5 gün",
    tags: null,
    instagramPostId: null,
    isActive: true,
    whatsappText: null,
    createdAt: "2025-01-02T00:00:00Z",
    updatedAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Nakışlı Bohça Seti",
    slug: "nakisli-bohca-seti",
    description: "",
    price: 120000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: null,
    categoryId: "3",
    deliveryTime: "10 gün",
    tags: null,
    instagramPostId: null,
    isActive: true,
    whatsappText: null,
    createdAt: "2025-01-03T00:00:00Z",
    updatedAt: "2025-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Özel Tasarım Havlu Kenarı",
    slug: "ozel-tasarim-havlu-kenari",
    description: "",
    price: 45000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: null,
    categoryId: "4",
    deliveryTime: "3 gün",
    tags: null,
    instagramPostId: null,
    isActive: true,
    whatsappText: null,
    createdAt: "2025-01-04T00:00:00Z",
    updatedAt: "2025-01-04T00:00:00Z",
  },
];

export function ProductDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("products");
  const tCart = useTranslations("cart");
  const tCommon = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);
  const [activeImage, setActiveImage] = useState(0);

  const { data: productData } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const response = await productsApi.getBySlug(slug);
      return response.product;
    },
    placeholderData: placeholderProduct,
    retry: false,
  });

  const product = productData ?? placeholderProduct;

  const { data: categoriesRes } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
  });

  const categoryName = useMemo(() => {
    if (!product.categoryId) return "";
    return categoriesRes?.categories?.find((c) => c.id === product.categoryId)?.name ?? "";
  }, [product.categoryId, categoriesRes]);

  const parsedImages: string[] = useMemo(() => {
    if (!product.images) return [];
    try {
      const parsed = JSON.parse(product.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [product.images]);

  const images =
    parsedImages.length > 0
      ? parsedImages
      : [
          product.thumbnailUrl || "/images/placeholder-product.jpg",
          product.thumbnailUrl || "/images/placeholder-product.jpg",
          product.thumbnailUrl || "/images/placeholder-product.jpg",
        ];

  const formattedPrice = (product.price / 100).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
  });

  const whatsappMessage = product.whatsappText || `Merhaba! "${product.title}" ürünüyle ilgileniyorum. Sipariş vermek istiyorum.`;

  function handlePrevImage() {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <section className="px-4 py-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Back link */}
        <Link
          href="/urunler"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("title")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[activeImage] || "/images/placeholder-product.jpg"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5 text-foreground" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all",
                      i === activeImage
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {categoryName && (
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                {categoryName}
              </p>
            )}

            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 text-3xl font-bold text-primary">
              {formattedPrice} {tCommon("currency")}
            </p>

            {/* Delivery info */}
            {product.deliveryTime && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                <Truck className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {t("deliveryTime")}:
                </span>
                <span className="font-semibold">
                  {product.deliveryTime}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {(product.description ?? "").split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(undefined, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                <MessageCircle className="size-5" />
                {t("orderWhatsapp")}
              </a>
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    title: product.title,
                    slug: product.slug,
                    price: product.price,
                    thumbnailUrl: product.thumbnailUrl || "/images/placeholder-product.jpg",
                  })
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold transition-all hover:bg-muted"
              >
                <ShoppingBag className="size-5" />
                {tCart("add")}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        <div className="mt-20">
          <h2 className="mb-8 font-heading text-2xl font-bold">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {relatedPlaceholder.map((p) => {
              const catName = p.categoryId
                ? categoriesRes?.categories?.find((c) => c.id === p.categoryId)?.name ?? ""
                : "";
              return (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    title: p.title,
                    slug: p.slug,
                    price: p.price / 100,
                    thumbnailUrl: p.thumbnailUrl || "/images/placeholder-product.jpg",
                    categoryName: catName,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
