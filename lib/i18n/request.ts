import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, LOCALE_COOKIE, localeSchema } from "@/lib/i18n/config";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = localeSchema.catch(defaultLocale).parse(cookieLocale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
