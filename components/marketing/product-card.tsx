"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingBag, Flame, Tag, Star, Heart, Sparkles, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { ProductTag } from "@/lib/api";
import { motion } from "motion/react";
import { useState } from "react";

const TAG_CONFIG: Record<ProductTag, { icon: typeof Flame; className: string; bgClass: string }> = {
  [ProductTag.BEST_SELLER]: {
    icon: Flame,
    className: "text-orange-600",
    bgClass: "bg-orange-50 dark:bg-orange-500/15",
  },
  [ProductTag.GOOD_PRICE]: {
    icon: Tag,
    className: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/15",
  },
  [ProductTag.PRODUCT_OF_MONTH]: {
    icon: Star,
    className: "text-amber-600",
    bgClass: "bg-amber-50 dark:bg-amber-500/15",
  },
  [ProductTag.RECOMMENDED]: {
    icon: Heart,
    className: "text-rose-600",
    bgClass: "bg-rose-50 dark:bg-rose-500/15",
  },
  [ProductTag.NEW]: {
    icon: Sparkles,
    className: "text-blue-600",
    bgClass: "bg-blue-50 dark:bg-blue-500/15",
  },
};

export interface ProductCardProps {
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
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const tTags = useTranslations("productTags");
  const addItem = useCartStore((s) => s.addItem);
  const tagConfig = product.productTag ? TAG_CONFIG[product.productTag] : null;
  const [added, setAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      thumbnailUrl: product.thumbnailUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <Link
      href={{ pathname: "/urunler/[slug]", params: { slug: product.slug } }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "bg-card border border-border/50",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
        "hover:-translate-y-0.5",
        "active:scale-[0.98]",
        className,
      )}
    >
      {/* Image Container - 1:1 ratio like Trendyol */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Product tag badge - top left like Trendyol */}
        {tagConfig && product.productTag && (
          <span
            className={cn(
              "absolute top-2 start-2 z-10",
              "inline-flex items-center gap-1 rounded-lg px-2 py-1",
              "text-[10px] font-bold uppercase tracking-wider",
              "backdrop-blur-md shadow-sm",
              tagConfig.bgClass,
              tagConfig.className,
            )}
          >
            <tagConfig.icon className="size-3" />
            {tTags(product.productTag)}
          </span>
        )}

        {/* Quick Add Button - bottom right overlay */}
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.85 }}
          className={cn(
            "absolute bottom-2 end-2 z-10",
            "flex size-9 items-center justify-center rounded-full",
            "shadow-lg shadow-black/10",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            added
              ? "bg-emerald-500 text-white"
              : "bg-white dark:bg-foreground/90 text-foreground dark:text-background hover:bg-primary hover:text-primary-foreground",
          )}
          aria-label={`${t("add")} - ${product.title}`}
        >
          {added ? (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ) : (
            <Plus className="size-4" strokeWidth={2.5} />
          )}
        </motion.button>
      </div>

      {/* Content - Compact like Trendyol */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {/* Category - small muted text */}
        {product.categoryName && (
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {product.categoryName}
          </span>
        )}

        {/* Title */}
        <h3 className="line-clamp-2 text-[13px] leading-snug font-medium text-foreground sm:text-sm">
          {product.title}
        </h3>

        {/* Price - Bold and prominent */}
        <div className="mt-auto flex items-baseline gap-1.5 pt-1">
          <span className="text-base font-bold text-foreground sm:text-lg">
            {product.price.toLocaleString("tr-TR")}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            {tCommon("currency")}
          </span>
        </div>
      </div>
    </Link>
  );
}
