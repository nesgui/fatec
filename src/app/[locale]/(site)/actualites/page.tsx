import type { Metadata } from 'next';
import { use } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import PlaceholderPage from '@/components/site/PlaceholderPage';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Pages' });
  return { title: t('news') };
}

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <PlaceholderPage titleKey="news" />;
}
