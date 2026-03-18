import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "tr" | "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  let messages;
  if (locale === "tr") {
    messages = (await import("@/messages/tr.json")).default;
  } else if (locale === "ar") {
    messages = (await import("@/messages/ar.json")).default;
  } else {
    messages = (await import("@/messages/en.json")).default;
  }

  return {
    locale,
    messages,
  };
});
