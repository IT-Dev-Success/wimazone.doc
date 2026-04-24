---
title: Prérequis MikroTik
description: Matériel, RouterOS et pré-vérifications avant d'installer Wima Zone Billing en container sur MikroTik
---

# Prérequis MikroTik

Cette page récapitule tout ce qu'il faut avoir prêt **avant** de suivre le [Guide d'installation MikroTik](/docs/guide/mikrotik). Wima Zone Billing s'installe exclusivement en **mode container RouterOS v7**, avec une **MariaDB embarquée** persistée sur USB. L'image Docker est multi-arch et couvre ARM 32 et ARM 64 bits — le bon binaire est pull automatiquement selon le CPU du routeur.

::: info hEX refresh / hEX S 2025
Ces deux modèles utilisent la même puce Airoha EN7562CT (Cortex-A53 en mode AArch32). Le container engine MikroTik déclare `archVariant:v5` au registry Docker ; le manifest publie donc le binaire ARM 32 sous cet alias pour qu'il soit tiré correctement.
:::

## <Icon name="Router" color="warning" /> Matériel compatible {#requirements}

Routeurs MikroTik testés et supportés :

| Modèle | Product code | Architecture | RAM | Stockage conseillé |
|---|---|---|---:|---|
| hEX refresh | E50UG | ARM 32 bits (EN7562CT) | 512 MB | USB ≥ 8 GB |
| hEX S 2025 | E60iUGS | ARM 32 bits (EN7562CT) | 512 MB | USB ≥ 8 GB |
| L009UiGS-2HaxD-IN | — | ARM 32 bits | 512 MB | USB ≥ 8 GB |
| L009UiGS-RM | — | ARM 32 bits | 512 MB | USB ≥ 8 GB |
| hAP ax2 | — | ARM 64 bits | 1 GB | USB ≥ 16 GB |
| hAP ax3 | — | ARM 64 bits | 1 GB | USB ≥ 16 GB |

::: tip Boutique
Les modèles ci-dessus sont disponibles à l'achat sur **[wimazone.mg/boutique](https://wimazone.mg/boutique)**.
:::

## <Icon name="Cpu" color="info" /> RouterOS

- **RouterOS 7.10+** (support stable du mode container).
- Licence **Level 4** minimum.
- `device-mode` en **`advanced`** (le mode par défaut `home` bloque la fonctionnalité container).
- Fonctionnalité `container` activable via `/system/device-mode` (confirmation par bouton reset physique).
- Temps NTP synchronisé (sinon les certificats TLS échouent).

## <Icon name="HardDrive" color="primary" /> Stockage USB

- Clé USB formatée en **ext4** (MariaDB refuse de démarrer sur FAT32/NTFS).
- **16 GB** recommandés (image ~150 MB + data MariaDB + backups + logs).
- **8 GB** suffisants pour hEX refresh / hEX S 2025 (512 Mo RAM = backups plus légers).
- Alimentation stable : évitez les hubs USB non alimentés sur les modèles ax2/ax3.

## <Icon name="Network" color="success" /> Réseau

- Accès Internet sortant (port 443) pour `docker.io`, `github.com` et l'API ITDevSuccess.
- Port **8728** (API MikroTik) ou **8729** (API-SSL) disponibles en interne.
- Plage IP dédiée au bridge container : `172.17.0.0/24` (ajustable).
- DNS fonctionnel sur le routeur (`/ip/dns`).

## <Icon name="Key" color="warning" /> Licence & accès

- **Licence** fourni par ITDevSuccess (variable `GITHUB_PRIVATE_ACCESS_TOKEN`).
- Identifiants **MVola** prêts si paiement mobile activé.
- Accès **Befiana SMS** si notifications SMS activées.

## <Icon name="CheckCircle" color="success" /> Checklist pré-installation {#post-installation}

Avant de lancer les commandes d'installation :

- [ ] RouterOS v7.10+ installé et à jour (`/system/package/update check-for-updates`)
- [ ] `device-mode` en `advanced` (`/system/device-mode/print`)
- [ ] Clé USB montée et formatée ext4 (`/disk/print`) avec dossiers `tmp/`, `layer/` et `billing-data/` accessibles
- [ ] DNS du routeur fonctionnel (`/ip/dns/print`)
- [ ] Temps système synchronisé (`/system/ntp/client/print`)
- [ ] Licence reçu d'ITDevSuccess
- [ ] Mots de passe MariaDB choisis (`DB_PASSWORD` + `MARIADB_ROOT_PASSWORD`)
- [ ] URL du portail captif décidée (`REDIRECT_URL`)
- [ ] Walled Garden prévu pour les domaines critiques (MVola, Befiana, Tawk)

::: warning Prochaine étape
Tous les prérequis sont OK ? Continuez vers le **[Guide d'installation MikroTik](/docs/guide/mikrotik)** pour les commandes pas-à-pas.
:::
