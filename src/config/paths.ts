/**
 * Préfixe d'URL du site, vide en temps normal.
 * Sur GitHub Pages, le site est servi sous /<nom-du-dépôt> (ex. /fatec) : ce préfixe est fourni au build
 * par NEXT_PUBLIC_BASE_PATH (voir next.config.ts et .github/workflows/deploy.yml).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Chemin d'un fichier de /public, préfixé si besoin.
 * Next.js ajoute le préfixe tout seul aux <Link>, mais pas aux `src` de next/image ni aux <a href> simples.
 */
export const asset = (path: string) => `${basePath}${path}`;
