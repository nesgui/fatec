import { useTranslations } from 'next-intl';

import { whatsappUrl } from '@/config/site';

/** Bouton flottant WhatsApp : le canal de contact le plus utilisé en RDC. Masqué si aucun numéro n'est configuré. */
export default function WhatsAppButton() {
  const t = useTranslations('Common');
  const href = whatsappUrl();
  if (!href) return null;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="whatsapp-fab" aria-label={t('whatsapp')}>
      <i className="ph ph-whatsapp-logo" aria-hidden="true" />
      <span className="whatsapp-fab-label">{t('whatsappShort')}</span>
    </a>
  );
}
