---
title: Module Cyber Café — parcours complet
description: Du premier poste jusqu'à l'activation libre-service du client
---

# Module Cyber Café — parcours complet

Ce tutoriel couvre le cycle complet : créer un poste, générer son code d'activation, installer le client **Wima Cafe** desktop, démarrer une session prépayée ou postpayée, et activer le mode libre-service.

![Dashboard Cyber Café](/screenshots/cafe-dashboard.png)
*Vue d'ensemble du dashboard `/cafe` — postes, sessions et contrôles MikroTik*

## <Icon name="Plus" color="info" /> 1) Créer le premier poste

Menu → **Gestion du réseau → Postes de travail** (`/cafe`).

1. Clic sur **+ Nouveau poste**
2. Remplir :

| Champ | Exemple |
|---|---|
| **Nom** | `PC-01` |
| **IP fixe** | `192.168.88.10` (même plage DHCP réservée) |
| **Routeur** | sélectionner votre MikroTik |
| **Tarif/minute** | `10 Ar` (configurable globalement) |
| **Mode** | `Prépayé` ou `Postpayé` |

3. **Enregistrer** — le système génère automatiquement un **code d'activation 12 chiffres** au format `XXX-XXX-XXX-XXX`.

::: tip Code d'activation
Ce code lie un poste physique à un enregistrement Wima Zone. Gardez-le confidentiel : il permet à l'app Wima Cafe de s'authentifier.
:::

## <Icon name="MonitorDown" color="warning" /> 2) Installer le client Wima Cafe sur le poste

Sur chaque PC du cyber café :

1. Télécharger le binaire **Wima Cafe** (Windows `.msix` / macOS `.app` / Linux `.AppImage`)
2. Installer avec droits administrateur
3. Lancer — l'écran de configuration s'affiche

Renseigner :

| Champ | Valeur |
|---|---|
| URL serveur Billing | `http://172.17.0.2:80` (IP container) |
| URL WebSocket | `ws://172.17.0.2:80/ws/cafe-client` |
| Nom du poste | `PC-01` (doit correspondre au dashboard) |
| Code d'activation | les 12 chiffres reçus |
| Nom entreprise | `Mon Cyber Café` |

Clic sur **Activer** → l'app passe en mode **lock screen plein écran** : le poste est verrouillé.

## <Icon name="Play" color="success" /> 3) Démarrer une session prépayée

Depuis l'admin :

1. Dashboard `/cafe` → ligne du poste `PC-01`
2. Clic sur **Démarrer session**
3. Choisir :
   - **Durée** : 30 min / 1h / 2h / custom
   - **Client** : scan voucher ou saisie libre
   - **Mode de paiement** : Espèces / MVola / Avance
4. Confirmer

Côté client : le lock screen disparaît, le bureau est accessible, un badge affiche le temps restant en permanence.

## <Icon name="Clock" color="primary" /> 4) Démarrer une session postpayée

Même chose mais mode **Postpayé** coché. Aucun paiement à l'ouverture. À la fin :

1. Clic sur **Terminer session**
2. Le système calcule `ceil(secondes/60) × tarif/min`
3. L'admin encaisse le montant affiché

## <Icon name="UserCheck" color="info" /> 5) Mode libre-service

Pour laisser le client démarrer lui-même (sans admin derrière le comptoir) :

1. Dashboard → ligne du poste → **Activer libre-service**
2. Définir le tarif par défaut et la durée max
3. Sauver

Côté client : le lock screen affiche un bouton **Démarrer ma session**. Le client choisit sa durée, paie (MVola ou voucher), la session s'ouvre automatiquement.

## <Icon name="Ban" color="danger" /> 6) Verrouiller un poste à la demande

À tout moment, depuis le dashboard :

- **Verrouiller** → force le lock screen (ex. comportement abusif)
- **Supprimer** → retire le poste + nettoie l'IP binding MikroTik

## <Icon name="RefreshCw" color="warning" /> 7) Synchroniser avec MikroTik

Si des postes apparaissent "désynchronisés" (vus comme bloqués/débloqués incorrectement) :

1. Dashboard `/cafe` → bouton **Sync MikroTik** en haut
2. Le système reparcourt tous les postes et réapplique la règle IP binding correcte

::: tip Configuration initiale firewall
Au tout premier déploiement, cliquez aussi sur **Configurer le firewall** pour injecter la règle `cafe-blocked` sur le routeur. Voir [Configuration MikroTik cafe](/docs/manual/cafe/mikrotik).
:::

## <Icon name="AlertTriangle" color="danger" /> Dépannage

Voir aussi [Dépannage MikroTik](/docs/manual/cafe/mikrotik#depannage).

| Symptôme | Solution |
|---|---|
| Client reste bloqué sur "Poste inconnu 404" | Vérifier que le nom du poste matche exactement le dashboard (casse comprise) |
| Session démarrée mais poste toujours bloqué | Clic sur **Sync MikroTik** |
| L'app Wima Cafe ne s'authentifie pas | Régénérer le code d'activation (`/cafe/stations/{id}/regenerate-token`) |
| Le lock screen ne couvre pas tout l'écran | Vérifier que l'app est lancée en mode kiosk (Windows uniquement en prod) |

## Voir aussi

- [Vue d'ensemble Module Cyber Café](/docs/manual/cafe/)
- [Configuration MikroTik cafe](/docs/manual/cafe/mikrotik)
- [Client Logiciel Wima Cafe](/docs/manual/cafe/client)
