"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
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
  FileType,
  BarChart3,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { patternsApi, categoriesApi } from "@/lib/api";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

const DIFFICULTY_COLORS: Record<string, string> = {
  Kolay: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Orta: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Zor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const DIFFICULTY_VALUES = ["Kolay", "Orta", "Zor"] as const;

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
      <div
        className="absolute inset-0 bg-black/40 overlay-enter"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background sheet-enter"
      >
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
export function PatternCatalogClient() {
  const t = useTranslations("patterns");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
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

  const { data: patternsRes, isLoading: patternsLoading } = useQuery({
    queryKey: ["patterns", selectedCategory, sort],
    queryFn: () =>
      patternsApi.getAll({
        category: selectedCategory || undefined,
        sort,
      }),
  });

  const { data: categoriesRes } = useQuery({
    queryKey: ["categories", locale],
    queryFn: () => categoriesApi.getAll(locale),
  });

  const patterns = patternsRes?.patterns ?? [];
  const categories = categoriesRes?.categories ?? [];

  // Client-side search + difficulty filter
  const filteredPatterns = useMemo(() => {
    let result = patterns;

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          (p.description?.toLowerCase().includes(query) ?? false) ||
          (p.tags?.toLowerCase().includes(query) ?? false) ||
          p.formats.toLowerCase().includes(query),
      );
    }

    if (selectedDifficulty) {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    return result;
  }, [patterns, search, selectedDifficulty]);

  const sortLabels: Record<SortOption, string> = {
    newest: t("sortNewest"),
    "price-asc": t("sortPriceAsc"),
    "price-desc": t("sortPriceDesc"),
    popular: t("sortPopular"),
  };

  const difficultyLabels: Record<string, string> = {
    Kolay: t("difficultyEasy"),
    Orta: t("difficultyMedium"),
    Zor: t("difficultyHard"),
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) + (selectedDifficulty ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSearch("");
  };

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
                  {t("sort")}
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

              {/* Difficulty Filter - Desktop */}
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t("difficulty")}
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedDifficulty("")}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                      !selectedDifficulty
                        ? "bg-muted font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    {t("allCategories")}
                  </button>
                  {DIFFICULTY_VALUES.map((diff) => (
                    <button
                      key={diff}
                      onClick={() =>
                        setSelectedDifficulty(
                          selectedDifficulty === diff ? "" : diff,
                        )
                      }
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                        selectedDifficulty === diff
                          ? "bg-muted font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                    >
                      <BarChart3 className="size-3.5" />
                      {difficultyLabels[diff]}
                    </button>
                  ))}
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
                  {filteredPatterns.length} {t("resultCount")}
                </span>
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
                    {selectedDifficulty && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {difficultyLabels[selectedDifficulty]}
                        <button
                          onClick={() => setSelectedDifficulty("")}
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
                  {t("clearAll")}
                </button>
              )}
            </div>

            {/* ─── Pattern Grid ─── */}
            <AnimatePresence mode="wait">
              {patternsLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-border/50"
                    >
                      <div className="aspect-square skeleton-shimmer" />
                      <div className="space-y-2 p-3">
                        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
                        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
                        <div className="flex gap-1">
                          <div className="h-4 w-10 rounded skeleton-shimmer" />
                          <div className="h-4 w-10 rounded skeleton-shimmer" />
                        </div>
                        <div className="h-5 w-1/2 rounded skeleton-shimmer" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredPatterns.length === 0 ? (
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
                  {filteredPatterns.map((pattern, index) => {
                    const formattedPrice = (
                      pattern.price / 100
                    ).toLocaleString("tr-TR");
                    const formats = pattern.formats
                      .split(",")
                      .map((f) => f.trim());

                    return (
                      <motion.div
                        key={pattern.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: Math.min(index * 0.03, 0.3),
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <Link
                          href={{
                            pathname: "/desenler/[slug]",
                            params: { slug: pattern.slug },
                          }}
                          className={cn(
                            "group relative flex flex-col overflow-hidden rounded-2xl",
                            "bg-card border border-border/50",
                            "transition-all duration-300",
                            "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
                            "hover:-translate-y-0.5",
                            "active:scale-[0.98]",
                          )}
                        >
                          {/* Image */}
                          <div className="relative aspect-square overflow-hidden bg-muted/30">
                            <Image
                              src={
                                pattern.previewImageUrl ||
                                "/images/placeholder-product.jpg"
                              }
                              alt={pattern.title}
                              fill
                              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              style={{
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />

                            {/* Watermark */}
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              onContextMenu={(e) => e.preventDefault()}
                            >
                              <span className="rotate-[-30deg] select-none text-xl font-bold text-white/15 sm:text-2xl">
                                elizim.art
                              </span>
                            </div>

                            {/* Difficulty badge - top left */}
                            {pattern.difficulty && (
                              <span
                                className={cn(
                                  "absolute top-2 start-2 z-10",
                                  "inline-flex items-center gap-1 rounded-lg px-2 py-1",
                                  "text-[10px] font-bold uppercase tracking-wider",
                                  "backdrop-blur-md shadow-sm",
                                  DIFFICULTY_COLORS[pattern.difficulty] ||
                                    "bg-muted text-foreground",
                                )}
                              >
                                <BarChart3 className="size-3" />
                                {difficultyLabels[pattern.difficulty] ||
                                  pattern.difficulty}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-1 flex-col gap-1.5 p-3">
                            {/* Title */}
                            <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground sm:text-sm">
                              {pattern.title}
                            </h3>

                            {/* Format badges */}
                            <div className="flex flex-wrap gap-1">
                              {formats.map((fmt) => (
                                <span
                                  key={fmt}
                                  className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                                >
                                  <FileType className="size-2.5" />
                                  {fmt}
                                </span>
                              ))}
                            </div>

                            {/* Price */}
                            <div className="mt-auto flex items-baseline gap-1.5 pt-1">
                              <span className="text-base font-bold text-foreground sm:text-lg">
                                {formattedPrice}
                              </span>
                              <span className="text-xs font-semibold text-muted-foreground">
                                {tCommon("currency")}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
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
            {t("allCategories")}
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

        {/* Difficulty */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("difficulty")}
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty("")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !selectedDifficulty
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {t("allCategories")}
            </button>
            {DIFFICULTY_VALUES.map((diff) => (
              <button
                key={diff}
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === diff ? "" : diff,
                  )
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedDifficulty === diff
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <BarChart3 className="size-3.5" />
                {difficultyLabels[diff]}
              </button>
            ))}
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
            {filteredPatterns.length} {t("resultCount")}
          </button>
        </div>
      </BottomSheet>

      {/* ─── Mobile Bottom Sheet: Sort ─── */}
      <BottomSheet
        open={showSortSheet}
        onClose={() => setShowSortSheet(false)}
        title={t("sort")}
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
