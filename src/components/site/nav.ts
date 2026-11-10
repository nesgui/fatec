import type { AppPathname } from '@/i18n/routing';

// Liens du menu principal du site public (le libellé vient de messages/*.json > Nav).
export const mainNav: { href: AppPathname; key: string }[] = [
  { href: '/la-faculte', key: 'about' },
  { href: '/formations', key: 'programs' },
  { href: '/admissions', key: 'admissions' },
  // « Actualités » sera ajouté ici quand les premières actualités seront publiées (étape 3) :
  // un lien vers une page vide nuit à la crédibilité du site.
  { href: '/contact', key: 'contact' }
];
