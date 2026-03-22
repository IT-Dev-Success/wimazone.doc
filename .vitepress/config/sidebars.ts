import { DefaultTheme } from 'vitepress'

export const sidebarFr: DefaultTheme.Sidebar = {
  '/docs/guide/': [
    {
      text: 'Démarrage',
      collapsed: false,
      items: [
        { text: 'Plugins', link: '/plugins/' },
        { text: 'Prérequis', link: '/docs/guide/installation#requirements' }
      ]
    },
    {
      text: 'Installation',
      collapsed: false,
      items: [
        { text: 'MikroTik', link: '/docs/guide/mikrotik' },
        { text: 'Docker', link: '/docs/guide/docker' },
        { text: 'aaPanel (Docker)', link: '/docs/guide/docker-aapanel' },
        { text: 'Serveur Web', link: '/docs/guide/installation#web-servers' },
        { text: 'Hébergement mutualisé', link: '/docs/guide/installation#shared-hosting' },
        { text: 'VPS & Cloud', link: '/docs/guide/installation#vps-cloud' }
      ]
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Post-installation', link: '/docs/guide/installation#post-installation' }
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
        { text: 'Plugins', link: '/mg/plugins/' },
        { text: 'Fepetra takiana', link: '/mg/docs/guide/installation#requirements' }
      ]
    },
    {
      text: 'Fametrahana',
      collapsed: false,
      items: [
        { text: 'MikroTik', link: '/mg/docs/guide/mikrotik' },
        { text: 'Docker', link: '/mg/docs/guide/docker' },
        { text: 'aaPanel (Docker)', link: '/mg/docs/guide/docker-aapanel' },
        { text: 'Serveur Web', link: '/mg/docs/guide/installation#web-servers' },
        { text: 'Hébergement zaraina', link: '/mg/docs/guide/installation#shared-hosting' },
        { text: 'VPS & Cloud', link: '/mg/docs/guide/installation#vps-cloud' }
      ]
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Aorian\'ny fametrahana', link: '/mg/docs/guide/installation#post-installation' }
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
