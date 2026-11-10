import type { Metadata } from 'next';
import { use } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import AdminPlaceholder from '@/components/admin/AdminPlaceholder';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Admin.menu' });
  return { title: t('students') };
}

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <AdminPlaceholder menuKey="students" />;
}
