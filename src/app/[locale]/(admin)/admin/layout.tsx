import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import '@/styles/fonts/phosphor/regular/style.css';
import '@/styles/fonts/tabler-icons.min.css';
import '@/styles/admin.scss';

import AdminShell from '@/components/admin/AdminShell';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';

const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-admin' });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: { default: t('adminTitle'), template: `%s | ${t('adminTitle')} · ${siteConfig.shortName}` },
    robots: { index: false, follow: false } // l'admin ne doit pas apparaître dans Google
  };
}

// Mise en page racine de l'ADMIN (thème Datta Able). Étape 2 : vérification de session et de rôle.
export default async function AdminLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={openSans.variable}>
      <body>
        <NextIntlClientProvider>
          <AdminShell>{children}</AdminShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
