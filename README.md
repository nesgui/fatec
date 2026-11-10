# Site web de la FATEC

Site de la **Faculté de Théologie Évangélique du Congo** (Kinshasa, RDC) : site public bilingue (français / anglais)
et espace d'administration, dans un seul projet Next.js.

- **Site public** : identité de la brochure FATEC (bordeaux, ocre, pêche ; polices Oswald + Inter).
- **Administration** : thème Datta Able (repris du template), sous `/fr/admin` ou `/en/admin`.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000  → redirige vers /fr
npm run build    # build de production
npm run lint
```

## Stack

| Rôle | Outil |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) + TypeScript |
| Langues | next-intl : URL préfixées (`/fr`, `/en`) et traduites (`/fr/qui-sommes-nous` ↔ `/en/about`) |
| Interface | React-Bootstrap + SCSS |
| Formulaires | react-hook-form + Zod (étape 3) |

## Structure

```
messages/            fr.json, en.json : tous les textes de l'interface
src/
├─ app/[locale]/
│  ├─ (site)/        site public : layout racine + pages (accueil, la faculté, formations, admissions…)
│  └─ (admin)/admin/ administration : layout racine Datta Able + modules
├─ components/
│  ├─ site/          en-tête, pied de page, sélecteur de langue…
│  └─ admin/         AdminShell (barre latérale + en-tête), MainCard, menu.ts
├─ config/site.ts    nom, coordonnées, fondateur (source : brochure officielle)
├─ i18n/             langues, URL traduites, navigation
├─ proxy.ts          détection de la langue (et, à l'étape 2, protection de /admin)
└─ styles/
   ├─ public.scss    thème du site public
   ├─ admin.scss     thème Datta Able
   └─ fonts/         icônes Phosphor et Tabler
```

### Deux mises en page racines

`(site)` et `(admin)` ont chacune leur propre `<html>`. Les deux thèmes CSS ne se mélangent donc jamais.
Passer de l'un à l'autre recharge la page complètement : utiliser un simple `<a href>` (et non `<Link>`) pour ces liens.

## Conventions

- **Ajouter une page publique** : créer `src/app/[locale]/(site)/<dossier>/page.tsx`, déclarer son URL dans
  `src/i18n/routing.ts` (`pathnames`), ajouter ses textes dans `messages/fr.json` et `messages/en.json`.
- **Ajouter un module admin** : même principe sous `(admin)/admin/`, puis une entrée dans `components/admin/menu.ts`.
- Liens internes : toujours `Link` de `@/i18n/navigation` (gère la langue et les URL traduites).
- Les composants React-Bootstrap à sous-composants (`Card.Header`, `Navbar.Toggle`…) doivent être utilisés
  dans un fichier marqué `'use client'`.

## Hébergement de démonstration : GitHub Pages

Le site public est publié automatiquement sur **https://nesgui.github.io/fatec/** à chaque push sur `master`
(workflow `.github/workflows/deploy.yml`). GitHub Pages ne sert que des fichiers statiques, donc cette version :

- est un export statique (`NEXT_PUBLIC_STATIC_EXPORT=1`, préfixe `NEXT_PUBLIC_BASE_PATH=/fatec`) ;
- n'a pas de proxy : la racine redirige vers `/fr/` ou `/en/` (`scripts/static-extras.mjs`) ;
- garde les mêmes URL dans les deux langues (`/en/la-faculte` au lieu de `/en/about`) ;
- ne publie pas l'espace d'administration.

L'hébergement définitif (étape 5), avec base de données et administration, nécessitera un serveur Node.js.

Tester l'export en local (sous Git Bash, préfixer par `MSYS_NO_PATHCONV=1`) : retirer temporairement `src/proxy.ts`
et le dossier `(admin)`, puis `NEXT_PUBLIC_STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/fatec npx next build && node scripts/static-extras.mjs`.

## Avancement

- [x] **Étape 1 – Fondations** : projet, bilinguisme, identité FATEC, site public (accueil + pages provisoires), coquille admin
- [ ] **Étape 2** : base de données (PostgreSQL + Prisma), authentification et rôles, protection de `/admin`
- [ ] **Étape 3** : modules admin (formations, cours, enseignants, candidatures, étudiants, actualités) et pages publiques alimentées par la base
- [ ] **Étape 4** : formulaire de candidature en ligne, contact, dons (Mobile Money)
- [ ] **Étape 5** : SEO, accessibilité, tests, déploiement
