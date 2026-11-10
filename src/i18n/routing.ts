import { defineRouting } from 'next-intl/routing';

/**
 * Langues du site et URL traduites.
 * La clé est le chemin interne (nom du dossier dans app/[locale]),
 * la valeur est l'URL affichée au visiteur dans chaque langue.
 */
const translatedPathnames = {
  '/': '/',
  '/la-faculte': { fr: '/la-faculte', en: '/about' },
  '/formations': { fr: '/formations', en: '/programs' },
  '/admissions': '/admissions',
  '/actualites': { fr: '/actualites', en: '/news' },
  '/soutenir': { fr: '/soutenir', en: '/support' },
  '/contact': '/contact',

  '/admin': '/admin',
  '/admin/formations': { fr: '/admin/formations', en: '/admin/programs' },
  '/admin/cours': { fr: '/admin/cours', en: '/admin/courses' },
  '/admin/enseignants': { fr: '/admin/enseignants', en: '/admin/faculty' },
  '/admin/candidatures': { fr: '/admin/candidatures', en: '/admin/applications' },
  '/admin/etudiants': { fr: '/admin/etudiants', en: '/admin/students' },
  '/admin/actualites': { fr: '/admin/actualites', en: '/admin/news' },
  '/admin/messages': '/admin/messages',
  '/admin/dons': { fr: '/admin/dons', en: '/admin/donations' },
  '/admin/utilisateurs': { fr: '/admin/utilisateurs', en: '/admin/users' }
} as const;

/**
 * Export statique (GitHub Pages) : sans proxy, rien ne fait correspondre /en/about au dossier la-faculte.
 * On garde donc la même URL dans les deux langues (/en/la-faculte). Le site hébergé sur un serveur
 * Node.js garde les URL traduites.
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

function sameInBothLanguages<T extends Record<string, unknown>>(p: T): { [K in keyof T]: K } {
  return Object.fromEntries(Object.keys(p).map((k) => [k, k])) as { [K in keyof T]: K };
}

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: isStaticExport ? sameInBothLanguages(translatedPathnames) : translatedPathnames
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
