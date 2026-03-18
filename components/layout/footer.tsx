import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type StaticPath = "/" | "/urunler" | "/hakkimizda" | "/iletisim" | "/blog" | "/sss" | "/fiyat-politikasi" | "/legal/gizlilik" | "/legal/kosullar" | "/legal/kvkk";

const INSTAGRAM_ACCOUNTS = [
  { handle: "@eliziiim", url: "https://instagram.com/eliziiim" },
  { handle: "@karabuknakis", url: "https://instagram.com/karabuknakis" },
  { handle: "@desen.im", url: "https://instagram.com/desen.im" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tLegal = useTranslations("legal");

  const quickLinks: { label: string; href: StaticPath }[] = [
    { label: tNav("products"), href: "/urunler" },
    { label: tNav("about"), href: "/hakkimizda" },
    { label: tNav("contact"), href: "/iletisim" },
    { label: tNav("blog"), href: "/blog" },
  ];

  const legalLinks: { label: string; href: StaticPath }[] = [
    { label: tLegal("privacy"), href: "/legal/gizlilik" },
    { label: tLegal("terms"), href: "/legal/kosullar" },
    { label: tLegal("kvkk"), href: "/legal/kvkk" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-primary">
                Elizim
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            {/* WhatsApp */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2",
                "bg-[var(--whatsapp)]/10 text-sm font-medium text-[var(--whatsapp)]",
                "transition-colors hover:bg-[var(--whatsapp)]/20",
              )}
            >
              <MessageCircle className="size-4" />
              +90 544 861 14 79
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("legal")}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {t("followUs")}
            </h3>
            <ul className="space-y-2">
              {INSTAGRAM_ACCOUNTS.map((account) => (
                <li key={account.handle}>
                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    {account.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} Elizim. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
