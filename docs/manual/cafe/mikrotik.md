---
title: Configuration MikroTik pour le Cafe
---

# Configuration MikroTik pour le Cyber Cafe

Le module Cyber Cafe controle l'acces internet des postes via MikroTik. Cette page decrit la configuration necessaire sur le routeur.

## Principe

Le systeme utilise deux mecanismes complementaires :

1. **Hotspot IP Binding** : chaque poste a un binding (`type=blocked` ou `type=bypassed`).
2. **Firewall Address List** (`cafe-blocked`) : une liste d'adresses bloquees par une regle firewall.

Le double mecanisme assure que meme si le hotspot est desactive, les postes restent controles par le firewall.

## Configuration initiale (une seule fois)

Executez cette commande dans le terminal MikroTik pour creer la regle de blocage :

```routeros
/ip/firewall/filter/add chain=forward src-address-list=cafe-blocked action=drop \
  comment="WimaZone Cafe - bloquer postes sans session"
```

::: warning Important
Placez cette regle **avant** les regles d'acceptation generales dans la chaine `forward`. Sinon, le trafic sera accepte avant d'etre filtre.
:::

::: tip Automatique
Vous pouvez injecter ou supprimer cette regle directement depuis le dashboard `/cafe` avec le bouton **Configurer le firewall**.
:::

## Gestion automatique

Apres la configuration initiale, tout est automatique :

| Evenement | Action MikroTik |
|---|---|
| Poste cree | IP Binding `type=blocked` + IP ajoutee a `cafe-blocked` |
| Session demarre | IP Binding `type=bypassed` + IP retiree de `cafe-blocked` |
| Session termine | IP Binding `type=blocked` + IP re-ajoutee a `cafe-blocked` |
| Poste supprime | IP Binding supprime + IP retiree de `cafe-blocked` |

## Synchronisation

Le bouton **Sync MikroTik** dans le dashboard `/cafe` parcourt tous les postes et :

- Bloque ceux sans session active
- Bypass ceux avec une session en cours

Utilisez-le apres un redemarrage du serveur ou en cas de desynchronisation.

## Verification

Pour verifier l'etat actuel sur MikroTik :

```routeros
# Voir les IP bindings cafe
/ip/hotspot/ip-binding/print where comment~"WimaZone Cafe"

# Voir la liste des postes bloques
/ip/firewall/address-list/print where list="cafe-blocked"

# Voir la regle firewall
/ip/firewall/filter/print where comment~"WimaZone Cafe"
```

## Choix du routeur

Lors de la creation d'un poste, vous pouvez choisir un routeur specifique. Si aucun n'est selectionne, le routeur principal (premier routeur actif) est utilise automatiquement.

## Depannage

| Probleme | Cause probable | Solution |
|---|---|---|
| Poste a internet sans session | Regle firewall manquante | Ajouter la regle `cafe-blocked` |
| Poste bloque malgre session active | Desynchronisation | Cliquer sur **Sync MikroTik** |
| Erreur MikroTik dans les logs | Routeur injoignable | Verifier connexion API dans `/routers` |
| IP Binding absent | Poste cree sans IP | Ajouter l'adresse IP du poste |
