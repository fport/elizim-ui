"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, User, Globe } from "lucide-react";
import { blogApi, type BlogPost } from "@/lib/api";

const localeLabels: Record<string, string> = {
  tr: "Turkce",
  en: "English",
  ar: "العربية",
};

interface BlogDetailProps {
  slug: string;
  initialPost: BlogPost | null;
  translations: { locale: string; slug: string; title: string }[];
}

export function BlogDetailClient({ slug, initialPost, translations }: BlogDetailProps) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const { data: postData } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const response = await blogApi.getBySlug(slug);
      return response.post;
    },
    initialData: initialPost ?? undefined,
    staleTime: 60_000,
  });

  const post = postData ?? initialPost;

  if (!post) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>
        <Link
          href="/blog"
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>
      </div>
    );
  }

  return (
    <article className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>

        {/* Cover image */}
        {post.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-4" />
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-SA" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="size-4" />
            Elizim Atolye
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading text-3xl font-bold leading-tight sm:text-4xl"
        >
          {post.title}
        </motion.h1>

        {/* Language switcher */}
        {translations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 flex items-center gap-2"
          >
            <Globe className="size-3.5 text-muted-foreground" />
            {translations.map((tr) => (
              <Link
                key={tr.locale}
                href={{
                  pathname: "/blog/[slug]",
                  params: { slug: tr.slug },
                }}
                locale={tr.locale}
                className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {localeLabels[tr.locale] || tr.locale}
              </Link>
            ))}
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Tags */}
        {post.tags && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {post.tags.split(",").map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag.trim()}
              </span>
            ))}
          </motion.div>
        )}

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 border-t border-border pt-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-all hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            {t("backToBlog")}
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
