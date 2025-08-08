import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from './utils/constants';
import { COOKIE_KEYS } from './core/constants';
import { getLanguage } from './utils/commonUtils';
import { Locale } from './common/lib/types';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname, search, searchParams } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const orderId = searchParams.get(COOKIE_KEYS.ORDER_ID);
  const token = searchParams.get(COOKIE_KEYS.TOKEN);

  const res = NextResponse.next();

  if (orderId) {
    res.cookies.set(COOKIE_KEYS.ORDER_ID, orderId, {
      httpOnly: true,
      path: '/',
    });
  }

  if (token) {
    res.cookies.set(COOKIE_KEYS.TOKEN, token, { httpOnly: true, path: '/' });
  }

  const hasLocale = LOCALES.some((locale) => pathname.startsWith(`/${locale}`));

  if (hasLocale) {
    const language = getLanguage(pathname.split('/')[1] as Locale);
    if (language) {
      res.cookies.set(COOKIE_KEYS.LANGUAGE, language.toUpperCase(), {
        httpOnly: true,
        path: '/',
      });
    }
    return res;
  }

  const defaultLocale = DEFAULT_LOCALE;
  const redirectUrl = new URL(`/${defaultLocale}${pathname}${search}`, req.url);

  return NextResponse.redirect(redirectUrl);
}
