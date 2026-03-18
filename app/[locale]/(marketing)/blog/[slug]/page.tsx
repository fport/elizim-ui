import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogDetailClient } from "./_components/blog-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const postTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: postTitle,
    description: `${postTitle} - ${t("title")}`,
    openGraph: {
      title: `${postTitle} | Elizim ${t("title")}`,
      description: `${postTitle} - ${t("subtitle")}`,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  return <BlogDetailClient slug={slug} />;
}
