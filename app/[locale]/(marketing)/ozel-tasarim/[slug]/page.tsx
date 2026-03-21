import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { OCCASIONS, getOccasionBySlug } from "../_lib/occasions";
import { OccasionPageClient } from "./_components/occasion-page-client";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const occasion = getOccasionBySlug(slug);
  if (!occasion) return {};

  const t = await getTranslations({ locale, namespace: "occasionPages" });
  const metaKey = occasion.slug as Parameters<typeof t>[0];

  return {
    title: t(`${metaKey}.metaTitle` as Parameters<typeof t>[0]),
    description: t(`${metaKey}.metaDescription` as Parameters<typeof t>[0]),
    openGraph: {
      title: t(`${metaKey}.metaTitle` as Parameters<typeof t>[0]),
      description: t(`${metaKey}.metaDescription` as Parameters<typeof t>[0]),
      images: [{ url: occasion.image }],
    },
  };
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params;
  const occasion = getOccasionBySlug(slug);
  if (!occasion) notFound();

  return <OccasionPageClient slug={slug} occasionKey={occasion.key} />;
}
