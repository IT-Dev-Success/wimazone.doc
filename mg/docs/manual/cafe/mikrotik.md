---
title: Fametrahana MikroTik ho an'ny Cafe
---

# Fametrahana MikroTik ho an'ny Cyber Cafe

Ny module Cyber Cafe dia mifehy ny fidirana amin'ny Internet amin'ny MikroTik. Ity pejy ity dia mamaritra ny configuration ilaina amin'ny routeur.

## Foto-kevitra

Misy rafitra roa mifanampy :

1. **Hotspot IP Binding** : ny poste tsirairay manana binding (`type=blocked` na `type=bypassed`).
2. **Firewall Address List** (`cafe-blocked`) : lisitra voasakana amin'ny firewall.

Izany dia miantoka fa na dia tsy mandeha aza ny hotspot, dia mbola fehezin'ny firewall ny poste.

## Fametrahana voalohany (indray mandeha)

Alefa ity baiko ity amin'ny terminal MikroTik :

```routeros
/ip/firewall/filter/add chain=forward src-address-list=cafe-blocked action=drop \
  comment="Wima Zone Cafe - manakana poste tsy misy session"
```

::: warning Manan-danja
Apetraho ity lalàna ity **alohan'ny** lalàna fandraisana ankapobeny ao amin'ny chain `forward`.
:::

::: tip Ho azy
Azonao alefa na esorina avy amin'ny dashboard `/cafe` amin'ny bouton **Apetraho ny firewall**.
:::

## Fitantanana ho azy

Aorian'ny fametrahana voalohany, ho azy daholo ny rehetra :

| Hetsika | Asa MikroTik |
|---|---|
| Mamorona poste | IP Binding `type=blocked` + IP ao `cafe-blocked` |
| Manomboka session | IP Binding `type=bypassed` + IP esorina amin'ny `cafe-blocked` |
| Session tapitra | IP Binding `type=blocked` + IP averina ao `cafe-blocked` |
| Manala poste | IP Binding esorina + IP esorina amin'ny `cafe-blocked` |

## Synchronisation

Ny bouton **Sync MikroTik** ao amin'ny dashboard `/cafe` dia mandalo ny poste rehetra ary :

- Manakana ireo tsy misy session mandeha
- Manafaka ireo manana session

Ampiasao rehefa averina alefa ny serveur na raha misy desync.

## Fanamarinana

```routeros
# Jereo ny IP binding cafe
/ip/hotspot/ip-binding/print where comment~"Wima Zone Cafe"

# Jereo ny lisitra poste voasakana
/ip/firewall/address-list/print where list="cafe-blocked"

# Jereo ny lalàna firewall
/ip/firewall/filter/print where comment~"Wima Zone Cafe"
```

## Fisafidianana routeur

Rehefa mamorona poste, azonao fidina ny routeur manokana. Raha tsy misy voasafidy, ny routeur ankapobeny (voalohany mavitrika) no hampiasaina ho azy.

## Famahana olana

| Olana | Antony | Vahaolana |
|---|---|---|
| Poste manana Internet nefa tsy misy session | Tsy misy lalàna firewall | Ampio `cafe-blocked` |
| Poste voasakana nefa misy session | Desync | Kitio **Sync MikroTik** |
| Hadisoana MikroTik amin'ny log | Routeur tsy hita | Jereo connexion API |
| IP Binding tsy hita | Poste namorina tsy misy IP | Ampio ny IP an'ny poste |
