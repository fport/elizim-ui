"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Flame, Tag, Star, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductTag } from "@/lib/api";

const TAG_CONFIG: Record<ProductTag, { icon: typeof Flame; className: string }> = {
  [ProductTag.BEST_SELLER]: {
    icon: Flame,
    className: "bg-orange-500 text-white",
  },
  [ProductTag.GOOD_PRICE]: {
    icon: Tag,
    className: "bg-emerald-500 text-white",
  },
  [ProductTag.PRODUCT_OF_MONTH]: {
    icon: Star,
    className: "bg-amber-500 text-white",
  },
  [ProductTag.RECOMMENDED]: {
    icon: Heart,
    className: "bg-rose-500 text-white",
  },
  [ProductTag.NEW]: {
    icon: Sparkles,
    className: "bg-blue-500 text-white",
  },
};

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    thumbnailUrl: string;
    categoryName: string;
    productTag?: ProductTag | null;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const t = useTranslations("common");
  const tTags = useTranslations("productTags");
  const tagConfig = product.productTag ? TAG_CONFIG[product.productTag] : null;

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

        {/* Product tag badge */}
        {tagConfig && product.productTag && (
          <span
            className={cn(
              "absolute top-2.5 end-2.5 z-10",
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
              "text-[10px] font-bold uppercase tracking-wide",
              "shadow-sm",
              tagConfig.className,
            )}
          >
            <tagConfig.icon className="size-2.5" />
            {tTags(product.productTag)}
          </span>
        )}
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
