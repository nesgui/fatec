'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Bascule FR / EN : garde la page courante et passe à son URL traduite
 * (/fr/qui-sommes-nous <-> /en/about). next-intl mémorise le choix dans un cookie.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('Lang');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className={`lang-switch ${className}`} aria-label={t('label')}>
      {routing.locales.map((l) => (
        <Link key={l} href={pathname} locale={l} aria-current={l === locale ? 'true' : undefined} lang={l} title={t(l)}>
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
