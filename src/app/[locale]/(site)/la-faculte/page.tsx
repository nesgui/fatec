import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CampusBlock, FounderBlock, PageHero, ValuesList } from '@/components/site/blocks';
import { confessionOfFaith } from '@/config/academics';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Pages' });
  return { title: t('about') };
}

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = useTranslations('AboutPage');
  const pages = useTranslations('Pages');
  const common = useTranslations('Common');
  const home = useTranslations('Home');

  return (
    <>
      <PageHero title={pages('about')} intro={t('intro')} />

      {/* Mission + valeurs */}
      <section className="section">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-lg-6">
              <h2 data-reveal="type" className="section-title">{t('missionTitle')}</h2>
              <p data-reveal="line" className="mission-text">{common('mission')}</p>
            </div>
            <div className="col-lg-6">
              <h2 data-reveal="type" className="values-title">{common('valuesTitle')}</h2>
              <p data-reveal className="lead-muted mb-4">{home('valuesText')}</p>
              <ValuesList />
            </div>
          </div>
        </div>
      </section>

      {/* Fondateur (TODO : ajouter son message et l'historique de la Faculté) */}
      <section className="section section-alt">
        <div className="container">
          <FounderBlock locale={l} eyebrow={home('founderEyebrow')} />
        </div>
      </section>

      {/* Campus */}
      <section className="section">
        <div className="container">
          <CampusBlock locale={l} title={t('campusTitle')} />
        </div>
      </section>

      {/* Confession de foi */}
      <section className="section section-alt" id="confession">
        <div className="container">
          <h2 data-reveal="type" className="section-title">{t('confessionTitle')}</h2>
          <p data-reveal className="lead-muted mb-4">{t('confessionIntro')}</p>
          <ol className="confession">
            {confessionOfFaith.map((c) => (
              <li key={c.ref.fr} data-reveal>
                <p className="mb-1">{c.text[l]}</p>
                <cite>{c.ref[l]}</cite>
              </li>
            ))}
          </ol>
          {t('translationNote') && <p className="text-muted small mt-3">{t('translationNote')}</p>}
        </div>
      </section>
    </>
  );
}
