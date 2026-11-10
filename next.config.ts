import path from 'node:path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Export statique pour GitHub Pages (NEXT_PUBLIC_STATIC_EXPORT=1, voir .github/workflows/deploy.yml).
// Sans serveur : pas de proxy (détection de langue), pas d'optimisation d'images, site servi sous un préfixe.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Incompatibles avec l'export statique (« PPR cannot be enabled in export mode ») : serveur Node.js seulement.
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  turbopack: { root: __dirname },
  // Année du build, pour le rendu initial du pied de page (voir components/site/CurrentYear.tsx)
  env: { NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()) },
  ...(isStaticExport && {
    output: 'export',
    basePath,
    trailingSlash: true, // /fr/formations/ → fr/formations/index.html, servi tel quel par GitHub Pages
    images: { unoptimized: true }
  }),
  sassOptions: {
    // Permet aux @import relatifs internes de Bootstrap ("mixins/banner"…) d'être résolus.
    loadPaths: [path.join(process.cwd(), 'node_modules/bootstrap/scss')],
    // Le thème Datta Able utilise encore la syntaxe Sass @import : on masque les avertissements de dépréciation.
    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
  }
};

export default withNextIntl(nextConfig);
