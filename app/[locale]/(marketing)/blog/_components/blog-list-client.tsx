"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { blogApi, type BlogPost } from "@/lib/api";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function BlogListClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const { data: postsData } = useQuery({
    queryKey: ["blog-posts", locale],
    queryFn: async () => {
      const response = await blogApi.getAll(locale);
      return response.posts;
    },
    initialData: initialPosts,
    staleTime: 60_000,
  });

  const posts = postsData ?? initialPosts;

  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">{t("noPosts")}</p>
          </div>
        )}

        {/* Blog grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {posts.map((post) => (
            <motion.article key={post.id} variants={cardVariants}>
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                className="glass-card group grid overflow-hidden rounded-2xl sm:grid-cols-3"
              >
                {/* Cover image */}
                <div className="relative aspect-video sm:aspect-auto sm:h-full">
                  <Image
                    src={post.imageUrl || "/images/placeholder-blog.jpg"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-6 sm:col-span-2 sm:p-8">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {post.publishedAt && (
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-SA" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                      </time>
                    )}
                    <span className="text-border">|</span>
                    <span>Elizim Atolye</span>
                  </div>

                  <h2 className="font-heading text-xl font-bold leading-snug transition-colors group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t("readMore")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
