const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

/* ── Types ── */

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  images: string[];
  categoryId: string;
  categoryName: string;
  deliveryDays: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  locale: string;
  publishedAt: string;
  author: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
}

/* ── Fetch helper ── */

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
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

export interface ProductsParams {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  search?: string;
  sort?: "newest" | "price_asc" | "price_desc";
  featured?: boolean;
}

export const productsApi = {
  getAll: (params?: ProductsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));
    if (params?.categorySlug) searchParams.set("categorySlug", params.categorySlug);
    if (params?.search) searchParams.set("search", params.search);
    if (params?.sort) searchParams.set("sort", params.sort);
    if (params?.featured) searchParams.set("featured", "true");
    const qs = searchParams.toString();
    return apiFetch<ApiResponse<Product[]>>(`/api/products${qs ? `?${qs}` : ""}`);
  },

  getBySlug: (slug: string) =>
    apiFetch<ApiResponse<Product>>(`/api/products/${slug}`),
};

/* ── Categories ── */

export const categoriesApi = {
  getAll: () => apiFetch<ApiResponse<Category[]>>("/api/categories"),
};

/* ── Instagram ── */

export const instagramApi = {
  getFeed: () =>
    apiFetch<ApiResponse<InstagramPost[]>>("/api/instagram/feed"),
};

/* ── Blog ── */

export const blogApi = {
  getAll: (locale?: string) => {
    const qs = locale ? `?locale=${locale}` : "";
    return apiFetch<ApiResponse<BlogPost[]>>(`/api/blog${qs}`);
  },

  getBySlug: (slug: string) =>
    apiFetch<ApiResponse<BlogPost>>(`/api/blog/${slug}`),
};

/* ── Contact ── */

export const contactApi = {
  submit: (data: ContactFormData) =>
    apiFetch<{ success: boolean; message: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
