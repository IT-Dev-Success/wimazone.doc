import { DefaultTheme } from 'vitepress'

export const sidebarFr: DefaultTheme.Sidebar = {
  '/docs/guide/': [
    {
      text: 'Démarrage',
      collapsed: false,
      items: [
        { text: 'Prérequis MikroTik', link: '/docs/guide/installation#requirements' },
        { text: 'Plugins', link: '/plugins/' }
      ]
    },
    {
      text: 'Installation MikroTik',
      collapsed: false,
      items: [
        { text: 'Guide complet', link: '/docs/guide/mikrotik' },
        { text: 'Premier accès', link: '/docs/guide/mikrotik#premier-acces' },
        { text: 'Walled Garden', link: '/docs/guide/mikrotik#walled-garden' }
      ]
    },
    {
      text: 'Exploitation',
      collapsed: false,
      items: [
        { text: 'Backup & restore', link: '/docs/guide/mikrotik#backup-restore' },
        { text: 'Mise à jour', link: '/docs/guide/mikrotik#mise-a-jour' },
        { text: 'Dépannage', link: '/docs/guide/mikrotik#depannage' }
      ]
    },
    {
      text: 'Développement',
      items: [
        { text: 'Créer un plugin', link: '/docs/guide/plugin-development' }
      ]
    }
  ],
  '/docs/manual/': [
    {
      text: 'Manuel utilisateur',
      items: [
        { text: 'Vue d’ensemble', link: '/docs/manual/' },
        { text: 'Paramètres globaux', link: '/docs/manual/settings/' },
        { text: 'APIs disponibles', link: '/docs/manual/settings/apis' },
        { text: 'Opérations routeur', link: '/docs/manual/router/' }
      ]
    }
  ]
}

export const sidebarMg: DefaultTheme.Sidebar = {
  '/mg/docs/guide/': [
    {
      text: 'Fanombohana',
      collapsed: false,
      items: [
        { text: 'Fepetra takiana MikroTik', link: '/mg/docs/guide/installation#requirements' },
        { text: 'Plugins', link: '/mg/plugins/' }
      ]
    },
    {
      text: 'Fametrahana MikroTik',
      collapsed: false,
      items: [
        { text: 'Torolalana feno', link: '/mg/docs/guide/mikrotik' },
        { text: 'Fidirana voalohany', link: '/mg/docs/guide/mikrotik#premier-acces' },
        { text: 'Walled Garden', link: '/mg/docs/guide/mikrotik#walled-garden' }
      ]
    },
    {
      text: 'Fikarakarana',
      collapsed: false,
      items: [
        { text: 'Backup sy famerenana', link: '/mg/docs/guide/mikrotik#backup-restore' },
        { text: 'Fanavaozana', link: '/mg/docs/guide/mikrotik#mise-a-jour' },
        { text: 'Famahana olana', link: '/mg/docs/guide/mikrotik#depannage' }
      ]
    },
    {
      text: 'Fampandrosoana',
      items: [
        { text: 'Mamorona Plugin', link: '/mg/docs/guide/plugin-development' }
      ]
    }
  ],
  '/mg/docs/manual/': [
    {
      text: 'Boky Torolàlana Mpampiasa',
      items: [
        { text: 'Fijery ankapobeny', link: '/mg/docs/manual/' },
        { text: 'Paramètre ankapobeny', link: '/mg/docs/manual/settings/' },
        { text: 'API misy', link: '/mg/docs/manual/settings/apis' },
        { text: 'Asan\'ny routeur', link: '/mg/docs/manual/router/' }
      ]
    }
  ]
}
