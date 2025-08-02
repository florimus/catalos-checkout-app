import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { getLanguage } from '@/utils/commonUtils';
import { Locale } from '@/common/lib/types';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {

  const { locale } = (await params) || { locale: 'en-ae' };

  return {
    title: locale || 'Website',
    description: 'Your site description here',
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = (await params) || { locale: 'en-ae' };

  const language = getLanguage(locale);
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={language} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
