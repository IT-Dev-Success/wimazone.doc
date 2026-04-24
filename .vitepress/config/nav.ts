import { DefaultTheme } from 'vitepress'

export const navFr: DefaultTheme.NavItem[] = [
  { text: 'Accueil', link: '/' },
  { text: 'Guide', link: '/docs/guide/installation' },
  { text: 'Manuel', link: '/docs/manual/' },
  { text: 'APIs', link: '/docs/manual/settings/apis' },
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

export const navMg: DefaultTheme.NavItem[] = [
  { text: 'Fandraisana', link: '/mg/' },
  { text: 'Torolàlana', link: '/mg/docs/guide/installation' },
  { text: 'Boky', link: '/mg/docs/manual/' },
  { text: 'API', link: '/mg/docs/manual/settings/apis' },
  { text: 'Famoahana', link: '/mg/releases/' },
  {
    text: 'Tetikasa',
    items: [
      { text: 'Tantaran\'ny fiovana', link: 'https://github.com/ITDev-Success/billing/blob/main/CHANGELOG.md' },
      { text: 'Loharano', link: 'https://github.com/ITDev-Success/billing' },
      { text: 'Olana', link: 'https://github.com/ITDev-Success/billing/issues' }
    ]
  }
]
