import type { ReactNode } from "react";

/* ── XSS-safe JSON-LD helper ── */

function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}

function JsonLdScript({ data }: { data: Record<string, unknown> }): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

/* ── LocalBusiness ── */

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Elizim",
    description:
      "El isciligi ile ozel tasarim ev tekstili urunleri. Nakis, dantel, bohca ve daha fazlasi.",
    url: "https://elizim.art",
    telephone: "+905448611479",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karabuk",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.2,
      longitude: 32.62,
    },
    image: "https://elizim.art/og-image.jpg",
    sameAs: [
      "https://instagram.com/eliziiim",
      "https://instagram.com/karabuknakis",
      "https://instagram.com/desen.im",
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return <JsonLdScript data={data} />;
}

/* ── Product ── */

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string | string[];
  price: number;
  currency?: string;
  url: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "TRY",
  url,
  availability = "InStock",
  sku,
}: ProductJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    url,
    brand: {
      "@type": "Brand",
      name: "Elizim",
    },
    offers: {
      "@type": "Offer",
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: "Elizim",
      },
    },
  };

  if (sku) {
    data.sku = sku;
  }

  return <JsonLdScript data={data} />;
}

/* ── FAQ ── */

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}

/* ── Article (BlogPosting) ── */

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  modifiedAt,
  author = "Elizim",
}: ArticleJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    image,
    datePublished: publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Elizim",
      url: "https://elizim.art",
      logo: {
        "@type": "ImageObject",
        url: "https://elizim.art/logo.png",
      },
    },
  };

  if (modifiedAt) {
    data.dateModified = modifiedAt;
  }

  return <JsonLdScript data={data} />;
}

/* ── Website ── */

export function WebsiteJsonLd({ locale = "tr" }: { locale?: string }) {
  const productPath =
    locale === "tr" ? "/urunler" : "/products";

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elizim",
    url: `https://elizim.art/${locale}`,
    inLanguage: locale === "tr" ? "tr-TR" : locale === "ar" ? "ar-SA" : "en-US",
    description:
      "El isciligi ile ozel tasarim ev tekstili urunleri",
    publisher: {
      "@type": "Organization",
      name: "Elizim",
      url: "https://elizim.art",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `https://elizim.art/${locale}${productPath}?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLdScript data={data} />;
}

/* ── Breadcrumb ── */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={data} />;
}
