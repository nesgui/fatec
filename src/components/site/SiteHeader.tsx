'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocale, useTranslations } from 'next-intl';

import LanguageSwitcher from './LanguageSwitcher';
import { mainNav } from './nav';
import { siteConfig } from '@/config/site';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export default function SiteHeader() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const close = () => setExpanded(false);

  // Ombre sous l'en-tête dès que la page défile : indique que le contenu passe dessous.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar expand="lg" className={`site-header${scrolled ? ' is-scrolled' : ''}`} expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Link href="/" className="navbar-brand" onClick={close}>
          <Image src={siteConfig.logo.color} alt="" width={46} height={50} className="brand-logo" priority />
          <span className="brand-text">
            <strong>{siteConfig.shortName}</strong>
            {/* Nom complet : masqué entre 992 et 1199 px, où la place manque */}
            <small className="d-block d-lg-none d-xl-block">{siteConfig.name[locale]}</small>
          </span>
        </Link>

        <Navbar.Toggle aria-controls="main-nav" aria-label={t('menu')} />
        <Navbar.Collapse id="main-nav">
          <ul className="navbar-nav ms-auto me-lg-3 gap-lg-1">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li className="nav-item" key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link${active ? ' active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={close}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="d-flex align-items-center gap-3 py-3 py-lg-0">
            <LanguageSwitcher />
            <Link href="/admissions" className="btn btn-primary" onClick={close}>
              {t('apply')}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
