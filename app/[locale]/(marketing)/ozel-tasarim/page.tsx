import { useTranslations } from "next-intl";
import { DesignGallery } from "./_components/design-gallery";
import { SeoContent } from "./_components/seo-content";

export default function CustomDesignPage() {
  const t = useTranslations("customDesign");

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="liquid-blob -top-20 left-1/4 h-72 w-72 bg-primary/20" />
        <div
          className="liquid-blob -bottom-10 right-1/4 h-56 w-56 bg-accent/30"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {t("title")}
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("subtitle")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Gallery + Create Your Own */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <DesignGallery />
      </section>

      {/* SEO Content */}
      <SeoContent />
    </main>
  );
}
