import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="glass-card max-w-md rounded-3xl p-12">
        <h1 className="font-heading text-8xl font-bold text-primary">404</h1>
        <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-primary/30" />
        <p className="mt-6 text-lg text-muted-foreground">
          {t("error")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
