"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

export interface ProductCardProps {
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
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);

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
  }

  return (
    <div
      className={cn(
        "group glass-card rounded-2xl overflow-hidden",
        "flex flex-col",
        className,
      )}
    >
      {/* Image */}
      <Link href={{ pathname: "/urunler/[slug]", params: { slug: product.slug } }} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={product.thumbnailUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category badge */}
        <span
          className={cn(
            "absolute top-3 start-3 z-10",
            "rounded-full bg-primary/90 px-3 py-1",
            "text-xs font-medium text-primary-foreground",
            "backdrop-blur-sm",
          )}
        >
          {product.categoryName}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={{ pathname: "/urunler/[slug]", params: { slug: product.slug } }}>
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            {product.price.toLocaleString("tr-TR")} {tCommon("currency")}
          </span>

          <button
            onClick={handleAddToCart}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-2",
              "bg-primary text-primary-foreground text-xs font-medium",
              "transition-all hover:bg-primary/90 hover:shadow-md",
              "active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label={`${t("add")} - ${product.title}`}
          >
            <ShoppingBag className="size-3.5" />
            <span className="hidden sm:inline">{t("add")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
