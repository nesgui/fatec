import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/site/blocks';
import { academicYear, applicationFeeUsd, applicationFormUrl, requiredDocuments } from '@/config/academics';
import { siteConfig, whatsappUrl } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Pages' });
  return { title: t('admissions') };
}

export default function AdmissionsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = useTranslations('AdmissionsPage');
  const pages = useTranslations('Pages');
  const wa = whatsappUrl();

  const steps = [
    { title: t('step1Title'), text: t('step1Text') },
    { title: t('step2Title'), text: t('step2Text') },
    { title: t('step3Title'), text: t('step3Text', { fee: applicationFeeUsd }) },
    { title: t('step4Title'), text: t('step4Text') }
  ];

  return (
    <>
      <PageHero title={pages('admissions')} intro={t('intro', { year: academicYear })} />

      {/* Étapes */}
      <section className="section">
        <div className="container">
          <h2 data-reveal="type" className="section-title mb-4">{t('stepsTitle')}</h2>
          <ol className="steps row g-4 list-unstyled" data-reveal="stagger">
            {steps.map((s, i) => (
              <li className="col-md-6 col-xl-3" key={s.title}>
                <div className="feature-card">
                  <span className="step-number" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-4">
            <a href={applicationFormUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {t('formButton')} <i className="ph ph-arrow-up-right ms-1" aria-hidden="true" />
            </a>
            <p className="text-muted small mt-2 mb-0">{t('formNote')}</p>
          </div>
        </div>
      </section>

      {/* Pièces et informations demandées */}
      <section className="section section-alt">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-7">
              <h2 data-reveal="type" className="section-title mb-4">{t('docsTitle')}</h2>
              <ul className="doc-list" data-reveal="stagger">
                {requiredDocuments.map((d) => (
                  <li key={d.label.fr}>
                    <i className="ph ph-file-text" aria-hidden="true" />
                    <span>
                      {d.label[l]}
                      {d.note && <span className="text-muted"> ({d.note[l]})</span>}
                    </span>
                    {d.required && <span className="badge-required">{t('required')}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5">
              <h2 data-reveal="type" className="section-title mb-4">{t('infoTitle')}</h2>
              <ul className="check-list" data-reveal="stagger">
                {(['info1', 'info2', 'info3', 'info4', 'info5', 'info6'] as const).map((k) => (
                  <li key={k}>
                    <i className="ph ph-check-circle" aria-hidden="true" />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Confession de foi + contact */}
      <section className="section">
        <div className="container">
          <div className="row g-4" data-reveal="stagger">
            <div className="col-lg-6">
              <div className="feature-card">
                <h2 className="h3">{t('confessionTitle')}</h2>
                <p className="mb-3">{t('confessionText')}</p>
                <Link href={{ pathname: '/la-faculte', hash: 'confession' }} className="fw-semibold">
                  {t('confessionLink')} <i className="ph ph-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-card">
                <h2 className="h3">{t('contactTitle')}</h2>
                <p className="mb-2">{t('contactText')}</p>
                <a href={`mailto:${siteConfig.email}`} className="fw-semibold text-break">
                  {siteConfig.email}
                </a>
                {wa && (
                  <p className="mt-3 mb-0">
                    {t('contactWhatsapp')}{' '}
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="fw-semibold">
                      <i className="ph ph-whatsapp-logo me-1" aria-hidden="true" />
                      {siteConfig.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
