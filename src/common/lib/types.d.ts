export type { Locale } from '@i18n/config';

export interface RawPageContext {
  params: Promise<{
    locale: Locale;
    slug?: string;
    id?: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string;
  }>;
}

export interface PageContext extends RawPageContext {
  translation: Record<string, string>;
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';