import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import '@/styles/fonts/phosphor/regular/style.css';
import '@/styles/public.scss';

import RevealObserver from '@/components/site/RevealObserver';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import WhatsAppButton from '@/components/site/WhatsAppButton';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';

const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
// Oswald : police condensée proche des titres de la brochure FATEC
const heading = Oswald({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Mobile (skill mobile-native) :
// - themeColor : barre du navigateur assortie au fond de l'en-tête. Une seule valeur : le site n'a qu'un thème clair.
// - colorScheme light : le mode sombre du téléphone ne repeint pas les contrôles natifs (barres de défilement, champs).
// - viewportFit cover : la page passe sous l'encoche ; les env(safe-area-inset-*) du CSS repoussent le contenu.
// - interactiveWidget : sur Android, le clavier réduit la page au lieu de la recouvrir (formulaires à venir).
// Jamais de maximumScale / userScalable : le zoom reste possible (accessibilité).
export const viewport: Viewport = {
  themeColor: '#fdf8f3',
  colorScheme: 'light',
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content'
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const name = `${siteConfig.shortName} – ${siteConfig.name[locale]}`;
  return {
    title: { default: name, template: `%s | ${siteConfig.shortName}` },
    description: t('description')
  };
}

// Mise en page racine du SITE PUBLIC (une autre mise en page racine existe pour l'admin).
export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <html lang={locale} className={`${body.variable} ${heading.variable}`}>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">
            {t('skip')}
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter locale={locale} />
          <WhatsAppButton />
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
