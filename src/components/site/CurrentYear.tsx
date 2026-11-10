'use client';

import { useSyncExternalStore } from 'react';

// Année affichée dans le pied de page.
// Prérendu : l'année du build (aucune date lue côté serveur, ce qui fonctionne aussi bien avec
// cacheComponents qu'en export statique) ; dans le navigateur : l'année réelle.
const buildYear = Number(process.env.NEXT_PUBLIC_BUILD_YEAR);
const subscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear
  );
  return <>{year}</>;
}
