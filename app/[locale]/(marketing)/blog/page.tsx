import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogListClient } from "./_components/blog-list-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function BlogPage() {
  return <BlogListClient />;
}
