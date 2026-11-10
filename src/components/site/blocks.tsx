import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Program } from '@/config/academics';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/i18n/routing';

/** En-tête des pages intérieures. */
export function PageHero({ title, intro, eyebrow }: { title: string; intro?: string; eyebrow?: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p className="lead-muted mt-3 mb-0">{intro}</p>}
      </div>
    </section>
  );
}

// Les trois valeurs E.O.E de la brochure, avec les couleurs du « cercle des valeurs ».
const values = [
  { title: 'valueErudition', sub: 'valueEruditionSub', tone: 'value-erudition' },
  { title: 'valueOnction', sub: 'valueOnctionSub', tone: 'value-onction' },
  { title: 'valueEfficacite', sub: 'valueEfficaciteSub', tone: 'value-efficacite' }
];

export function ValuesList() {
  const common = useTranslations('Common');
  return (
    <div className="d-grid gap-3" data-reveal="stagger" data-from="left">
      {values.map((v) => (
        <div className={`value-card ${v.tone}`} key={v.title}>
          <p className="mb-0">
            <strong>{common(v.title)}</strong> {common(v.sub)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function FounderBlock({ locale, eyebrow, children }: { locale: Locale; eyebrow: string; children?: React.ReactNode }) {
  const common = useTranslations('Common');
  return (
    <div className="founder" data-reveal="stagger">
      <Image src={siteConfig.founder.photo} alt={siteConfig.founder.name} width={230} height={230} className="founder-photo" />
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title mb-1">{siteConfig.founder.name}</h2>
        <p className="lead-muted mb-4">
          {common('founder')}, {siteConfig.name[locale]}
        </p>
        {children}
      </div>
    </div>
  );
}

/** Photo du campus + adresse et itinéraire. */
export function CampusBlock({ locale, title }: { locale: Locale; title?: string }) {
  const t = useTranslations('Home');
  const { campusPhoto, address } = siteConfig;
  return (
    <div className="row g-4 g-lg-5 align-items-center" data-reveal="stagger">
      <div className="col-lg-6">
        <Image
          src={campusPhoto.src}
          alt={t('campusPhotoAlt')}
          width={campusPhoto.width}
          height={campusPhoto.height}
          sizes="(min-width: 992px) 50vw, 100vw"
          className="campus-photo"
        />
      </div>
      <div className="col-lg-6">
        <span className="eyebrow">{t('campusEyebrow')}</span>
        <h2 className="section-title">{title ?? t('campusTitle')}</h2>
        <p className="mb-3">{t('campusText')}</p>
        <p className="d-flex gap-2 mb-4">
          <i className="ph ph-map-pin-line mt-1" aria-hidden="true" />
          <span>
            {address.street}, {address.city}
            <br />
            <span className="text-muted">{address.landmark[locale]}</span>
          </span>
        </p>
        <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
          {t('directions')} <i className="ph ph-arrow-up-right ms-1" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Carte d'une formation. `compact` : version courte pour l'accueil. */
export function ProgramCard({ program, locale, compact = false }: { program: Program; locale: Locale; compact?: boolean }) {
  const t = useTranslations('ProgramsPage');
  const specLabel = program.id === 'langues' ? t('languages') : t('specializations');

  return (
    <article className="feature-card program-card">
      <div className="d-flex align-items-start gap-3 mb-3">
        <div>
          <span className="program-level">{program.level[locale]}</span>
          <h3 className="mb-0">{program.name[locale]}</h3>
        </div>
      </div>
      {(program.duration || program.online) && (
        <div className="d-flex flex-wrap gap-2 mb-3">
          {program.duration && (
            <span className="mode-badge">
              <i className="ph ph-clock" aria-hidden="true" /> {program.duration[locale]}
            </span>
          )}
          {program.online && (
            <span className="mode-badge">
              <i className="ph ph-laptop" aria-hidden="true" /> {t('alsoOnline')}
            </span>
          )}
        </div>
      )}
      {program.description && <p className="mb-3">{program.description[locale]}</p>}
      {!compact && program.specializations && (
        <>
          <p className="program-spec-title">{specLabel}</p>
          <ul className="program-specs">
            {program.specializations.map((s) => (
              <li key={s.fr}>{s[locale]}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
