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

export interface User {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  verified?: string | null;
}

export type Locale = 'en-ae' | 'ar-ae';

export type Language = 'en' | 'ar';
