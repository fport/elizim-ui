import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PatternCatalogClient } from "./_components/pattern-catalog-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "patterns" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function PatternsPage() {
  return <PatternCatalogClient />;
}
