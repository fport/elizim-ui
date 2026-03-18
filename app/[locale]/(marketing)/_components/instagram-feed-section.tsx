"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Instagram, Play, ExternalLink } from "lucide-react";
import { instagramApi, type InstagramPost } from "@/lib/api";

const placeholderPosts: InstagramPost[] = [
  {
    id: "1",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "Yeni nakış tasarımlarımız",
    mediaType: "IMAGE",
    timestamp: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "Atölyeden kareler",
    mediaType: "VIDEO",
    timestamp: "2025-01-14T10:00:00Z",
  },
  {
    id: "3",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "Dantel yapım süreci",
    mediaType: "IMAGE",
    timestamp: "2025-01-13T10:00:00Z",
  },
  {
    id: "4",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "El işi masa örtüsü",
    mediaType: "IMAGE",
    timestamp: "2025-01-12T10:00:00Z",
  },
  {
    id: "5",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "Bohça hazırlığı",
    mediaType: "VIDEO",
    timestamp: "2025-01-11T10:00:00Z",
  },
  {
    id: "6",
    mediaUrl: "/images/placeholder-ig.jpg",
    permalink: "https://instagram.com/elizim.art",
    caption: "Yeni sezon ürünler",
    mediaType: "IMAGE",
    timestamp: "2025-01-10T10:00:00Z",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function InstagramFeedSection() {
  const t = useTranslations("instagram");

  const { data: posts } = useQuery({
    queryKey: ["instagram-feed"],
    queryFn: async () => {
      const response = await instagramApi.getFeed();
      return response.data;
    },
    placeholderData: placeholderPosts,
    retry: false,
  });

  const feedPosts = posts ?? placeholderPosts;

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Instagram className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              @elizim.art
            </span>
          </div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Instagram grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6"
        >
          {feedPosts.slice(0, 6).map((post) => (
            <motion.a
              key={post.id}
              variants={cardVariants}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={post.mediaUrl}
                alt={post.caption || "Instagram post"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Video play overlay */}
              {post.mediaType === "VIDEO" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <Play className="size-5 fill-current" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <ExternalLink className="size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow button */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com/elizim.art"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-all hover:border-primary hover:text-primary"
          >
            <Instagram className="size-4" />
            {t("follow")} @elizim.art
          </a>
        </div>
      </div>
    </section>
  );
}
