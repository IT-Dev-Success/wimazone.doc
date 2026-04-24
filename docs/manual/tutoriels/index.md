---
title: Tutoriels
description: Parcours pratiques pour démarrer avec Wima Zone Billing
---

# Tutoriels

Cette section regroupe des **parcours pas-à-pas** pour les tâches courantes d'exploitation, après que Wima Zone Billing est installé sur votre MikroTik.

## <Icon name="Compass" color="info" /> Avant de commencer

Assurez-vous que :

- Le container tourne (`/container/print` → `status: running`)
- Vous pouvez accéder au portail admin (`http://172.17.0.2` ou le port redirigé 8080)
- Vous avez le rôle **Super Admin** ou les permissions adaptées

## <Icon name="BookOpen" color="primary" /> Parcours disponibles

### Démarrage

- [Première connexion et configuration initiale](/docs/manual/tutoriels/premiere-connexion) — login, branding, comptes admin
- [Configurer les APIs externes](/docs/manual/tutoriels/apis-externes) — MVola, SMS Befiana, SMTP

### Facturation

- [Créer un forfait et générer des vouchers](/docs/manual/tutoriels/forfait-voucher) — du plan tarifaire au ticket imprimé
- [Activer un voucher côté client](/docs/manual/tutoriels/activation-client) — parcours complet du client hotspot

### Exploitation

- [Suivre les sessions actives](/docs/manual/tutoriels/sessions-actives) — monitoring temps réel et déconnexion forcée
- [Consulter les rapports](/docs/manual/tutoriels/rapports) — revenus, ventes, taux d'utilisation

## <Icon name="HelpCircle" color="warning" /> Besoin d'aide ?

- [Manuel utilisateur](/docs/manual/) — référence complète
- [Dépannage MikroTik](/docs/guide/mikrotik#depannage) — problèmes d'installation ou de container
- Support : [ITDev-Success/billing](https://github.com/ITDev-Success/billing/issues)
