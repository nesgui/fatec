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
  return { title: t('contact') };
}

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = useTranslations('ContactPage');
  const pages = useTranslations('Pages');
  const wa = whatsappUrl();

  const items = [
    {
      icon: 'ph-map-pin',
      label: t('address'),
      content: (
        <>
          {siteConfig.address.street}, {siteConfig.address.city}
          <br />
          <span className="text-muted">{siteConfig.address.landmark[l]}</span>
          <br />
          {siteConfig.address.country[l]}
          <br />
          <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer">
            {t('directions')} <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        </>
      )
    },
    {
      icon: 'ph-phone',
      label: t('phone'),
      content: <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
    },
    {
      icon: 'ph-envelope-simple',
      label: t('email'),
      content: (
        <a href={`mailto:${siteConfig.email}`} className="text-break">
          {siteConfig.email}
        </a>
      )
    },
    // WhatsApp à la place du lien « site web », qui renvoyait vers ce même site.
    ...(wa
      ? [
          {
            icon: 'ph-whatsapp-logo',
            label: t('whatsapp'),
            content: (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                {siteConfig.phone} <i className="ph ph-arrow-up-right" aria-hidden="true" />
              </a>
            )
          }
        ]
      : [])
  ];

  return (
    <>
      <PageHero title={pages('contact')} intro={t('intro')} />
      <section className="section">
        <div className="container">
          <div className="row g-4" data-reveal="stagger">
            {items.map((it) => (
              <div className="col-md-6 col-xl-3" key={it.label}>
                <div className="feature-card contact-card">
                  <h2 className="h4">{it.label}</h2>
                  <p className="mb-0">{it.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
