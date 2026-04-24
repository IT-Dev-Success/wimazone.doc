---
title: Configurer les APIs externes
description: MVola, SMS Befiana, SMTP — intégrations tiers
---

# Configurer les APIs externes

![Page APIs externes](/screenshots/apis.png)
*Paramètres → APIs — vue d'ensemble des intégrations MVola, SMS, SMTP, Escrow*

Wima Zone s'interface avec plusieurs services tiers. Voici comment les activer depuis l'interface admin.

## <Icon name="Smartphone" color="primary" /> MVola Mobile Money

1. Menu → **Paramètres → APIs → MVola**
2. Renseigner :
   - **Consumer Key** (fourni par MVola)
   - **Consumer Secret**
   - **Partner Name**
   - **Callback URL** : `https://votre-portail.example.com/webhooks/mvola`
3. Mode **Sandbox** pour tests, **Production** après validation
4. Clic sur **Tester la connexion**

::: tip Portabilité
Le numéro MVola du marchand est affiché aux clients sur la page de paiement — vérifiez qu'il est à jour dans **Paramètres → Général**.
:::

## <Icon name="MessageSquare" color="warning" /> SMS Befiana

1. Menu → **Paramètres → APIs → SMS (Befiana)**
2. Renseigner :
   - **API Key Befiana**
   - **Sender ID** (ex. `WimaZone`, 11 caractères max)
3. Activer les gabarits de message :
   - **Activation voucher**
   - **Expiration proche** (X minutes avant fin)
   - **Facture envoyée**
4. Tester avec un numéro de test depuis **Envoyer un SMS test**

## <Icon name="Mail" color="info" /> SMTP (emails)

1. Menu → **Paramètres → SMTP**
2. Remplir :

| Champ | Exemple Gmail |
|---|---|
| **Host** | `smtp.gmail.com` |
| **Port** | `587` |
| **Chiffrement** | `TLS` |
| **Utilisateur** | `votre-compte@gmail.com` |
| **Mot de passe** | mot de passe d'application Gmail |
| **From** | `billing@wimazone.mg` |

1. Clic sur **Envoyer un email test**

::: warning Production
Pour un volume élevé d'emails (relances, factures), utilisez un service dédié (Mailgun, SendGrid, AWS SES) plutôt que Gmail.
:::

## <Icon name="MessageCircle" color="success" /> Tawk.to (chat support)

1. Menu → **Paramètres → Général → Chat support**
2. Coller votre ID Tawk.to (propriété + widget)
3. Activer — le widget apparaît sur le portail captif client

## <Icon name="CheckCircle" color="primary" /> Vérifier l'état

Sur le **Dashboard**, en haut de la page, la barre **Statut des APIs** affiche :

- `MVola configuré` ✓ vert
- `SMS incomplet` ⚠ orange (clé manquante)
- `SMTP incomplet` ⚠ orange

Cliquez sur un badge pour ouvrir directement la page de configuration correspondante.

## Prochaine étape

→ [Créer un forfait et générer des vouchers](/docs/manual/tutoriels/forfait-voucher)
