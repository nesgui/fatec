'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

/**
 * Apparitions au défilement des éléments marqués `data-reveal` (une seule fois par élément).
 *
 * Tout passe par l'API Web Animations (`element.animate`) : aucun attribut ni classe n'est
 * ajouté au DOM. C'est voulu : Next hydrate la page par morceaux, et modifier un élément
 * pas encore hydraté provoque une erreur d'hydratation. Sans JavaScript, tout reste visible.
 *
 * Chaque type de contenu a son propre geste (valeur de `data-reveal`, puis classe du groupe) :
 *   type             titres : dévoilés de haut en bas, comme une ligne imprimée
 *   line             mission : le filet doré (::before) se trace, le texte suit
 *   (vide)           textes : simple fondu, à peine une montée
 *   stagger + …
 *     cartes         (par défaut) se posent : légère mise à l'échelle, pas de déplacement
 *     data-from=left valeurs : glissent depuis leur bordure de couleur
 *     .steps         étapes : montent dans l'ordre, l'écart rend la séquence lisible
 *     .doc-list …    listes : défilent vite, comme on coche une liste
 *     .founder       la photo se pose, le texte suit
 */

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';
const MAX_STEPS = 6; // au-delà, les enfants entrent tous au 6e palier

type Motion = { from: Keyframe[]; duration: number; easing?: string; delay?: number };

/** Geste de chaque enfant d'un groupe `stagger`, et écart entre deux enfants. */
function groupMotion(el: HTMLElement): { step: number; child: (i: number) => Motion } {
  if (el.dataset.from === 'left') return { step: 70, child: () => ({ from: [{ opacity: 0, translate: '-24px 0' }], duration: 450 }) };
  if (el.classList.contains('steps')) return { step: 90, child: () => ({ from: [{ opacity: 0, translate: '0 20px' }], duration: 450 }) };
  if (el.classList.contains('doc-list') || el.classList.contains('check-list'))
    return { step: 30, child: () => ({ from: [{ opacity: 0, translate: '-10px 0' }], duration: 280 }) };
  if (el.classList.contains('founder'))
    return {
      step: 90,
      child: (i) => (i === 0 ? { from: [{ opacity: 0, scale: '0.94' }], duration: 500 } : { from: [{ opacity: 0, translate: '0 8px' }], duration: 400 })
    };
  // Cartes : elles « se posent » plutôt que de monter
  return { step: 50, child: () => ({ from: [{ opacity: 0, scale: '0.97' }], duration: 380 }) };
}

/** Geste d'un élément seul. */
function singleMotion(el: HTMLElement): Motion[] {
  switch (el.dataset.reveal) {
    case 'type':
      return [{ from: [{ clipPath: 'inset(-10% -10% 110% -10%)', translate: '0 0.15em' }, { clipPath: 'inset(-10% -10% -10% -10%)', translate: '0 0' }], duration: 520 }];
    default:
      return [{ from: [{ opacity: 0, translate: '0 6px' }], duration: 400 }];
  }
}

/** Crée les animations d'entrée d'un élément, en pause sur leur état de départ (élément caché). */
function prepare(el: HTMLElement, reduce: boolean): Animation[] {
  // Remplissage `backwards` : état de départ tenu pendant la pause et le délai, rien laissé après.
  const play = (target: Element, m: Motion, extra: KeyframeAnimationOptions = {}) =>
    target.animate(m.from, { duration: m.duration, easing: m.easing ?? EASE_OUT, delay: m.delay ?? 0, fill: 'backwards', ...extra });
  const fade: Motion = { from: [{ opacity: 0 }], duration: 300, easing: 'ease-out' };
  let animations: Animation[];

  if (el.dataset.reveal === 'stagger') {
    const { step, child } = groupMotion(el);
    animations = Array.from(el.children).map((c, i) => play(c, reduce ? fade : { ...child(i), delay: Math.min(i, MAX_STEPS) * step }));
  } else if (reduce) {
    animations = [play(el, fade)];
  } else if (el.dataset.reveal === 'line') {
    animations = [
      play(el, { from: [{ transform: 'scaleY(0)' }], duration: 550, easing: EASE_IN_OUT }, { pseudoElement: '::before' }),
      play(el, { from: [{ color: 'transparent' }], duration: 350, easing: 'ease-out', delay: 160 })
    ];
  } else {
    animations = singleMotion(el).map((m) => play(el, m));
  }

  for (const a of animations) a.pause();
  return animations;
}

const handled = new WeakSet<Element>(); // éléments déjà traités (ex. conservés lors d'un changement de langue)

export default function RevealObserver() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // useLayoutEffect : lors d'une navigation, les nouveaux éléments sont cachés avant d'être peints.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFirstLoad = firstLoad.current;
    firstLoad.current = false;
    const pending = new Map<Element, Animation[]>();

    /** Prépare les éléments pas encore traités. `skipVisible` : laisser tels quels ceux déjà à l'écran. */
    const scan = (skipVisible: boolean) => {
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        if (handled.has(el)) continue;
        handled.add(el);
        if (skipVisible) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) continue;
        }
        pending.set(el, prepare(el, reduce));
        observer.observe(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          pending.get(entry.target)?.forEach((a) => a.play());
          pending.delete(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -40px 0px' } // déclenche dès que l'élément entre vraiment à l'écran
    );
    // Premier chargement : ce qui est déjà à l'écran a été vu tel quel, on n'y touche pas.
    // Navigation : tout ce qui arrive s'anime, y compris à l'écran.
    scan(isFirstLoad);

    // Next envoie une partie de la page en différé (streaming) : les éléments arrivés après
    // coup sont pris en charge à leur insertion, avant d'être peints.
    const mutations = new MutationObserver(() => scan(true));
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      // Si on quitte la page avant de les avoir vus, on libère les éléments (pas d'état caché résiduel).
      for (const [el, animations] of pending) {
        animations.forEach((a) => a.cancel());
        handled.delete(el);
      }
    };
  }, [pathname]);

  return null;
}
