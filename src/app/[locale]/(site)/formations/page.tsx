import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero, ProgramCard } from '@/components/site/blocks';
import { academicYear, programs, studyModes } from '@/config/academics';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Pages' });
  return { title: t('programs') };
}

export default function ProgramsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = useTranslations('ProgramsPage');
  const pages = useTranslations('Pages');

  return (
    <>
      <PageHero eyebrow={t('year', { year: academicYear })} title={pages('programs')} intro={t('intro')} />

      <section className="section">
        <div className="container">
          <div data-reveal className="d-flex flex-wrap align-items-center gap-2 mb-5">
            <span className="me-2">{t('modes')}</span>
            {studyModes.map((m) => (
              <span className="mode-badge" key={m.id}>
                <i className={`ph ${m.icon}`} aria-hidden="true" /> {m.label[l]}
              </span>
            ))}
          </div>

          <div className="row g-4" data-reveal="stagger">
            {programs.map((p) => (
              <div className="col-md-6 col-xl-4" key={p.id} id={p.id}>
                <ProgramCard program={p} locale={l} />
              </div>
            ))}
          </div>

          <p className="text-muted small mt-4 mb-1">
            <i className="ph ph-laptop me-1" aria-hidden="true" />
            {t('onlineNote')}
          </p>
          <p className="text-muted small">
            <i className="ph ph-info me-1" aria-hidden="true" />
            {t('detailsSoon')}{' '}
            <Link href="/contact" className="fw-semibold">
              {t('detailsContact')}
            </Link>
          </p>

          <div data-reveal className="cta-band mt-5 d-md-flex align-items-center justify-content-between gap-4">
            <div>
              <h2 className="h3 mb-2">{t('ctaTitle')}</h2>
              <p className="mb-md-0">{t('ctaText')}</p>
            </div>
            <Link href="/admissions" className="btn btn-warning text-nowrap">
              {t('ctaButton')} <i className="ph ph-arrow-right ms-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
