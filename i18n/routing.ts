import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["tr", "en", "ar"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/urunler": {
      tr: "/urunler",
      en: "/products",
      ar: "/products",
    },
    "/urunler/[slug]": {
      tr: "/urunler/[slug]",
      en: "/products/[slug]",
      ar: "/products/[slug]",
    },
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
      ar: "/about",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
      ar: "/contact",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/sss": {
      tr: "/sss",
      en: "/faq",
      ar: "/faq",
    },
    "/fiyat-politikasi": {
      tr: "/fiyat-politikasi",
      en: "/pricing-policy",
      ar: "/pricing-policy",
    },
    "/legal/gizlilik": {
      tr: "/legal/gizlilik",
      en: "/legal/privacy",
      ar: "/legal/privacy",
    },
    "/legal/kosullar": {
      tr: "/legal/kosullar",
      en: "/legal/terms",
      ar: "/legal/terms",
    },
    "/legal/kvkk": {
      tr: "/legal/kvkk",
      en: "/legal/kvkk",
      ar: "/legal/kvkk",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
