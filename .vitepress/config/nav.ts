import { DefaultTheme } from 'vitepress'

export const navFr: DefaultTheme.NavItem[] = [
  { text: 'Accueil', link: '/' },
  { text: 'Guide', link: '/docs/guide/installation' },
  { text: 'Manuel', link: '/docs/manual/' },
  { text: 'APIs', link: '/docs/manual/settings/apis' },
  { text: 'Plugins', link: '/plugins/' },
  { text: 'Versions', link: '/releases/' },
  { 
    text: 'Projet', 
    items: [
      { text: 'Journal des changements', link: 'https://github.com/ITDev-Success/billing/blob/main/CHANGELOG.md' },
      { text: 'Source Code', link: 'https://github.com/ITDev-Success/billing' },
      { text: 'Issues', link: 'https://github.com/ITDev-Success/billing/issues' }
    ]
  }
]

export const navEn: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/en/' },
  { text: 'Guide', link: '/en/docs/guide/installation' },
  { text: 'Manual', link: '/en/docs/manual/' },
  { text: 'APIs', link: '/en/docs/manual/settings/apis' },
  { text: 'Plugins', link: '/en/plugins/' },
  { text: 'Releases', link: '/en/releases/' },
  { 
    text: 'Project', 
    items: [
      { text: 'Changelog', link: 'https://github.com/ITDev-Success/billing/blob/main/CHANGELOG.md' },
      { text: 'Source Code', link: 'https://github.com/ITDev-Success/billing' },
      { text: 'Issues', link: 'https://github.com/ITDev-Success/billing/issues' }
    ]
  }
]
