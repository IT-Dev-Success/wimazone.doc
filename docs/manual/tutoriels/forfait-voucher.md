---
title: Créer un forfait et générer des vouchers
description: Du plan tarifaire au ticket imprimé
---

# Créer un forfait et générer des vouchers

![Liste des forfaits internet](/screenshots/forfaits.png)
*Facturation & Forfaits → Forfaits Internet — gestion des plans tarifaires*

Ce tutoriel couvre la création d'un forfait internet et la génération de tickets vouchers prêts à vendre.

## <Icon name="Package" color="info" /> 1) Créer un forfait internet

1. Menu → **Facturation & Forfaits → Forfaits Internet**
2. Clic sur **+ Nouveau forfait**
3. Remplir :

| Champ | Exemple |
|---|---|
| **Nom** | `Journée 1 GB` |
| **Durée** | `24 heures` |
| **Volume** | `1024 MB` (0 pour illimité) |
| **Bande passante** | `2M/2M` (download/upload) |
| **Prix (Ar)** | `1000` |
| **Profil MikroTik** | `1day-1gb` (sera créé automatiquement) |
| **Actif** | ✓ |

1. **Enregistrer**. Wima Zone pousse automatiquement le profil sur le routeur.

![Page Tickets / Vouchers](/screenshots/tickets.png)
*Gestion des clients → Tickets — stock, statut et impression*

## <Icon name="Ticket" color="success" /> 2) Générer un lot de vouchers

1. Menu → **Gestion des clients → Tickets**
2. Clic sur **+ Générer des vouchers**
3. Remplir :

| Champ | Exemple |
|---|---|
| **Forfait** | `Journée 1 GB` |
| **Quantité** | `50` |
| **Longueur code** | `8` caractères |
| **Format** | Alphanumérique majuscule |
| **Date d'expiration** | *(laisser vide pour pas d'expiration)* |

1. Clic sur **Générer**. Les 50 codes sont créés d'un coup.

## <Icon name="Printer" color="primary" /> 3) Imprimer les tickets

1. Sélectionner les vouchers dans la liste (case à cocher)
2. Clic sur **Imprimer la sélection**
3. Choisir le template (ex. `Ticket 58mm thermique` ou `A4 – 10 par page`)
4. L'aperçu s'affiche. Clic sur **Imprimer** → la commande est envoyée à votre imprimante.

::: tip Astuce impression thermique
Pour une imprimante 58mm connectée en USB/Bluetooth à un appareil Android/POS, utilisez le template **Ticket 58mm** dans Paramètres → Templates ticket.
:::

## <Icon name="BarChart" color="warning" /> 4) Suivre le stock

Dans **Dashboard → Stock de Tickets**, vous voyez en permanence :

- `Inutilisé` : vouchers non encore vendus
- `Utilisé` : vouchers activés par un client

Quand le stock d'un forfait passe en dessous de 20 %, l'interface affiche une alerte orange.

## Prochaine étape

→ [Activer un voucher côté client](/docs/manual/tutoriels/activation-client)
