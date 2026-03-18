"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { productsApi, categoriesApi, type Product, type Category } from "@/lib/api";
import { ProductCard } from "../../_components/product-card";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price_asc" | "price_desc";

const placeholderProducts: Product[] = [
  {
    id: "1",
    title: "İşlemeli Keten Masa Örtüsü",
    slug: "islemeli-keten-masa-ortusu",
    description: "El işçiliği ile üretilen keten masa örtüsü",
    price: 85000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "1",
    categoryName: "Örtü",
    deliveryDays: 7,
    isFeatured: true,
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "El Yapımı Dantel Sehpa Takımı",
    slug: "el-yapimi-dantel-sehpa-takimi",
    description: "Geleneksel dantel tekniği ile üretilen sehpa takımı",
    price: 65000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "2",
    categoryName: "Dantel",
    deliveryDays: 5,
    isFeatured: true,
    isActive: true,
    createdAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Nakışlı Bohça Seti",
    slug: "nakisli-bohca-seti",
    description: "Özel tasarım nakışlı bohça seti",
    price: 120000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "3",
    categoryName: "Bohça",
    deliveryDays: 10,
    isFeatured: true,
    isActive: true,
    createdAt: "2025-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Özel Tasarım Havlu Kenarı",
    slug: "ozel-tasarim-havlu-kenari",
    description: "Kişiye özel tasarım havlu kenarı",
    price: 45000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "4",
    categoryName: "Havlu",
    deliveryDays: 3,
    isFeatured: false,
    isActive: true,
    createdAt: "2025-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "Çeyiz Seti - Premium",
    slug: "ceyiz-seti-premium",
    description: "Tam çeyiz seti, nakış ve dantel işlemeli",
    price: 350000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "5",
    categoryName: "Çeyiz",
    deliveryDays: 14,
    isFeatured: true,
    isActive: true,
    createdAt: "2025-01-05T00:00:00Z",
  },
  {
    id: "6",
    title: "Nakışlı Yastık Kılıfı",
    slug: "nakisli-yastik-kilifi",
    description: "El nakışı ile süslenen yastık kılıfı",
    price: 35000,
    thumbnailUrl: "/images/placeholder-product.jpg",
    images: [],
    categoryId: "1",
    categoryName: "Nakış",
    deliveryDays: 5,
    isFeatured: false,
    isActive: true,
    createdAt: "2025-01-06T00:00:00Z",
  },
];

const placeholderCategories: Category[] = [
  { id: "0", name: "Tümü", slug: "", description: "", imageUrl: "", productCount: 6 },
  { id: "1", name: "Nakış", slug: "nakis", description: "", imageUrl: "", productCount: 2 },
  { id: "2", name: "Dantel", slug: "dantel", description: "", imageUrl: "", productCount: 1 },
  { id: "3", name: "Bohça", slug: "bohca", description: "", imageUrl: "", productCount: 1 },
  { id: "4", name: "Havlu", slug: "havlu", description: "", imageUrl: "", productCount: 1 },
  { id: "5", name: "Çeyiz", slug: "ceyiz", description: "", imageUrl: "", productCount: 1 },
];

export function ProductCatalogClient() {
  const t = useTranslations("products");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data: productsData } = useQuery({
    queryKey: ["products", { categorySlug: selectedCategory, sort }],
    queryFn: async () => {
      const response = await productsApi.getAll({
        categorySlug: selectedCategory || undefined,
        sort,
      });
      return response.data;
    },
    placeholderData: placeholderProducts,
    retry: false,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoriesApi.getAll();
      return response.data;
    },
    placeholderData: placeholderCategories.slice(1),
    retry: false,
  });

  const products = productsData ?? placeholderProducts;
  const categories = categoriesData ?? placeholderCategories.slice(1);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const query = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query),
    );
  }, [products, search]);

  const sortLabels: Record<SortOption, string> = {
    newest: t("sortNewest"),
    price_asc: t("sortPriceAsc"),
    price_desc: t("sortPriceDesc"),
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
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
