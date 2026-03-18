import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductDetailClient } from "./_components/product-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  // In production this would fetch the real product title
  const productTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: productTitle,
    description: `${productTitle} - ${t("title")}`,
    openGraph: {
      title: `${productTitle} | Elizim`,
      description: `${productTitle} - ${t("subtitle")}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <ProductDetailClient slug={slug} />

      {/* Product JSON-LD */}
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
