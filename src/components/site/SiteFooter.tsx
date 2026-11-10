import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CurrentYear from './CurrentYear';
import { mainNav } from './nav';
import { siteConfig, whatsappUrl } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav');
  const common = useTranslations('Common');
  const wa = whatsappUrl();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <p className="footer-brand d-flex align-items-center gap-3">
              <Image src={siteConfig.logo.white} alt="" width={56} height={60} />
              <span>
                {siteConfig.shortName}
                <small className="d-block">{siteConfig.name[locale]}</small>
              </span>
            </p>
            <p className="footer-values">
              {common('valueErudition')} · {common('valueOnction')} · {common('valueEfficacite')}
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h2>{t('explore')}</h2>
            <ul className="list-unstyled d-grid gap-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{nav(item.key)}</Link>
                </li>
              ))}
              <li>
                <Link href="/soutenir">{nav('support')}</Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-4">
            <h2>{t('contactUs')}</h2>
            <address className="d-grid gap-2">
              <span className="d-flex gap-2">
                <i className="ph ph-map-pin-line mt-1" aria-hidden="true" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}
                  <br />
                  {siteConfig.address.landmark[locale]}
                  <br />
                  {siteConfig.address.country[locale]}
                </span>
              </span>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="d-flex gap-2">
                <i className="ph ph-phone mt-1" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="d-flex gap-2 text-break">
                <i className="ph ph-envelope-simple mt-1" aria-hidden="true" />
                {siteConfig.email}
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="d-flex gap-2">
                  <i className="ph ph-whatsapp-logo mt-1" aria-hidden="true" />
                  {common('whatsappShort')}
                </a>
              )}
            </address>
          </div>
        </div>

        {/* Pas de lien public vers /admin : l'équipe y accède directement par l'URL. */}
        <div className="footer-bottom d-flex flex-wrap justify-content-between gap-2">
          <span>
            © <CurrentYear /> {siteConfig.shortName} – {siteConfig.name[locale]}. {t('rights')}
          </span>
        </div>
      </div>
    </footer>
  );
}
