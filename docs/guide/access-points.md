---
title: Configuration AP MikroTik
description: Configurer un Access Point MikroTik (dual-band Wi-Fi) en cascade derrière le routeur Wima Zone principal
---

# Configuration d'un AP MikroTik

Cette page explique comment configurer un **point d'accès Wi-Fi MikroTik dual-band** (2.4 GHz + 5 GHz) qui diffusera le SSID **Wima Zone** dans une zone de couverture donnée. L'AP est branché en **LAN** sur le routeur principal qui lui fait tourner le portail captif + container billing.

::: tip Cas d'usage
- **1 routeur principal** (L009, hAP ax³, RB5009, RB4011…) avec container `wimazone/billing` et hotspot configuré.
- **N points d'accès** (wAP ax, hAP ax², cAP ax, etc.) répartis pour la couverture Wi-Fi — chacun en bridge transparent vers le LAN du routeur principal.

Les clients qui se connectent au SSID sont redirigés vers le portail captif du routeur principal.
:::

## <Icon name="Router" color="warning" /> Modèles d'AP recommandés

| Modèle | Code | Bandes | Backhaul |
|---|---|---|---|
| **wAP ax** | L22UGS-5HaxD2HaxD | 2.4 + 5 GHz Wi-Fi 6 | SFP / Ethernet |
| **cAP ax** | cAPGi-5HaxD2HaxD | 2.4 + 5 GHz Wi-Fi 6 | PoE |
| **hAP ax²** | C52iG-5HaxD2HaxD-TC | 2.4 + 5 GHz Wi-Fi 6 | Ethernet |
| **hAP ax³** | C53UiG+5HPaxD2HPaxD | 2.4 + 5 GHz Wi-Fi 6 | Ethernet (recommandé hot-spot dense) |

::: warning RouterOS 7.13+ requis
La syntaxe `/interface/wifi/` (sans `wave2`) est apparue avec RouterOS 7.13. Les anciens modèles `/interface/wifiwave2/` peuvent encore s'utiliser mais avec une syntaxe différente — adapter les commandes en conséquence.
:::

## 1) Première connexion à l'AP

Branche-toi en câble Ethernet sur le port LAN de l'AP. Par défaut son IP est `192.168.88.1/24`. Configure ton PC avec une IP dans le même réseau (ex : `192.168.88.10`) et connecte-toi via :

- **Winbox** → `192.168.88.1` → user `admin`, mot de passe vide (à changer immédiatement)
- **SSH** → `ssh admin@192.168.88.1`
- **WebFig** → <http://192.168.88.1>

::: danger Changer le mot de passe admin
```routeros
/user/set admin password=UN_MOT_DE_PASSE_FORT
```
:::

## 2) Reset usine (optionnel mais recommandé)

Si l'AP a déjà été configuré, repartir d'une base propre évite les surprises :

```routeros
/system/reset-configuration no-defaults=yes skip-backup=yes
```

L'AP redémarre, plus aucune config. Reconnecte-toi par MAC via Winbox (le DHCP n'est plus actif).

## 3) Créer le bridge LAN

Le bridge va regrouper le port uplink (SFP ou Ethernet selon le modèle) et les 2 interfaces Wi-Fi :

```routeros
/interface/bridge
add name=bridge protocol-mode=rstp
```

`protocol-mode=rstp` évite les boucles si tu cascade plusieurs APs.

## 4) Ajouter les ports au bridge

Adapter le nom de l'uplink selon le modèle :
- **wAP ax (L22UGS)** → `sfp1` (fibre) ou `ether1`
- **hAP ax²/ax³** → `ether1`
- **cAP ax** → `ether1` (PoE in)

```routeros
/interface/bridge/port
add bridge=bridge interface=sfp1
add bridge=bridge interface=wifi1
add bridge=bridge interface=wifi2
```

## 5) Datapath Wi-Fi commun

Le datapath relie les radios Wi-Fi au bridge :

```routeros
/interface/wifi/datapath
add name=dp1 bridge=bridge
```

## 6) Configurations Wi-Fi (2.4 GHz + 5 GHz)

```routeros
/interface/wifi/configuration
add name=cfg-2g mode=ap ssid="Wima Zone 2G" country="South Africa" \
    channel.band=2ghz-n channel.width=20mhz datapath=dp1
add name=cfg-5g mode=ap ssid="Wima Zone 5G" country="South Africa" \
    channel.band=5ghz-ac datapath=dp1
```

::: tip Pourquoi `country="South Africa"` ?
Madagascar n'est pas toujours présent dans la liste régulatoire RouterOS. **South Africa** est le profil le plus proche (mêmes bandes 2.4 / 5 GHz autorisées, puissance similaire). Si ton AP supporte explicitement `country="Madagascar"`, l'utiliser à la place.
:::

::: info SSID unifié 2G/5G (option)
Pour que les clients basculent automatiquement entre 2.4 et 5 GHz selon la qualité du signal, utiliser **le même SSID** pour les deux configurations :

```routeros
add name=cfg-2g mode=ap ssid="Wima Zone" ...
add name=cfg-5g mode=ap ssid="Wima Zone" ...
```

Sinon, garder des SSIDs distincts (`Wima Zone 2G` / `Wima Zone 5G`) pour le contrôle manuel — utile en cyber-café où les postes fixes doivent être en 5G.
:::

## 7) Activer les radios

```routeros
/interface/wifi
set wifi1 configuration=cfg-2g disabled=no
set wifi2 configuration=cfg-5g disabled=no
```

## 8) IP de management de l'AP

L'AP n'a **pas besoin** de DHCP serveur — c'est le routeur principal qui le fournit aux clients. Mais l'AP doit avoir une IP fixe sur le bridge pour qu'on puisse l'administrer à distance :

```routeros
/ip/address
add address=192.168.88.2/24 interface=bridge
```

::: warning IP unique par AP
Si tu déploies plusieurs APs, **incrémente** l'adresse : 192.168.88.2, .3, .4… (ou réserver une plage `192.168.88.200-250` pour les APs dans le DHCP du routeur principal).
:::

## 9) Vérifications

```routeros
/interface/wifi/print          # wifi1 + wifi2 en `running`
/interface/bridge/port/print   # sfp1, wifi1, wifi2 attachés à `bridge`
/ip/address/print              # 192.168.88.2/24 sur bridge
/interface/wifi/registration-table/print  # clients connectés
```

Côté smartphone : vérifier que le SSID **Wima Zone 2G** (et / ou 5G) apparaît dans la liste des réseaux. Connexion → redirection automatique vers le portail captif Wima Zone (servi par le routeur principal).

## 10) Cascade avec le routeur principal Wima Zone

L'AP fonctionne en **L2 bridge transparent** — il ne fait pas de NAT, pas de DHCP, pas de hotspot. Tout ça reste sur le routeur principal.

```text
[Internet]
   │
[Router principal Wima Zone] ── hotspot + container billing
   │ (LAN: 192.168.88.1/24, DHCP 192.168.88.10-199)
   ├── eth2 ─────► [AP n°1 — 192.168.88.2]  📡 Wima Zone 2G/5G
   ├── eth3 ─────► [AP n°2 — 192.168.88.3]  📡 Wima Zone 2G/5G
   └── eth4 ─────► [AP n°3 — 192.168.88.4]  📡 Wima Zone 2G/5G
```

Les clients connectés à n'importe quel AP reçoivent une IP du DHCP central, sont capturés par le hotspot du routeur principal, et redirigés vers le portail captif.

## <Icon name="Wrench" color="warning" /> Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| SSID invisible | `country` mal configurée bloquant le canal | Tester `country="South Africa"` ou `"Madagascar"` |
| Client connecté mais pas d'IP | DHCP du routeur principal n'atteint pas l'AP | Vérifier que `sfp1`/`ether1` de l'AP est bien dans le bridge, et que le câble va sur un port LAN du routeur principal (pas WAN) |
| Pas de redirection portail captif | Hotspot du routeur principal pas activé sur le bridge | Côté routeur principal : `/ip/hotspot/print` et vérifier interface = bridge LAN |
| AP injoignable après config | IP management mal configurée | Reset usine (`/system/reset-configuration`) + recommencer |
| Boucle réseau / déconnexions | RSTP pas actif | `protocol-mode=rstp` sur le bridge (vérifier `/interface/bridge/print`) |
| Wi-Fi 6 (ax) pas dispo sur certains clients | Mode forcé en `ac` | `channel.band=5ghz-ax` (au lieu de `5ghz-ac`) — vérifier compat client |

## <Icon name="Database" color="primary" /> Backup config AP

```routeros
/export file=ap-config-2026-05-14
```

Le fichier `ap-config-2026-05-14.rsc` apparaît dans `/file/print` — tu peux le download par Winbox / SFTP. Pour restaurer : `/import file-name=ap-config-2026-05-14.rsc`.
