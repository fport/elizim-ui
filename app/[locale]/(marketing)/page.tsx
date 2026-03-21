import { HeroSection } from "./_components/hero-section";
import { FeaturedProductsSection } from "./_components/featured-products-section";
import { TrustStripSection } from "./_components/trust-strip-section";
import { CategoriesSection } from "./_components/categories-section";
import { TestimonialSection } from "./_components/testimonial-section";
// import { InstagramFeedSection } from "./_components/instagram-feed-section";
import { ContactCtaSection } from "./_components/contact-cta-section";
import { FaqSection } from "./_components/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <TestimonialSection />
      <FaqSection />
      <ContactCtaSection />
      {/* <InstagramFeedSection /> */}
    </>
  );
}
