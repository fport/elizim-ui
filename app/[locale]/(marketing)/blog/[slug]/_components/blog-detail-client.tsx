"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogApi, type BlogPost } from "@/lib/api";

const placeholderPost: BlogPost = {
  id: "1",
  title: "Nakış Sanatının Tarihçesi ve Anadolu'daki Yeri",
  slug: "nakis-sanatinin-tarihcesi",
  excerpt:
    "Binlerce yıllık geçmişe sahip nakış sanatı, Anadolu kültüründe önemli bir yere sahiptir.",
  content: `
<h2>Nakış Sanatının Kökenleri</h2>
<p>Nakış, insanlık tarihinin en eski el sanatlarından biridir. Anadolu topraklarında binlerce yıldır sürdürülen bu gelenek, nesilden nesile aktarılarak günümüze kadar ulaşmıştır.</p>

<h2>Anadolu Nakış Geleneği</h2>
<p>Anadolu'nun her bölgesinde kendine özgü nakış teknikleri ve motifleri gelişmiştir. Karabük ve çevresi de bu zengin geleneğin önemli merkezlerinden biridir. Yöresel motifler, doğadan ve günlük yaşamdan ilham alarak şekillenmiştir.</p>

<h3>Kullanılan Teknikler</h3>
<ul>
  <li>Çapraz iğne (kanaviçe)</li>
  <li>Düz iğne nakışı</li>
  <li>Türk işi</li>
  <li>Hesap işi</li>
</ul>

<h2>Günümüzde Nakış</h2>
<p>Modern tasarım anlayışı ile geleneksel tekniklerin buluşması, nakış sanatına yeni bir soluk getirmektedir. Elizim olarak biz de bu geleneği yaşatırken, çağdaş tasarımlarla harmanlıyoruz.</p>

<blockquote>
  <p>"El işçiliği, bir kültürün en samimi ifadesidir. Her dikiş, her ilmek bir hikaye anlatır."</p>
</blockquote>

<p>Atölyemizde ürettiğimiz her ürün, bu köklü geleneğin izlerini taşır. Geleneksel motifleri modern çizgilerle buluşturarak, hem nostaljik hem de çağdaş ürünler ortaya koyuyoruz.</p>
  `.trim(),
  category: null,
  tags: null,
  imageUrl: "/images/placeholder-blog.jpg",
  locale: "tr",
  isPublished: true,
  publishedAt: "2025-01-15T10:00:00Z",
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z",
};

export function BlogDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("blog");
  const locale = useLocale();

  const { data: postData } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const response = await blogApi.getBySlug(slug);
      return response.post;
    },
    placeholderData: placeholderPost,
    retry: false,
  });

  const post = postData ?? placeholderPost;

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={post.imageUrl || "/images/placeholder-blog.jpg"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </motion.div>

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
            Elizim Atölye
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Bottom navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
