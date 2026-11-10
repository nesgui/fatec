import type { Metadata } from 'next';
import { use } from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import MainCard from '@/components/admin/MainCard';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: 'Admin.dashboard' });
  return { title: t('title') };
}

const stats = [
  { key: 'statStudents', icon: 'ph-student', color: 'bg-primary' },
  { key: 'statApplications', icon: 'ph-file-text', color: 'bg-warning' },
  { key: 'statPrograms', icon: 'ph-books', color: 'bg-success' },
  { key: 'statDonations', icon: 'ph-hand-coins', color: 'bg-info' }
];

export default function DashboardPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('Admin.dashboard');

  return (
    <>
      <p className="text-muted mb-4">{t('subtitle')}</p>

      <div className="row">
        {stats.map((s) => (
          <div className="col-sm-6 col-xl-3" key={s.key}>
            <MainCard className="stat-card">
              <div className="d-flex align-items-center gap-3">
                <span className={`stat-icon ${s.color} bg-opacity-10`} aria-hidden="true">
                  <i className={`ph ${s.icon}`} />
                </span>
                <div>
                  {/* Étape 2 : valeurs réelles calculées depuis la base de données */}
                  <h3 className="f-w-300 mb-0">—</h3>
                  <span className="text-muted">{t(s.key)}</span>
                </div>
              </div>
            </MainCard>
          </div>
        ))}
      </div>

      <div className="alert alert-info d-flex align-items-center gap-2">
        <i className="ph ph-info f-20" aria-hidden="true" />
        {t('noData')}
      </div>

      <div className="row">
        <div className="col-lg-6">
          <MainCard title={t('latestApplications')}>
            <p className="text-muted mb-0">—</p>
          </MainCard>
        </div>
        <div className="col-lg-6">
          <MainCard title={t('latestMessages')}>
            <p className="text-muted mb-0">—</p>
          </MainCard>
        </div>
      </div>
    </>
  );
}
