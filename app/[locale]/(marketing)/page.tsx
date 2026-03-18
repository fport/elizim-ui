import { HeroSection } from "./_components/hero-section";
import { CategoriesSection } from "./_components/categories-section";
import { FeaturedProductsSection } from "./_components/featured-products-section";
import { InstagramFeedSection } from "./_components/instagram-feed-section";
import { FeaturesSection } from "./_components/features-section";
import { TestimonialSection } from "./_components/testimonial-section";
import { ContactCtaSection } from "./_components/contact-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <FeaturesSection />
      <TestimonialSection />
      <InstagramFeedSection />
      <ContactCtaSection />
    </>
  );
}
