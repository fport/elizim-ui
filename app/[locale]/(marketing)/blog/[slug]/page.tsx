import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { blogApi } from "@/lib/api";
import { BlogDetailClient } from "./_components/blog-detail-client";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  try {
    const data = await blogApi.getBySlug(slug);
    const post = data.post;

    return {
      title: post.title,
      description: post.excerpt || `${post.title} - Elizim`,
      openGraph: {
        title: `${post.title} | Elizim`,
        description: post.excerpt || `${post.title} - Elizim`,
        type: "article",
        publishedTime: post.publishedAt || undefined,
        ...(post.imageUrl && {
          images: [{ url: post.imageUrl, width: 1200, height: 630 }],
        }),
      },
    };
  } catch {
    return {
      title: t("title"),
      description: t("subtitle"),
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let post = null;
  let translations: { locale: string; slug: string; title: string }[] = [];

  try {
    const data = await blogApi.getBySlug(slug);
    post = data.post;
    translations = (data as Record<string, unknown>).translations as typeof translations ?? [];
  } catch {
    // will show not found in client
  }

  return (
    <BlogDetailClient
      slug={slug}
      initialPost={post}
      translations={translations}
    />
  );
}
