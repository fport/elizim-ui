"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    thumbnailUrl: string;
    categoryName: string;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const t = useTranslations("common");

  const formattedPrice = (product.price / 100).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
  });

  return (
    <Link
      href={{ pathname: "/urunler/[slug]", params: { slug: product.slug } }}
      className={cn(
        "glass-card group block overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {product.categoryName}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
          {product.title}
        </h3>
        <p className="mt-2 text-base font-bold text-primary">
          {formattedPrice} {t("currency")}
        </p>
      </div>
    </Link>
  );
}
