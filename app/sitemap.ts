import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elizim.art";

// Internal path → localized paths per locale
const localizedPaths: Record<string, Record<string, string>> = {
  "": { tr: "", en: "", ar: "" },
  "/urunler": { tr: "/urunler", en: "/products", ar: "/products" },
  "/hakkimizda": { tr: "/hakkimizda", en: "/about", ar: "/about" },
  "/iletisim": { tr: "/iletisim", en: "/contact", ar: "/contact" },
  "/blog": { tr: "/blog", en: "/blog", ar: "/blog" },
  "/sss": { tr: "/sss", en: "/faq", ar: "/faq" },
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
  "/legal/kvkk": { tr: "/legal/kvkk", en: "/legal/kvkk", ar: "/legal/kvkk" },
};

const LOCALES = ["tr", "en", "ar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const [internalPath, paths] of Object.entries(localizedPaths)) {
    for (const locale of LOCALES) {
      const localizedPath = paths[locale];
      const url = `${BASE_URL}/${locale}${localizedPath || ""}`;

      entries.push({
        url,
        lastModified: now,
        changeFrequency:
          internalPath === ""
            ? "daily"
            : internalPath === "/urunler" || internalPath === "/blog"
              ? "daily"
              : internalPath.startsWith("/legal")
                ? "yearly"
                : "weekly",
        priority:
          internalPath === ""
            ? 1.0
            : internalPath === "/urunler"
              ? 0.9
              : internalPath === "/blog"
                ? 0.8
                : internalPath.startsWith("/legal")
                  ? 0.3
                  : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${paths[l] || ""}`])
          ),
        },
      });
    }
  }

  return entries;
}
