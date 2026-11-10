import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

/** Page intérieure provisoire : en-tête + message « en préparation ». */
export default function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const pages = useTranslations('Pages');
  const t = useTranslations('Placeholder');

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{pages(titleKey)}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="empty-state mb-4">
            <p className="mb-0">{t('soon')}</p>
          </div>
          <div className="d-flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              {t('contact')}
            </Link>
            <Link href="/" className="btn btn-outline-primary">
              <i className="ph ph-arrow-left me-1" aria-hidden="true" />
              {t('back')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
