import { HeroSection } from "./_components/hero-section";
import { FeaturedProductsSection } from "./_components/featured-products-section";
import { TrustStripSection } from "./_components/trust-strip-section";
import { CategoriesSection } from "./_components/categories-section";
import { TestimonialSection } from "./_components/testimonial-section";
// import { InstagramFeedSection } from "./_components/instagram-feed-section";
import { ContactCtaSection } from "./_components/contact-cta-section";
import { CustomDesignCtaSection } from "./_components/custom-design-cta-section";
import { FaqSection } from "./_components/faq-section";
import { PromoBannerSection } from "./_components/promo-banner-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <FeaturedProductsSection />
      <PromoBannerSection variant="spring" />
      <CategoriesSection />
      <CustomDesignCtaSection />
      <TestimonialSection />
      <PromoBannerSection variant="flash" />
      <FaqSection />
      <ContactCtaSection />
      {/* <InstagramFeedSection /> */}
    </>
  );
}
