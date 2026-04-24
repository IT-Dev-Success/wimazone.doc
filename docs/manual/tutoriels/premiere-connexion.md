---
title: Première connexion et configuration initiale
description: Découvrez Wima Zone Billing et configurez votre instance en 10 minutes
---

# Première connexion et configuration initiale

![Dashboard Wima Zone Billing](/screenshots/dashboard.png)
*Dashboard post-login — KPIs, statut APIs, graphiques de ventes*

Ce tutoriel vous guide lors du **tout premier démarrage** de Wima Zone Billing : login, sécurisation du compte, branding et comptes admin.

## <Icon name="LogIn" color="info" /> 1) Première connexion

Ouvrez l'URL du portail admin :

```
http://172.17.0.2
```

(ou le port redirigé, ex. `http://192.168.88.1:8080` si vous avez configuré le dst-nat).

**Identifiants initiaux** :

```text
Email    : admin@wimazone.local
Password : ChangeMe!2026
```

## <Icon name="Lock" color="danger" /> 2) Sécuriser le compte Super Admin

**Avant toute autre chose** :

1. Cliquez sur votre avatar en haut à droite → **Profil**
2. Onglet **Sécurité**
3. Changez le mot de passe (12 caractères min, mélange recommandé)
4. Mettez à jour l'email de récupération
5. Activez l'authentification à deux facteurs (2FA) si disponible

## <Icon name="Image" color="warning" /> 3) Appliquer votre branding

Menu → **Paramètres → Général**

| Champ | Exemple |
|---|---|
| **Nom de l'entreprise** | `WiFi Tana` |
| **Logo** | upload PNG/SVG (idéal 256×256 px) |
| **Favicon** | upload 32×32 px |
| **Couleur primaire** | `#0ea5e9` |
| **Devise** | `Ar` (Ariary) |
| **Fuseau horaire** | `Indian/Antananarivo` |
| **Langue par défaut** | `Français` ou `Malagasy` |

Clic sur **Enregistrer** — le branding s'applique immédiatement sur le portail captif et les tickets.

## <Icon name="Users" color="info" /> 4) Créer des comptes admin

Menu → **Utilisateurs & Rôles → Utilisateurs**

1. Clic sur **+ Nouvel utilisateur**
2. Remplir : nom, email, mot de passe temporaire
3. Choisir un rôle :
   - **Super Admin** : accès complet (réservé)
   - **Admin** : gestion quotidienne, sans paramètres sensibles
   - **Caissier** : vente tickets + dashboard uniquement
   - **Support** : lecture seule + chat

::: tip Principe du moindre privilège
Créez un compte `Super Admin` de secours + des comptes `Admin` pour vos opérateurs. N'utilisez le Super Admin qu'en cas de besoin.
:::

## <Icon name="Globe" color="primary" /> 5) Configurer l'URL du portail captif

Menu → **Paramètres → Général → Portail**

| Champ | Description |
|---|---|
| **URL portail** | `http://wima-zone.wifi` (ou votre domaine) |
| **Page d'accueil** | Template HTML de la page de login |
| **Fallback redirect** | URL de secours si portail indisponible |

L'URL doit être ajoutée au **Walled Garden** MikroTik (déjà fait si vous avez suivi le guide d'installation).

## <Icon name="Compass" color="success" /> 6) Tour du tableau de bord

Retour au **Dashboard**. Vous voyez :

- **Barre de statut APIs** en haut (MVola, SMS, SMTP) — tout orange pour l'instant
- **5 cartes KPI** : Revenus jour, Revenus mois, Actif/Expiré, Clients, Tickets
- **Graphiques** : Clients enregistrés & Ventes mensuelles
- **Stock de tickets** par forfait

::: tip Tutoriel embarqué
Le badge "Tutoriel disponible dans la barre de droite" propose un guide pas-à-pas intégré. Cliquez sur **Ouvrir le tutoriel** pour découvrir l'interface de manière interactive.
:::

## <Icon name="CheckCircle2" color="success" /> 7) Checklist après configuration initiale

- [ ] Mot de passe Super Admin changé
- [ ] Branding (logo, couleurs, devise) appliqué
- [ ] Au moins un compte Admin secondaire créé
- [ ] URL portail captif définie
- [ ] Fuseau horaire et langue corrects

## Prochaine étape

→ [Configurer les APIs externes](/docs/manual/tutoriels/apis-externes) (MVola, SMS, SMTP)
