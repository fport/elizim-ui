"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { CartDrawer } from "@/components/marketing/cart-drawer";
import Image from "next/image";

const NAV_ITEMS = [
  { key: "products", href: "/urunler" },
  { key: "about", href: "/hakkimizda" },
  { key: "contact", href: "/iletisim" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  const handleCartOpen = useCallback(() => setCartOpen(true), []);
  const handleCartClose = useCallback(() => setCartOpen(false), []);

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "glass-panel shadow-sm"
            : "bg-transparent",
        )}
      >
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
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.key}>
                  <Link
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
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ModeToggle />

            {/* Cart button */}
            <button
              onClick={handleCartOpen}
              className={cn(
                "relative inline-flex size-9 items-center justify-center rounded-lg",
                "border border-border bg-background text-muted-foreground",
                "transition-colors hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag className="size-4" />
              {itemCount > 0 && (
                <span
                  className={cn(
                    "absolute -end-1 -top-1 flex size-4 items-center justify-center",
                    "rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
                    "animate-in zoom-in duration-200",
                  )}
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

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

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className={cn(
              "absolute inset-x-0 top-16 border-b border-border md:hidden",
              "glass-thick",
              "animate-in slide-in-from-top-2 fade-in duration-200",
            )}
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link
                  href="/urunler"
                  className={cn(
                    "block w-full rounded-xl bg-primary px-4 py-3 text-center",
                    "text-base font-medium text-primary-foreground",
                    "transition-colors hover:bg-primary/90",
                  )}
                >
                  {tHero("cta")}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" aria-hidden="true" />

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={handleCartClose} />
    </>
  );
}
