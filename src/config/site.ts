import { asset } from './paths';

/**
 * Informations de la faculté (source : brochure officielle FATEC).
 * À terme, elles seront modifiables depuis l'admin.
 */
export const siteConfig = {
  shortName: 'FATEC',
  name: {
    fr: 'Faculté de Théologie Évangélique du Congo',
    en: 'Evangelical Faculty of Theology of Congo'
  },
  logo: {
    color: asset('/images/logo-fatec.png'), // fond clair
    white: asset('/images/logo-fatec-white.png'), // fond sombre (admin, pied de page, bandeau)
    width: 369,
    height: 397
  },
  // Photo extraite de l'affiche des inscriptions 2024-2025 (basse résolution).
  // TODO : remplacer par une vraie photo du campus en haute résolution (format paysage, 1600 px de large minimum).
  campusPhoto: { src: asset('/images/campus.jpg'), width: 442, height: 146 },
  founder: {
    name: 'Rév. Dr. Paul M. Mpindi, PhD',
    // TODO : photo recadrée depuis la brochure (basse résolution) → remplacer par l'original.
    photo: asset('/images/fondateur.jpg')
  },
  address: {
    street: 'Boulevard Triomphal 8, 9, 10, Kasa-Vubu',
    // Repère indiqué sur l'affiche officielle des inscriptions 2025-2026
    landmark: { fr: 'en diagonale du Palais du Peuple', en: 'diagonally across from the Palais du Peuple' },
    city: 'Kinshasa',
    country: { fr: 'République Démocratique du Congo', en: 'Democratic Republic of the Congo' },
    mapsUrl: 'https://maps.google.com/?q=Boulevard+Triomphal+Kasa-Vubu+Kinshasa'
  },
  phone: '+243 811 711 189',
  // Numéro WhatsApp au format international, chiffres seulement (lien wa.me).
  // TODO : confirmer avec la FATEC que ce numéro est bien sur WhatsApp. Mettre '' pour masquer le bouton.
  whatsapp: '243811711189',
  // TODO : passer à une adresse @fatecrdc.org dès qu'elle existe (plus crédible qu'une adresse Gmail).
  email: 'fatecrdc@gmail.com',
  website: 'https://www.fatecrdc.org'
} as const;

/** Lien WhatsApp avec un message pré-rempli, ou null si aucun numéro n'est configuré. */
export function whatsappUrl(message?: string): string | null {
  const number: string = siteConfig.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
