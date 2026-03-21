import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/marketing/whatsapp-fab";
import {
  LocalBusinessJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld";
import { useLocale } from "next-intl";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessJsonLd />
      <WebsiteJsonLd locale={locale} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
