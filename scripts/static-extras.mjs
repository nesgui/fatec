// Après `next build` en export statique : fichiers propres à GitHub Pages, dans out/.
// - index.html : la racine du site n'a pas de page (le proxy de langue n'existe pas sans serveur),
//   on redirige vers /fr/ ou /en/ selon la langue du navigateur.
// - .nojekyll : empêche GitHub Pages d'ignorer le dossier _next/.
import { existsSync, writeFileSync } from 'node:fs';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const out = 'out';
if (!existsSync(out)) throw new Error('Dossier out/ introuvable : lancer `next build` avec NEXT_PUBLIC_STATIC_EXPORT=1.');

writeFileSync(
  `${out}/index.html`,
  `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FATEC – Faculté de Théologie Évangélique du Congo</title>
<link rel="canonical" href="${base}/fr/">
<script>
  var lang = (navigator.language || 'fr').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr';
  location.replace('${base}/' + lang + '/');
</script>
<noscript><meta http-equiv="refresh" content="0; url=${base}/fr/"></noscript>
</head>
<body><p><a href="${base}/fr/">Faculté de Théologie Évangélique du Congo</a> · <a href="${base}/en/">English</a></p></body>
</html>
`
);
writeFileSync(`${out}/.nojekyll`, '');
console.log(`out/index.html et out/.nojekyll créés (préfixe : "${base || '/'}")`);
