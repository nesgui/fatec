import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/site/blocks';
import { siteConfig, whatsappUrl } from '@/config/site';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Pages' });
  return { title: t('support') };
}

// Étape 4 : ajouter ici le don en ligne (Mobile Money et paiement international).
export default function SupportPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('SupportPage');
  const pages = useTranslations('Pages');
  const common = useTranslations('Common');
  const wa = whatsappUrl();

  const funds = [
    { icon: 'ph-student', title: t('fund1Title'), text: t('fund1Text') },
    { icon: 'ph-books', title: t('fund2Title'), text: t('fund2Text') },
    { icon: 'ph-buildings', title: t('fund3Title'), text: t('fund3Text') }
  ];

  return (
    <>
      <PageHero title={pages('support')} intro={t('intro')} />

      <section className="section">
        <div className="container">
          <h2 data-reveal="type" className="section-title mb-4">{t('fundsTitle')}</h2>
          <div className="row g-4" data-reveal="stagger">
            {funds.map((f) => (
              <div className="col-md-4" key={f.title}>
                <div className="feature-card h-100">
                  <i className={`ph ${f.icon} fs-2 text-primary d-block mb-3`} aria-hidden="true" />
                  <h3 className="h4">{f.title}</h3>
                  <p className="mb-0">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="row g-4" data-reveal="stagger">
            <div className="col-lg-7">
              <div className="cta-band h-100">
                <h2 className="h3 mb-3">{t('howTitle')}</h2>
                <p className="mb-4">{t('howText')}</p>
                <div className="d-flex flex-wrap gap-3">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="btn btn-light">
                    <i className="ph ph-phone me-1" aria-hidden="true" /> {siteConfig.phone}
                  </a>
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                      <i className="ph ph-whatsapp-logo me-1" aria-hidden="true" /> {common('whatsappShort')}
                    </a>
                  )}
                  <a href={`mailto:${siteConfig.email}`} className="btn btn-outline-light text-break">
                    <i className="ph ph-envelope-simple me-1" aria-hidden="true" /> {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="feature-card h-100 d-flex flex-column justify-content-center">
                <h2 className="h3 mb-3">{t('partnerTitle')}</h2>
                <p className="mb-3">{t('partnerText')}</p>
                <a href={`mailto:${siteConfig.email}`} className="fw-semibold text-break">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
