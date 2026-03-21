const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

/* ── Types (backend schema ile uyumlu) ── */

export enum ProductTag {
  BEST_SELLER = "BEST_SELLER",
  GOOD_PRICE = "GOOD_PRICE",
  PRODUCT_OF_MONTH = "PRODUCT_OF_MONTH",
  RECOMMENDED = "RECOMMENDED",
  NEW = "NEW",
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number; // kuruş
  deliveryTime: string | null;
  categoryId: string | null;
  tags: string | null;
  productTag: ProductTag | null;
  images: string | null; // JSON string
  thumbnailUrl: string | null;
  instagramPostId: string | null;
  isActive: boolean;
  whatsappText: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  description: string | null;
  badgeText: string | null;
  linkUrl: string | null;
  linkText: string | null;
  bgColor: string | null; // tailwind class or hex
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  tags: string | null;
  imageUrl: string | null;
  locale: string;
  groupId: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InstagramPost {
  id: string;
  instagramId: string;
  accountHandle: string | null;
  mediaType: string | null;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  caption: string | null;
  permalink: string | null;
  timestamp: string | null;
  linkedProductId: string | null;
  cachedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/* ── Fetch helper ── */

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

/* ── Products ── */

export const productsApi = {
  getAll: (params?: {
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    const sp = new URLSearchParams();
    if (params?.category) sp.set("category", params.category);
    if (params?.search) sp.set("search", params.search);
    if (params?.sort) sp.set("sort", params.sort);
    const qs = sp.toString();
    return apiFetch<{ products: Product[] }>(`/api/products${qs ? `?${qs}` : ""}`);
  },

  getBySlug: (slug: string) =>
    apiFetch<{ product: Product }>(`/api/products/${slug}`),
};

/* ── Categories ── */

export const categoriesApi = {
  getAll: () => apiFetch<{ categories: Category[] }>("/api/categories"),
};

/* ── Instagram ── */

export const instagramApi = {
  getFeed: () => apiFetch<{ posts: InstagramPost[] }>("/api/instagram/feed"),
};

/* ── Blog ── */

export const blogApi = {
  getAll: (locale?: string) => {
    const qs = locale ? `?locale=${locale}` : "";
    return apiFetch<{ posts: BlogPost[] }>(`/api/blog${qs}`);
  },

  getBySlug: (slug: string) =>
    apiFetch<{ post: BlogPost }>(`/api/blog/${slug}`),
};

/* ── Banners ── */

export const bannersApi = {
  getActive: () =>
    apiFetch<{ banners: PromoBanner[] }>("/api/banners?active=true"),
};

/* ── Contact ── */

export const contactApi = {
  submit: (data: ContactFormData) =>
    apiFetch<{ success: boolean; message: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* ── Patterns ── */

export interface Pattern {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  tags: string | null;
  previewImageUrl: string | null;
  images: string | null;
  formats: string;
  difficulty: string | null;
  stitchCount: number | null;
  dimensions: string | null;
  colorCount: number | null;
  isActive: boolean;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export const patternsApi = {
  getAll: (params?: { category?: string; search?: string; sort?: string }) => {
    const sp = new URLSearchParams();
    if (params?.category) sp.set("category", params.category);
    if (params?.search) sp.set("search", params.search);
    if (params?.sort) sp.set("sort", params.sort);
    const qs = sp.toString();
    return apiFetch<{ patterns: Pattern[] }>(`/api/patterns${qs ? `?${qs}` : ""}`);
  },
  getBySlug: (slug: string) => apiFetch<{ pattern: Pattern }>(`/api/patterns/${slug}`),
};
