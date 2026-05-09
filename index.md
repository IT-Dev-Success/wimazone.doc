---
layout: home

hero:
  name: "Wima Zone Billing"
  text: "Facturation Hotspot en container MikroTik"
  tagline: Installation clé en main sur RouterOS v7 — vouchers, clients, paiements et synchro routeur, le tout depuis votre MikroTik.
  image:
    light: /logo-m.svg
    dark: /logo-m-dark.svg
    alt: Wima Zone Logo
  actions:
    - theme: brand
      text: Installer sur MikroTik
      link: /docs/guide/mikrotik
    - theme: alt
      text: Prérequis
      link: /docs/guide/installation

features:
  - title: Container RouterOS v7
    details: Image ARM/ARM64 déployée directement sur le routeur. Pas de serveur séparé, pas de VPS à gérer.
  - title: MikroTik RouterOS API v7
    details: Synchronisation hotspot, IP bindings, walled garden et sessions en temps réel via l'API native du routeur.
  - title: MariaDB embarquée sur USB
    details: Base de données MariaDB intégrée au container, persistée sur clé USB ext4. Dump et restore via mysqldump.
  - title: Walled Garden prêt à l'emploi
    details: Règles walled garden fournies pour MVola, Befiana SMS, Tawk.to et le portail captif.
---

## Aperçu du tableau de bord

![Tableau de bord Wima Zone Billing](/screenshots/dashboard.png)

<p style="text-align: center; opacity: 0.7; margin-top: -1rem;">
  Vue temps réel : revenus, clients actifs, statut APIs (MVola, SMS, SMTP), stock de tickets et graphiques de ventes mensuelles.
</p>

## Pourquoi Wima Zone sur MikroTik ?

Wima Zone Billing est un **système de facturation hotspot** conçu pour tourner **directement sur votre routeur MikroTik** en mode container. Pas de serveur à louer, pas de Docker à installer ailleurs — tout vit sur le routeur.

### Points clés

- <Icon name="Router" color="warning" /> **Déploiement sur routeur** : image container publiée sur Docker Hub, tirée directement par RouterOS v7.
- <Icon name="Database" color="info" /> **Base MariaDB embarquée** : tourne à l'intérieur du container, données persistées sur USB ext4, sans serveur DB externe.
- <Icon name="Users" color="info" /> **Parcours client complet** : login hotspot, activation voucher, dashboard client, support.
- <Icon name="Receipt" color="success" /> **Cœur billing** : forfaits, factures, paiements MVola, relances automatiques.
- <Icon name="Wrench" color="primary" /> **Outillage ops** : scheduler, queue, diagnostics API MikroTik, mises à jour container en une commande.

::: tip Matériel recommandé
Le routeur **hAP ax3** (ARM 64, 1 GB RAM) offre le meilleur confort d'exécution. Disponible sur [wimazone.mg/boutique](https://wimazone.mg/boutique).
:::
