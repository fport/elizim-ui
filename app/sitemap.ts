import type { MetadataRoute } from "next";

const BASE_URL = "https://elizim.art";
const LOCALES = ["tr", "en", "ar"] as const;

const staticPages = [
  "",
  "/urunler",
  "/hakkimizda",
  "/iletisim",
  "/blog",
  "/sss",
  "/fiyat-politikasi",
  "/legal/gizlilik",
  "/legal/kosullar",
  "/legal/kvkk",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      const path = locale === "tr" ? page : `/${locale}${page}`;

      entries.push({
        url: `${BASE_URL}${path || "/"}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : page === "/urunler" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page === "/urunler" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              `${BASE_URL}${l === "tr" ? page || "/" : `/${l}${page}`}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
