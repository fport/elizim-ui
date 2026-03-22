"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
  PackageSearch,
  Flame,
  Tag,
  Star,
  Heart,
  Sparkles,
} from "lucide-react";
import { productsApi, categoriesApi, ProductTag } from "@/lib/api";
import { ProductCard } from "@/components/marketing/product-card";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc";

const TAG_ICONS: Record<ProductTag, typeof Flame> = {
  [ProductTag.BEST_SELLER]: Flame,
  [ProductTag.GOOD_PRICE]: Tag,
  [ProductTag.PRODUCT_OF_MONTH]: Star,
  [ProductTag.RECOMMENDED]: Heart,
  [ProductTag.NEW]: Sparkles,
};

/* ─── Bottom Sheet ─── */
function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 overlay-enter"
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background sheet-enter"
      >
        {/* Handle */}
        <div className="sticky top-0 z-10 bg-background px-4 pb-2 pt-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/20" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted-foreground/15"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-8 pt-2">{children}</div>
      </div>
    </div>
  );
}

/* ─── Main Catalog ─── */
export function ProductCatalogClient() {
  const t = useTranslations("products");
  const tTags = useTranslations("productTags");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState<ProductTag | "">("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showDesktopSort, setShowDesktopSort] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close desktop sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowDesktopSort(false);
      }
    }
    if (showDesktopSort) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [showDesktopSort]);

  const { data: productsRes, isLoading: productsLoading } = useQuery({
    queryKey: ["products", selectedCategory, sort],
    queryFn: () =>
      productsApi.getAll({
        category: selectedCategory || undefined,
        sort,
      }),
  });

  const { data: categoriesRes } = useQuery({
    queryKey: ["categories", locale],
    queryFn: () => categoriesApi.getAll(locale),
  });

  const products = productsRes?.products ?? [];
  const categories = categoriesRes?.categories ?? [];

  // Client-side search + tag filter
  const filteredProducts = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.description?.toLowerCase().includes(query) ?? false) ||
          (p.tags?.toLowerCase().includes(query) ?? false),
      );
    }

    if (selectedTag) {
      result = result.filter((p) => p.productTag === selectedTag);
    }

    return result;
  }, [products, search, selectedTag]);

  const getCategoryName = useCallback(
    (categoryId: string | null) => {
      if (!categoryId) return "";
      return categories.find((c) => c.id === categoryId)?.name ?? "";
    },
    [categories],
  );

  const sortLabels: Record<SortOption, string> = {
    newest: t("sortNewest"),
    "price-asc": t("sortPriceAsc"),
    "price-desc": t("sortPriceDesc"),
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (selectedTag ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSearch("");
  };

  const tagValues = Object.values(ProductTag);

  return (
    <section className="min-h-screen pb-20">
      {/* ─── Sticky Top Bar ─── */}
      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          {/* Search Row */}
          <div className="flex items-center gap-2 py-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search")}
                className={cn(
                  "w-full rounded-xl bg-muted/60 py-2.5 pe-4 ps-10 text-sm",
                  "placeholder:text-muted-foreground/60",
                  "transition-all duration-200",
                  "border border-transparent",
                  "focus:border-primary/30 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/10",
                )}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter + Sort Row (Mobile) */}
          <div className="flex items-center gap-2 pb-3 md:hidden">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilterSheet(true)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium",
                "border transition-all",
                activeFilterCount > 0
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border bg-background text-foreground",
              )}
            >
              <SlidersHorizontal className="size-4" />
              {t("filter")}
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Button */}
            <button
              onClick={() => setShowSortSheet(true)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-sm font-medium transition-all"
            >
              <ArrowUpDown className="size-4" />
              {sortLabels[sort]}
            </button>
          </div>

          {/* Category Chips - Horizontal Scroll */}
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all",
                !selectedCategory
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted",
              )}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.slug ? "" : cat.slug,
                  )
                }
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all",
                  selectedCategory === cat.slug
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Desktop Sidebar + Grid Layout ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="flex gap-6">
          {/* ─── Desktop Sidebar Filters ─── */}
          <aside className="hidden w-56 shrink-0 md:block">
            <div className="sticky top-[140px] space-y-6">
              {/* Sort - Desktop */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t("sortBy")}
                </h4>
                <div ref={sortRef} className="relative">
                  <button
                    onClick={() => setShowDesktopSort(!showDesktopSort)}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {sortLabels[sort]}
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform",
                        showDesktopSort && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {showDesktopSort && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute start-0 top-full z-20 mt-1 w-full rounded-xl border border-border bg-popover p-1 shadow-lg"
                      >
                        {(Object.keys(sortLabels) as SortOption[]).map(
                          (option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSort(option);
                                setShowDesktopSort(false);
                              }}
                              className={cn(
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                                sort === option &&
                                  "bg-muted font-semibold text-primary",
                              )}
                            >
                              {sortLabels[option]}
                            </button>
                          ),
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Tags Filter - Desktop */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t("tags")}
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedTag("")}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      !selectedTag
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {t("allTags")}
                  </button>
                  {tagValues.map((tag) => {
                    const Icon = TAG_ICONS[tag];
                    return (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? "" : tag)
                        }
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          selectedTag === tag
                            ? "bg-muted font-semibold text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        <Icon className="size-3.5" />
                        {tTags(tag)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear All - Desktop */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  {t("clearAll")}
                </button>
              )}
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <div className="min-w-0 flex-1">
            {/* Results bar */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {t("resultCount", { count: filteredProducts.length })}
                </span>
                {/* Active filter pills */}
                {activeFilterCount > 0 && (
                  <div className="hidden items-center gap-1.5 md:flex">
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {categories.find((c) => c.slug === selectedCategory)
                          ?.name}
                        <button
                          onClick={() => setSelectedCategory("")}
                          className="rounded-full p-0.5 hover:bg-primary/20"
                        >
                          <X className="size-2.5" />
                        </button>
                      </span>
                    )}
                    {selectedTag && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {tTags(selectedTag)}
                        <button
                          onClick={() => setSelectedTag("")}
                          className="rounded-full p-0.5 hover:bg-primary/20"
                        >
                          <X className="size-2.5" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-primary hover:underline md:hidden"
                >
                  {t("clearFilters")}
                </button>
              )}
            </div>

            {/* ─── Product Grid ─── */}
            <AnimatePresence mode="wait">
              {productsLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-border/50">
                      <div className="aspect-square skeleton-shimmer" />
                      <div className="space-y-2 p-3">
                        <div className="h-3 w-1/3 rounded skeleton-shimmer" />
                        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                        <div className="h-5 w-1/2 rounded skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-20 text-center"
                >
                  <div className="mb-4 flex size-20 items-center justify-center rounded-2xl bg-muted">
                    <PackageSearch className="size-8 text-muted-foreground" />
                  </div>
                  <p className="text-base font-semibold text-foreground">
                    {t("noResults")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("noResultsSubtitle")}
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      {t("clearAll")}
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.03, 0.3),
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <ProductCard
                        product={{
                          id: product.id,
                          title: product.title,
                          slug: product.slug,
                          price: product.price / 100,
                          thumbnailUrl:
                            product.thumbnailUrl ||
                            "/images/placeholder-product.jpg",
                          categoryName: getCategoryName(product.categoryId),
                          productTag: product.productTag,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── Mobile Bottom Sheet: Filters ─── */}
      <BottomSheet
        open={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        title={t("filter")}
      >
        {/* Categories */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("categories")}
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !selectedCategory
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.slug ? "" : cat.slug,
                  )
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === cat.slug
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("tags")}
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !selectedTag
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {t("allTags")}
            </button>
            {tagValues.map((tag) => {
              const Icon = TAG_ICONS[tag];
              return (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? "" : tag)
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                    selectedTag === tag
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {tTags(tag)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply / Clear */}
        <div className="flex gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                clearAllFilters();
                setShowFilterSheet(false);
              }}
              className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {t("clearAll")}
            </button>
          )}
          <button
            onClick={() => setShowFilterSheet(false)}
            className="flex-1 rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-colors"
          >
            {t("resultCount", { count: filteredProducts.length })}
          </button>
        </div>
      </BottomSheet>

      {/* ─── Mobile Bottom Sheet: Sort ─── */}
      <BottomSheet
        open={showSortSheet}
        onClose={() => setShowSortSheet(false)}
        title={t("sortBy")}
      >
        <div className="space-y-1">
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => {
                setSort(option);
                setShowSortSheet(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-colors",
                sort === option
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              {sortLabels[option]}
              {sort === option && (
                <div className="size-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </BottomSheet>
    </section>
  );
}
