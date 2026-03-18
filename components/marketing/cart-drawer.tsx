"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, Minus, Plus, ShoppingBag, MessageCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const toWhatsAppUrl = useCartStore((s) => s.toWhatsAppUrl);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col",
              "bg-background shadow-2xl",
              "border-s border-border",
            )}
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">{t("title")}</h2>
                {items.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-lg",
                  "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <ShoppingBag className="size-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground">{t("empty")}</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      {/* Thumbnail */}
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium leading-tight line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-sm font-bold text-primary">
                            {item.price.toLocaleString("tr-TR")} {tCommon("currency")}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className={cn(
                                "inline-flex size-7 items-center justify-center rounded-md",
                                "border border-border text-muted-foreground",
                                "transition-colors hover:bg-muted hover:text-foreground",
                              )}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className={cn(
                                "inline-flex size-7 items-center justify-center rounded-md",
                                "border border-border text-muted-foreground",
                                "transition-colors hover:bg-muted hover:text-foreground",
                              )}
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className={cn(
                              "inline-flex items-center gap-1 text-xs text-muted-foreground",
                              "transition-colors hover:text-destructive",
                            )}
                            aria-label={`${t("remove")} ${item.title}`}
                          >
                            <Trash2 className="size-3.5" />
                            <span className="hidden sm:inline">{t("remove")}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("total")}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {totalPrice().toLocaleString("tr-TR")} {tCommon("currency")}
                  </span>
                </div>

                {/* Order via WhatsApp */}
                <a
                  href={toWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl py-3",
                    "bg-[var(--whatsapp)] text-white font-medium",
                    "transition-all hover:brightness-110 hover:shadow-lg",
                    "active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--whatsapp)] focus-visible:ring-offset-2",
                  )}
                >
                  <MessageCircle className="size-5" />
                  {t("order")}
                </a>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  {t("remove")}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
