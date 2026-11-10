import type { AppPathname } from '@/i18n/routing';

// Menu latéral de l'admin. Les libellés viennent de messages/*.json > Admin.menu.
// Étape 2 : chaque entrée recevra la liste des rôles autorisés (ex. roles: ['ADMIN', 'SECRETARIAT']).
export type AdminMenuItem = { key: string; href: AppPathname; icon: string };
export type AdminMenuGroup = { key: string; items: AdminMenuItem[] };

export const adminMenu: AdminMenuGroup[] = [
  {
    key: 'groupMain',
    items: [{ key: 'dashboard', href: '/admin', icon: 'ph-squares-four' }]
  },
  {
    key: 'groupAcademic',
    items: [
      { key: 'programs', href: '/admin/formations', icon: 'ph-books' },
      { key: 'courses', href: '/admin/cours', icon: 'ph-book-open-text' },
      { key: 'faculty', href: '/admin/enseignants', icon: 'ph-chalkboard-teacher' }
    ]
  },
  {
    key: 'groupStudents',
    items: [
      { key: 'applications', href: '/admin/candidatures', icon: 'ph-file-text' },
      { key: 'students', href: '/admin/etudiants', icon: 'ph-student' }
    ]
  },
  {
    key: 'groupCommunication',
    items: [
      { key: 'news', href: '/admin/actualites', icon: 'ph-newspaper' },
      { key: 'messages', href: '/admin/messages', icon: 'ph-chat-circle-text' },
      { key: 'donations', href: '/admin/dons', icon: 'ph-hand-coins' }
    ]
  },
  {
    key: 'groupSettings',
    items: [{ key: 'users', href: '/admin/utilisateurs', icon: 'ph-shield-check' }]
  }
];

export const allAdminItems = adminMenu.flatMap((g) => g.items);
