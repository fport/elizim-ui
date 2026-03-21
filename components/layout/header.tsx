"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Info,
  Mail,
  BookOpen,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { CartDrawer } from "@/components/marketing/cart-drawer";
import { MarqueeBanner } from "@/components/marketing/marquee-banner";
import { PromoBannerStrip } from "@/components/marketing/promo-banner-strip";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const PRIMARY_NAV_ITEMS = [
  { key: "products", href: "/urunler" },
  { key: "patterns", href: "/desenler" },
  { key: "customDesign", href: "/ozel-tasarim" },
] as const;

const SECONDARY_NAV_ITEMS = [
  { key: "about", href: "/hakkimizda", icon: Info, descKey: "aboutDesc" },
  { key: "contact", href: "/iletisim", icon: Mail, descKey: "contactDesc" },
  { key: "blog", href: "/blog", icon: BookOpen, descKey: "blogDesc" },
] as const;

const NAV_ITEMS = [
  ...PRIMARY_NAV_ITEMS,
  ...SECONDARY_NAV_ITEMS,
] as const;

// Categories for the mobile mega-menu
const MENU_TABS = [
  {
    key: "products" as const,
    categories: [
      { name: "Nakış", slug: "nakis", image: "/hero-2.png" },
      { name: "Dantel", slug: "dantel", image: "/hero-7.png" },
      { name: "Bohça", slug: "bohca", image: "/hero-1.png" },
      { name: "Havlu", slug: "havlu", image: "/highligted-4.png" },
      { name: "Çeyiz", slug: "ceyiz", image: "/hero-6.png" },
      { name: "Örtü", slug: "ortu", image: "/hero-8.png" },
    ],
  },
  {
    key: "patterns" as const,
    categories: [
      { name: "Nakış Deseni", slug: "nakis", image: "/hero-2.png" },
      { name: "Dantel Deseni", slug: "dantel", image: "/hero-7.png" },
      { name: "Bohça Deseni", slug: "bohca", image: "/hero-1.png" },
    ],
  },
  {
    key: "customDesign" as const,
    categories: [
      { name: "Tişört", slug: "tisort", image: "/hero-2.png" },
      { name: "Polo Yaka", slug: "polo", image: "/hero-7.png" },
      { name: "Sweatshirt", slug: "sweatshirt", image: "/hero-1.png" },
      { name: "Kapüşonlu", slug: "kapusonlu", image: "/hero-6.png" },
    ],
  },
];

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const cartOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const lastAddedItemId = useCartStore((s) => s.lastAddedItemId);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const prevItemCount = useRef(0);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll detection
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Close "more" dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return;
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Bounce cart icon when a new item is added
  useEffect(() => {
    if (!mounted) return;
    const currentCount = totalItems();
    if (currentCount > prevItemCount.current) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
    prevItemCount.current = currentCount;
  }, [lastAddedItemId, mounted, totalItems]);

  // Keep prevItemCount in sync
  useEffect(() => {
    if (mounted) prevItemCount.current = totalItems();
  }, [cartOpen, mounted, totalItems]);

  const handleCartOpen = useCallback(() => openCart(), [openCart]);
  const handleCartClose = useCallback(() => closeCart(), [closeCart]);

  const itemCount = mounted ? totalItems() : 0;

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    if (!headerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setActiveCategory(0);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  const currentTab = MENU_TABS[activeTab];

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "glass-panel shadow-sm"
            : "bg-transparent",
        )}
      >
        <MarqueeBanner />
        <PromoBannerStrip />
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2"
          >
            <Image
              src="/logo.webp"
              alt="Elizim"
              width={48}
              height={48}
              className="size-12"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}

            {/* "Daha Fazla" dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  moreOpen || SECONDARY_NAV_ITEMS.some(
                    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
                  )
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t("more")}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    moreOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl",
                      "border border-border bg-background p-1.5 shadow-xl shadow-black/15",
                    )}
                  >
                    {SECONDARY_NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors",
                            isActive
                              ? "bg-primary/10"
                              : "hover:bg-muted",
                          )}
                        >
                          <div
                            className={cn(
                              "flex size-9 shrink-0 items-center justify-center rounded-lg",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <div className="flex flex-col">
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isActive ? "text-primary" : "text-foreground",
                              )}
                            >
                              {t(item.key)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {t(item.descKey)}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ModeToggle />

            {/* Cart button */}
            <motion.button
              onClick={handleCartOpen}
              animate={bounce ? { scale: [1, 1.3, 0.9, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative inline-flex size-9 items-center justify-center rounded-lg",
                "border border-border bg-background text-muted-foreground",
                "transition-colors hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag className="size-4" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={cn(
                      "absolute -end-1 -top-1 flex size-4 items-center justify-center",
                      "rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
                    )}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA button - desktop */}
            <Link
              href="/urunler"
              className={cn(
                "hidden items-center gap-1.5 rounded-xl px-4 py-2 lg:inline-flex",
                "bg-primary text-sm font-medium text-primary-foreground",
                "transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
                "active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {tHero("cta")}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-lg md:hidden",
                "border border-border bg-background text-muted-foreground",
                "transition-colors hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer — matches dynamic header height */}
      <div style={{ height: headerHeight }} aria-hidden="true" />

      {/* Full-screen mobile mega-menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={closeMobileMenu}
            />

            {/* Menu panel - full screen */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 flex flex-col bg-background"
            >
              {/* Header: Logo + Close */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                  <Image
                    src="/logo.webp"
                    alt="Elizim"
                    width={36}
                    height={36}
                    className="size-9"
                  />
                  <span className="font-heading text-lg font-bold">Elizim</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
                >
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              {/* Tab bar - horizontal scroll */}
              <div className="flex border-b border-border overflow-x-auto scrollbar-none">
                {MENU_TABS.map((tab, index) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(index)}
                    className={cn(
                      "relative flex-shrink-0 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                      activeTab === index
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {t(tab.key)}
                    {activeTab === index && (
                      <motion.span
                        layoutId="mobile-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content: Sidebar + Grid */}
              <div className="flex flex-1 overflow-hidden">
                {/* Category sidebar */}
                <div className="w-28 flex-shrink-0 overflow-y-auto border-r border-border bg-muted/50">
                  {currentTab.categories.map((cat, index) => (
                    <button
                      key={cat.slug}
                      onClick={() => setActiveCategory(index)}
                      className={cn(
                        "w-full border-b border-border/50 px-3 py-3.5 text-left text-[13px] leading-tight transition-colors",
                        activeCategory === index
                          ? "border-l-2 border-l-primary bg-background font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                  {/* View all link for current tab */}
                  <Link
                    href={
                      activeTab === 0
                        ? "/urunler"
                        : activeTab === 1
                          ? "/desenler"
                          : "/ozel-tasarim"
                    }
                    onClick={closeMobileMenu}
                    className="flex w-full items-center gap-1 px-3 py-3.5 text-[13px] font-medium text-primary hover:bg-muted"
                  >
                    Tümü
                    <ChevronRight className="size-3" />
                  </Link>
                </div>

                {/* Product/Category image grid */}
                <div className="flex-1 overflow-y-auto p-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* "Tümünü Gör" card */}
                    <Link
                      href={{
                        pathname: activeTab === 0 ? "/urunler" : activeTab === 1 ? "/desenler" : "/ozel-tasarim",
                        query:
                          activeTab === 0
                            ? { category: currentTab.categories[activeCategory]?.slug }
                            : undefined,
                      }}
                      onClick={closeMobileMenu}
                      className="flex flex-col items-center"
                    >
                      <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-primary/10">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="size-3.5 rounded-sm bg-primary/30" />
                          <div className="size-3.5 rounded-sm bg-primary/50" />
                          <div className="size-3.5 rounded-sm bg-primary/50" />
                          <div className="size-3.5 rounded-sm bg-primary/30" />
                        </div>
                      </div>
                      <span className="mt-1.5 text-center text-[11px] leading-tight text-foreground">
                        Tümünü Gör
                      </span>
                    </Link>

                    {/* Category image cards */}
                    {currentTab.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={{
                          pathname: activeTab === 0 ? "/urunler" : activeTab === 1 ? "/desenler" : "/ozel-tasarim",
                          query: activeTab !== 2 ? { category: cat.slug } : undefined,
                        }}
                        onClick={closeMobileMenu}
                        className="flex flex-col items-center"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="30vw"
                            className="object-cover"
                          />
                        </div>
                        <span className="mt-1.5 text-center text-[11px] leading-tight text-foreground">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom links */}
              <div className="flex-shrink-0 border-t border-border bg-muted/30">
                <a
                  href="https://wa.me/+905448611479"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-border/50 px-4 py-3.5 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="size-5 text-whatsapp" />
                    <span className="text-sm font-medium">WhatsApp ile Sipariş</span>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </a>
                <a
                  href="tel:+905448611479"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between border-b border-border/50 px-4 py-3.5 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Bizi Arayın</span>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </a>
                <div className="flex">
                  <Link
                    href="/hakkimizda"
                    onClick={closeMobileMenu}
                    className="flex flex-1 items-center gap-2 border-r border-border/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Info className="size-4" />
                    {t("about")}
                  </Link>
                  <Link
                    href="/iletisim"
                    onClick={closeMobileMenu}
                    className="flex flex-1 items-center gap-2 border-r border-border/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Mail className="size-4" />
                    {t("contact")}
                  </Link>
                  <Link
                    href="/blog"
                    onClick={closeMobileMenu}
                    className="flex flex-1 items-center gap-2 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <BookOpen className="size-4" />
                    {t("blog")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={handleCartClose} />
    </>
  );
}
