import { useTranslations } from 'next-intl';

import MainCard from './MainCard';

export default function AdminPlaceholder({ menuKey }: { menuKey: string }) {
  const t = useTranslations('Admin');
  return (
    <MainCard title={t(`menu.${menuKey}`)}>
      <div className="d-flex align-items-center gap-3 text-muted">
        <i className="ph ph-hammer f-30" aria-hidden="true" />
        <p className="mb-0">{t('placeholder')}</p>
      </div>
    </MainCard>
  );
}
