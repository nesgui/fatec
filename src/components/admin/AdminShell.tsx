'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SimpleBar from 'simplebar-react';
import { useLocale, useTranslations } from 'next-intl';

import { adminMenu, allAdminItems } from './menu';
import LanguageSwitcher from '@/components/site/LanguageSwitcher';
import { basePath } from '@/config/paths';
import { siteConfig } from '@/config/site';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/**
 * Coquille de l'admin : barre latérale + en-tête + zone de contenu + pied de page.
 * Réécriture simplifiée du layout Datta Able : mêmes classes CSS (pc-*), donc même rendu.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Admin');
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  // Même logique que Datta Able : sur ordinateur, `open` masque la barre ; sur mobile, il l'affiche.
  const [open, setOpen] = useState(false);

  const current = allAdminItems.find((i) => i.href === pathname);

  return (
    <>
      <nav className={`pc-sidebar${open ? ' pc-sidebar-hide mob-sidebar-active' : ''}`} aria-label="Admin">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link href="/admin" className="b-brand">
              <Image src={siteConfig.logo.white} alt="" width={38} height={41} priority />
              {siteConfig.shortName}
            </Link>
          </div>
          <div className="navbar-content">
            <SimpleBar style={{ height: 'calc(100vh - 74px)' }}>
              <ul className="pc-navbar">
                {adminMenu.map((group) => (
                  <Fragment key={group.key}>
                      <li className="pc-item pc-caption">
                        <label>{t(`menu.${group.key}`)}</label>
                      </li>
                      {group.items.map((item) => {
                        const active = item.href === pathname;
                        return (
                          <li key={item.key} className={`pc-item${active ? ' active' : ''}`}>
                            <Link
                              href={item.href}
                              className="pc-link"
                              aria-current={active ? 'page' : undefined}
                              onClick={() => setOpen(false)} // referme le menu mobile après un clic
                            >
                              <span className="pc-micon">
                                <i className={`ph ${item.icon}`} aria-hidden="true" />
                              </span>
                              <span className="pc-mtext">{t(`menu.${item.key}`)}</span>
                            </Link>
                          </li>
                        );
                      })}
                  </Fragment>
                ))}
              </ul>
            </SimpleBar>
          </div>
        </div>
        {open && <div className="pc-menu-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
      </nav>

      <header className="pc-header">
        <div className="header-wrapper">
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled d-flex align-items-center mb-0">
              <li className="pc-h-item pc-sidebar-collapse">
                <button type="button" className="pc-head-link ms-0 btn btn-link" onClick={() => setOpen(!open)} aria-label={t('header.toggleMenu')}>
                  <i className="ph ph-list" />
                </button>
              </li>
              <li className="pc-h-item pc-sidebar-popup">
                <button type="button" className="pc-head-link ms-0 btn btn-link" onClick={() => setOpen(!open)} aria-label={t('header.toggleMenu')}>
                  <i className="ph ph-list" />
                </button>
              </li>
            </ul>
          </div>
          <div className="ms-auto d-flex align-items-center gap-2">
            <LanguageSwitcher className="me-2" />
            {/* Lien simple : le site public a sa propre mise en page racine. */}
            <a href={`${basePath}/${locale}`} className="pc-head-link me-0" title={t('header.viewSite')} aria-label={t('header.viewSite')}>
              <i className="ph ph-arrow-square-out" />
            </a>
            <Dropdown align="end" className="pc-h-item">
              <Dropdown.Toggle variant="link" className="pc-head-link arrow-none me-0" id="admin-user" aria-label={t('header.profile')}>
                <i className="ph ph-user-circle" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-user-profile pc-h-dropdown p-0 overflow-hidden">
                <Dropdown.Header className="bg-primary text-white py-3">
                  {/* Étape 2 : nom et rôle de l'utilisateur connecté */}
                  <strong>Admin</strong>
                </Dropdown.Header>
                <div className="dropdown-body p-2">
                  <Dropdown.Item disabled>
                    <i className="ph ph-user me-2" />
                    {t('header.profile')}
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <i className="ph ph-sign-out me-2" />
                    {t('header.logout')}
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>

      <div className="pc-container">
        <div className="pc-content">
          {current && (
            <div className="page-header">
              <div className="page-block">
                <div className="page-header-title">
                  <h5 className="mb-0">{t(`menu.${current.key}`)}</h5>
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>

      <footer className="pc-footer">
        <div className="footer-wrapper container-fluid">
          <p className="m-0 py-1">
            {siteConfig.shortName} · {t('footer')}
          </p>
        </div>
      </footer>
    </>
  );
}
