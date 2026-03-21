"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const OCCASION_LINKS = [
  { slug: "sevgililer-gunu", key: "occasionValentines" },
  { slug: "dogum-gunu", key: "occasionBirthday" },
  { slug: "yildonumu", key: "occasionAnniversary" },
  { slug: "anneler-gunu", key: "occasionMothersDay" },
  { slug: "babalar-gunu", key: "occasionFathersDay" },
  { slug: "dugun", key: "occasionWedding" },
  { slug: "mezuniyet", key: "occasionGraduation" },
  { slug: "yeni-yil", key: "occasionNewYear" },
  { slug: "bebek", key: "occasionBaby" },
];

export function SeoContent() {
  const t = useTranslations("customDesign");
  const ts = useTranslations("occasionPages");

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          {ts("mainSeoTitle")}
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{ts("mainSeoP1")}</p>
          <p>{ts("mainSeoP2")}</p>
          <p>{ts("mainSeoP3")}</p>
        </div>

        {/* Occasion links for internal linking / SEO */}
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {ts("browseByOccasion")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {OCCASION_LINKS.map((o) => (
              <Link
                key={o.slug}
                href={{ pathname: "/ozel-tasarim/[slug]", params: { slug: o.slug } }}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {t(o.key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
