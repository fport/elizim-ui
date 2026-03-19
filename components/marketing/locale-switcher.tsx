"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const locales = [
  { code: "tr" as const, flag: "\u{1F1F9}\u{1F1F7}", label: "TR" },
  { code: "en" as const, flag: "\u{1F1EC}\u{1F1E7}", label: "EN" },
  { code: "ar" as const, flag: "\u{1F1F8}\u{1F1E6}", label: "AR" },
];

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(nextLocale: "tr" | "en" | "ar") {
    // pathname may include dynamic segments; cast is safe here
    // as the proxy resolves the correct localized path
    router.replace(pathname as "/", { locale: nextLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5",
          "border border-border bg-background text-sm font-medium text-foreground",
          "transition-colors hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute end-0 top-full z-50 mt-1.5 min-w-[120px]",
            "rounded-lg border border-border bg-popover p-1 shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {locales.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => switchLocale(l.code)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm",
                "transition-colors hover:bg-muted",
                l.code === locale && "bg-muted font-medium text-primary",
              )}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
