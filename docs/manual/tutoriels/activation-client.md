---
title: Activer un voucher côté client
description: Parcours complet du client hotspot
---

# Activer un voucher côté client

Ce que vit un client qui achète un ticket et se connecte au Wi-Fi.

## <Icon name="Wifi" color="info" /> 1) Connexion au Wi-Fi

Le client se connecte au SSID du hotspot (ex. `WimaZone-Hotspot`). Le portail captif s'ouvre automatiquement sur la page :

```
http://wima-zone.wifi/login
```

## <Icon name="Key" color="success" /> 2) Saisie du code

Sur la page d'accueil du portail :

1. Champ **Code voucher** : le client tape les 8 caractères (ex. `A3X9K2M7`)
2. Clic sur **Activer ma connexion**

Le système vérifie le code :

- ✓ Valide et non utilisé → session ouverte
- ✗ Déjà utilisé → message "Ce code a déjà été activé"
- ✗ Expiré → message "Ce code est expiré"

## <Icon name="Gauge" color="primary" /> 3) Dashboard client

Une fois connecté, le client accède à son espace :

```
http://wima-zone.wifi/customer
```

Il y voit :

- **Temps restant** : compte à rebours
- **Volume restant** : barre de progression
- **Forfait actif** : nom + prix
- **Historique de sessions**

## <Icon name="Smartphone" color="warning" /> 4) Déconnexion

Le client peut :

- Cliquer sur **Se déconnecter** dans son dashboard
- Fermer simplement le navigateur (la session se termine automatiquement à expiration)

## <Icon name="BellOff" color="secondary" /> 5) Notifications

Si **SMS Befiana** est configuré, le client reçoit :

- Un SMS à l'activation (confirmation + code de secours)
- Un SMS 15 minutes avant expiration (configurable)

Si **SMTP** est configuré et que le client a renseigné son email, il reçoit une facture PDF par email.

## <Icon name="Shield" color="danger" /> Côté admin : suivre la session

Dans **Gestion des clients → Sessions Actives** :

- Voir en temps réel toutes les sessions ouvertes
- Déconnecter un client (bouton **Kick**)
- Exporter la liste en CSV

## <Icon name="AlertTriangle" color="warning" /> Problèmes fréquents

| Symptôme | Cause | Solution |
|---|---|---|
| Portail ne s'ouvre pas | DNS bloqué | Vérifier walled-garden `wima-zone.wifi` |
| Code accepté mais pas d'internet | Profil MikroTik absent | Re-synchroniser le routeur |
| Déconnexion immédiate | Bandwidth profile non appliqué | Vérifier *Gestion Hotspot* sur le routeur |

## Prochaine étape

→ [Consulter les rapports](/docs/manual/tutoriels/rapports)
