import { defineConfig } from 'vitepress'
import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { sidebarFr, sidebarEn } from './config/sidebars'
import { navFr, navEn } from './config/nav'

export default defineConfig({
  title: "WimaZone Billing",
  description: "Laravel billing platform for MikroTik hotspot and ISP operations",
  lang: 'fr-FR',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://wimazone.github.io'
  },
  buildEnd: ({ outDir }) => {
    const sitemap = createWriteStream(resolve(outDir, 'robots.txt'))
    sitemap.write('User-agent: *\n')
    sitemap.write('Allow: /\n')
    sitemap.write('Sitemap: https://wimazone.github.io/sitemap.xml\n')
    sitemap.end()
  },
  
  head: [
    ['link', { rel: 'icon', href: '/logo-m.svg' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'WimaZone Billing' }],
    ['meta', { property: 'og:image', content: 'https://wimazone.github.io/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://wimazone.github.io/og-image.png' }],
    ['meta', { name: 'google-site-verification', content: '4O3WAvbJ9_RwH-MmOznbAXnzTz_wEKzuIhmNjx3mXPs' }]
  ],

  transformHead: ({ pageData }) => {
    const title = pageData.title ? `${pageData.title} | WimaZone Billing` : 'WimaZone Billing'
    const description = pageData.description || "Laravel billing platform for MikroTik hotspot and ISP operations"
    const url = `https://wimazone.github.io/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2')}`

    return [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  // Shared theme config
  themeConfig: {
    logo: {
      light: '/logo-m.svg',
      dark: '/logo-m-dark.svg'
    },
    siteTitle: false,
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ITDev-Success/billing' }
    ],

    footer: {
      message: 'Proprietary software. Internal usage only.',
      copyright: `Copyright © 2026${new Date().getFullYear() > 2026 ? ' - ' + new Date().getFullYear() : ''} ITDev Success`
    },

    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: 'Français',
      lang: 'fr-FR',
      themeConfig: {
        nav: navFr,
        sidebar: sidebarFr
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: navEn,
        sidebar: sidebarEn
      }
    }
  }
})
