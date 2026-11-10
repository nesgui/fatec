import Image from 'next/image';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { CampusBlock, FounderBlock, ProgramCard, ValuesList } from '@/components/site/blocks';
import { academicYear, programs } from '@/config/academics';
import { siteConfig } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Home');
  const common = useTranslations('Common');
  const programsT = useTranslations('ProgramsPage');
  const l = locale as Locale;

  return (
    <>
      {/* 1. Bandeau d'accueil */}
      <section className="hero">
        <Image src={siteConfig.logo.white} alt="" width={369} height={397} className="hero-watermark d-none d-lg-block" priority />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <span className="eyebrow">{t('heroEyebrow')}</span>
          <h1 className="mb-4">{t('heroTitle')}</h1>
          <p className="hero-text mb-5">{t('heroText')}</p>
          <div className="hero-actions d-flex flex-wrap gap-3">
            <Link href="/formations" className="btn btn-light btn-lg">
              {t('heroCtaPrograms')}
            </Link>
            <Link href="/admissions" className="btn btn-outline-light btn-lg">
              {t('heroCtaApply')}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Coordonnées, visibles tout de suite */}
      <div className="times-bar">
        <div className="container">
          <div className="times-card">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 col-lg-4">
                <div className="time-item">
                  <div>
                    <p className="time-label">{t('infoLocation')}</p>
                    <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="time-value d-block">
                      {siteConfig.address.street}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="time-item">
                  <div>
                    <p className="time-label">{t('infoCall')}</p>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="time-value d-block">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="time-item">
                  <div className="text-break">
                    <p className="time-label">{t('infoWrite')}</p>
                    <a href={`mailto:${siteConfig.email}`} className="time-value d-block">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mission + valeurs E.O.E */}
      <section className="section">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-lg-6">
              <span data-reveal className="eyebrow">{t('missionEyebrow')}</span>
              <h2 data-reveal="type" className="section-title">{t('missionTitle')}</h2>
              <p data-reveal="line" className="mission-text">{common('mission')}</p>
            </div>
            <div className="col-lg-6">
              <h3 data-reveal="type" className="values-title">{common('valuesTitle')}</h3>
              <p data-reveal className="lead-muted mb-4">{t('valuesText')}</p>
              <ValuesList />
            </div>
          </div>
        </div>
      </section>

      {/* 3b. Le campus : une vraie photo rassure plus que n'importe quel texte */}
      <section className="section section-alt">
        <div className="container">
          <CampusBlock locale={l} />
        </div>
      </section>

      {/* 4. Le fondateur */}
      <section className="section">
        <div className="container">
          <FounderBlock locale={l} eyebrow={t('founderEyebrow')}>
            <Link href="/la-faculte" className="btn btn-outline-primary">
              {t('founderCta')} <i className="ph ph-arrow-right ms-1" aria-hidden="true" />
            </Link>
          </FounderBlock>
        </div>
      </section>

      {/* 5. Formations (données : config/academics.ts) */}
      <section className="section section-alt">
        <div className="container">
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <h2 data-reveal="type" className="section-title mb-0">{t('programsTitle')}</h2>
            <Link href="/formations" className="text-nowrap ms-3">
              {t('seeAll')}
            </Link>
          </div>
          <p data-reveal className="lead-muted mb-4">{programsT('modes')}</p>
          <div className="row g-4" data-reveal="stagger">
            {programs.map((p) => (
              <div className="col-md-6 col-xl-4" key={p.id}>
                <Link href={{ pathname: '/formations', hash: p.id }} className="card-link">
                  <ProgramCard program={p} locale={l} compact />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5b. Actualités : à réintroduire (fond section-alt) quand l'admin publiera les premières actualités (étape 3).
          Une section vide sur l'accueil donne l'image d'un site inachevé. */}

      {/* 6. Admissions et soutien */}
      <section className="section">
        <div className="container">
          <div className="row g-4" data-reveal="stagger">
            <div className="col-lg-7">
              <div className="cta-band h-100">
                <h2 className="h1 mb-3">{t('admissionsTitle', { year: academicYear })}</h2>
                <p className="mb-4">{t('admissionsText')}</p>
                <Link href="/admissions" className="btn btn-warning">
                  {t('admissionsCta')}
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="feature-card d-flex flex-column justify-content-center">
                <h2 className="h3 mb-3">{t('supportTitle')}</h2>
                <p className="mb-4">{t('supportText')}</p>
                <div>
                  <Link href="/soutenir" className="btn btn-outline-primary">
                    {t('supportCta')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
