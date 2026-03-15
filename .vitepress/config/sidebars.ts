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

export const sidebarEn: DefaultTheme.Sidebar = {
  '/en/docs/guide/': [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Plugins', link: '/en/plugins/' },
        { text: 'Requirements', link: '/en/docs/guide/installation#requirements' }
      ]
    },
    {
      text: 'Installation',
      collapsed: false,
      items: [
        { text: 'MikroTik', link: '/en/docs/guide/mikrotik' },
        { text: 'Docker', link: '/en/docs/guide/docker' },
        { text: 'aaPanel (Docker)', link: '/en/docs/guide/docker-aapanel' },
        { text: 'Web Server', link: '/en/docs/guide/installation#web-servers' },
        { text: 'Shared Hosting', link: '/en/docs/guide/installation#shared-hosting' },
        { text: 'VPS & Cloud', link: '/en/docs/guide/installation#vps-cloud' }
      ]
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Post-Installation', link: '/en/docs/guide/installation#post-installation' }
      ]
    },
    {
      text: 'Development',
      items: [
        { text: 'Creating Plugins', link: '/en/docs/guide/plugin-development' }
      ]
    }
  ],
  '/en/docs/manual/': [
    {
      text: 'User Manual',
      items: [
        { text: 'Overview', link: '/en/docs/manual/' },
        { text: 'Global Settings', link: '/en/docs/manual/settings/' },
        { text: 'Available APIs', link: '/en/docs/manual/settings/apis' },
        { text: 'Router Operations', link: '/en/docs/manual/router/' }
      ]
    }
  ]
}
