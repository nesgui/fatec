import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Link, redirect, usePathname, useRouter qui connaissent la langue et les URL traduites.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
