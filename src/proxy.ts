import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Détecte la langue (cookie, puis navigateur), redirige "/" vers "/fr" ou "/en",
// et fait correspondre les URL traduites (/en/about) aux dossiers internes (/qui-sommes-nous).
// L'étape 2 ajoutera ici la vérification de session pour /admin.
export default createMiddleware(routing);

export const config = {
  // Tout sauf l'API, les fichiers internes de Next.js et les fichiers statiques (avec une extension).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
