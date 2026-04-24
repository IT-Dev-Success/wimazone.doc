import { DefaultTheme } from "vitepress";

export const sidebarFr: DefaultTheme.Sidebar = {
  "/docs/guide/": [
    {
      text: "Démarrage",
      collapsed: false,
      items: [
        {
          text: "Prérequis MikroTik",
          link: "/docs/guide/installation#requirements",
        },
      ],
    },
    {
      text: "Installation MikroTik",
      collapsed: false,
      items: [
        { text: "Guide complet", link: "/docs/guide/mikrotik" },
        { text: "Premier accès", link: "/docs/guide/mikrotik#premier-acces" },
        { text: "Walled Garden", link: "/docs/guide/mikrotik#walled-garden" },
      ],
    },
    {
      text: "wimalite (hEX refresh / hEX S 2025)",
      collapsed: false,
      items: [
        { text: "Installation wimalite", link: "/docs/guide/wimalite" },
      ],
    },
    {
      text: "Exploitation",
      collapsed: false,
      items: [
        {
          text: "Backup & restore",
          link: "/docs/guide/mikrotik#backup-restore",
        },
        { text: "Mise à jour", link: "/docs/guide/mikrotik#mise-a-jour" },
        { text: "Dépannage", link: "/docs/guide/mikrotik#depannage" },
      ],
    },
  ],
  "/docs/manual/": [
    {
      text: "Manuel utilisateur",
      items: [
        { text: "Vue d’ensemble", link: "/docs/manual/" },
        { text: "Paramètres globaux", link: "/docs/manual/settings/" },
        { text: "APIs disponibles", link: "/docs/manual/settings/apis" },
        { text: "Opérations routeur", link: "/docs/manual/router/" },
      ],
    },
    {
      text: "Tutoriels",
      collapsed: false,
      items: [
        { text: "Vue d’ensemble", link: "/docs/manual/tutoriels/" },
        {
          text: "Première connexion",
          link: "/docs/manual/tutoriels/premiere-connexion",
        },
        {
          text: "Configurer les APIs externes",
          link: "/docs/manual/tutoriels/apis-externes",
        },
        {
          text: "Créer forfait & vouchers",
          link: "/docs/manual/tutoriels/forfait-voucher",
        },
        {
          text: "Activer un voucher client",
          link: "/docs/manual/tutoriels/activation-client",
        },
        {
          text: "Suivre les sessions actives",
          link: "/docs/manual/tutoriels/sessions-actives",
        },
        {
          text: "Consulter les rapports",
          link: "/docs/manual/tutoriels/rapports",
        },
        {
          text: "Module Cyber Café",
          link: "/docs/manual/tutoriels/module-cafe",
        },
      ],
    },
    {
      text: "Module Cyber Café",
      collapsed: false,
      items: [
        { text: "Vue d’ensemble", link: "/docs/manual/cafe/" },
        { text: "Configuration MikroTik", link: "/docs/manual/cafe/mikrotik" },
        { text: "Client Logiciel Wima Cafe", link: "/docs/manual/cafe/client" },
      ],
    },
    {
      text: "Références",
      collapsed: false,
      items: [
        { text: "Glossaire", link: "/docs/manual/glossaire" },
        { text: "FAQ", link: "/docs/manual/faq" },
      ],
    },
  ],
};

export const sidebarMg: DefaultTheme.Sidebar = {
  "/mg/docs/guide/": [
    {
      text: "Fanombohana",
      collapsed: false,
      items: [
        {
          text: "Fepetra takiana MikroTik",
          link: "/mg/docs/guide/installation#requirements",
        },
      ],
    },
    {
      text: "Fametrahana MikroTik",
      collapsed: false,
      items: [
        { text: "Torolalana feno", link: "/mg/docs/guide/mikrotik" },
        {
          text: "Fidirana voalohany",
          link: "/mg/docs/guide/mikrotik#premier-acces",
        },
        {
          text: "Walled Garden",
          link: "/mg/docs/guide/mikrotik#walled-garden",
        },
      ],
    },
    {
      text: "wimalite (hEX refresh / hEX S 2025)",
      collapsed: false,
      items: [
        { text: "Fametrahana wimalite", link: "/mg/docs/guide/wimalite" },
      ],
    },
    {
      text: "Fikarakarana",
      collapsed: false,
      items: [
        {
          text: "Backup sy famerenana",
          link: "/mg/docs/guide/mikrotik#backup-restore",
        },
        { text: "Fanavaozana", link: "/mg/docs/guide/mikrotik#mise-a-jour" },
        { text: "Famahana olana", link: "/mg/docs/guide/mikrotik#depannage" },
      ],
    },
  ],
  "/mg/docs/manual/": [
    {
      text: "Boky Torolàlana Mpampiasa",
      items: [
        { text: "Fijery ankapobeny", link: "/mg/docs/manual/" },
        { text: "Paramètre ankapobeny", link: "/mg/docs/manual/settings/" },
        { text: "API misy", link: "/mg/docs/manual/settings/apis" },
        { text: "Asan'ny routeur", link: "/mg/docs/manual/router/" },
      ],
    },
    {
      text: "Tutoriel",
      collapsed: false,
      items: [
        { text: "Fijery ankapobeny", link: "/mg/docs/manual/tutoriels/" },
        {
          text: "Fidirana voalohany",
          link: "/mg/docs/manual/tutoriels/premiere-connexion",
        },
        {
          text: "Apetraho ny API ivelany",
          link: "/mg/docs/manual/tutoriels/apis-externes",
        },
        {
          text: "Forfait sy voucher",
          link: "/mg/docs/manual/tutoriels/forfait-voucher",
        },
        {
          text: "Manomboka voucher mpanjifa",
          link: "/mg/docs/manual/tutoriels/activation-client",
        },
        {
          text: "Manaraha ny session",
          link: "/mg/docs/manual/tutoriels/sessions-actives",
        },
        {
          text: "Zahao ny tatitra",
          link: "/mg/docs/manual/tutoriels/rapports",
        },
        {
          text: "Module Cyber Café",
          link: "/mg/docs/manual/tutoriels/module-cafe",
        },
      ],
    },
    {
      text: "Module Cyber Café",
      collapsed: false,
      items: [
        { text: "Fijery ankapobeny", link: "/mg/docs/manual/cafe/" },
        { text: "Fametrahana MikroTik", link: "/mg/docs/manual/cafe/mikrotik" },
        {
          text: "Client Logiciel Wima Cafe",
          link: "/mg/docs/manual/cafe/client",
        },
      ],
    },
    {
      text: "Fanampiny",
      collapsed: false,
      items: [
        { text: "Rakibolana", link: "/mg/docs/manual/glossaire" },
        { text: "FAQ", link: "/mg/docs/manual/faq" },
      ],
    },
  ],
};
