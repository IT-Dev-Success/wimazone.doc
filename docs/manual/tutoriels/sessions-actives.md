---
title: Suivre les sessions actives
description: Monitoring temps réel et déconnexion forcée
---

# Suivre les sessions actives

![Sessions actives en temps réel](/screenshots/sessions.png)
*Gestion des clients → Sessions Actives — clients connectés en temps réel*

Le panneau **Sessions Actives** donne une vue en temps réel de tous les clients connectés.

## <Icon name="Activity" color="info" /> 1) Ouvrir le panneau

Menu → **Gestion des clients → Sessions Actives**.

Par défaut, la liste s'actualise via WebSocket (Reverb) toutes les 5 secondes.

## <Icon name="Users" color="primary" /> 2) Informations affichées

Pour chaque session :

| Colonne | Contenu |
|---|---|
| **Client** | Nom ou identifiant voucher |
| **IP** | Adresse IP attribuée par le DHCP |
| **MAC** | Adresse MAC de l'appareil |
| **Routeur** | Nom du MikroTik concerné |
| **Forfait** | Nom + durée restante |
| **Volume** | Download / Upload consommé |
| **Débit** | Bande passante instantanée (Kbps) |
| **Début** | Heure d'activation |

## <Icon name="Filter" color="warning" /> 3) Filtrer et rechercher

- Barre de recherche : par IP, MAC, nom ou code voucher
- Filtres rapides : **Par routeur**, **Par forfait**
- Tri cliquable sur chaque colonne

## <Icon name="XCircle" color="danger" /> 4) Déconnecter un client

1. Sélectionner la session (case à cocher)
2. Clic sur **Déconnecter** (bouton rouge)
3. Confirmer

Wima Zone envoie une commande `/ip/hotspot/active/remove` au routeur et la session disparaît immédiatement.

::: warning Déconnexion massive
Pour déconnecter tous les clients d'un routeur (maintenance), utilisez **Routeurs → Actions → Déconnecter tous les clients**.
:::

## <Icon name="Download" color="success" /> 5) Exporter

Clic sur **Exporter** → génère un CSV avec toutes les colonnes visibles.

Utile pour :

- Rapports de conformité
- Analyse de charge (heures de pointe)
- Facturation hors ligne

## <Icon name="AlertOctagon" color="warning" /> 6) Sessions bloquées

Si un client apparaît mais n'a pas d'internet :

1. Vérifier **Bande passante** dans la colonne débit (doit être > 0)
2. Vérifier que le profil MikroTik est appliqué : **Routeur → Gestion Hotspot → Utilisateurs actifs**
3. Re-synchroniser si besoin : **Routeurs → [nom] → Synchroniser maintenant**

## Prochaine étape

→ [Consulter les rapports](/docs/manual/tutoriels/rapports)
