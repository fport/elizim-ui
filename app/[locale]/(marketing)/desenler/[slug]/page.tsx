import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PatternDetailClient } from "./_components/pattern-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "patterns" });

  const patternTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: patternTitle,
    description: `${patternTitle} - ${t("title")}`,
    openGraph: {
      title: `${patternTitle} | Elizim`,
      description: `${patternTitle} - ${t("subtitle")}`,
    },
  };
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <PatternDetailClient slug={slug} />

      {/* Pattern JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            brand: {
              "@type": "Brand",
              name: "Elizim",
            },
            category: "Embroidery Pattern",
            offers: {
              "@type": "Offer",
              priceCurrency: "TRY",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Elizim",
              },
            },
          }),
        }}
      />
    </>
  );
}
