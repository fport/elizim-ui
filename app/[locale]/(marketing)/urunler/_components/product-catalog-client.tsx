"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { productsApi, categoriesApi } from "@/lib/api";
import { ProductCard } from "../../_components/product-card";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc";

export function ProductCatalogClient() {
  const t = useTranslations("products");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data: productsRes } = useQuery({
    queryKey: ["products", selectedCategory, sort],
    queryFn: () =>
      productsApi.getAll({
        category: selectedCategory || undefined,
        sort,
      }),
  });

  const { data: categoriesRes } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
  });

  const products = productsRes?.products ?? [];
  const categories = categoriesRes?.categories ?? [];

  // Client-side search filter
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const query = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.description?.toLowerCase().includes(query) ?? false) ||
        (p.tags?.toLowerCase().includes(query) ?? false),
    );
  }, [products, search]);

  // Resolve category name for each product
  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "";
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name ?? "";
  };

  const sortLabels: Record<SortOption, string> = {
    newest: t("sortNewest"),
    "price-asc": t("sortPriceAsc"),
    "price-desc": t("sortPriceDesc"),
  };

  return (
    <section className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Filters bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-xl border border-border bg-background py-2.5 pe-4 ps-10 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <SlidersHorizontal className="size-4" />
              {sortLabels[sort]}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  showSortDropdown && "rotate-180",
                )}
              />
            </button>

            {showSortDropdown && (
              <div className="absolute end-0 top-full z-20 mt-1.5 min-w-[200px] rounded-xl border border-border bg-popover p-1 shadow-lg">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSort(option);
                      setShowSortDropdown(false);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                      sort === option && "bg-muted font-medium text-primary",
                    )}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("")}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all",
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted",
            )}
          >
            {t("allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all",
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-muted-foreground"
            >
              <p className="text-lg">{t("noResults")}</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <ProductCard
                    product={{
                      id: product.id,
                      title: product.title,
                      slug: product.slug,
                      price: product.price / 100, // kuruştan TL'ye
                      thumbnailUrl: product.thumbnailUrl || "/images/placeholder-product.jpg",
                      categoryName: getCategoryName(product.categoryId),
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
