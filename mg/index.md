---
layout: home

hero:
  name: "Wima Zone Billing"
  text: "Faktiora Hotspot amin'ny container MikroTik"
  tagline: Fametrahana tsotra amin'ny RouterOS v7 — voucher, mpanjifa, fandoavana ary sync routeur, rehetra avy amin'ny MikroTik-nao.
  image:
    light: /logo-m.svg
    dark: /logo-m-dark.svg
    alt: Wima Zone Logo
  actions:
    - theme: brand
      text: Apetraho amin'ny MikroTik
      link: /mg/docs/guide/mikrotik
    - theme: alt
      text: Fepetra takiana
      link: /mg/docs/guide/installation

features:
  - title: Container RouterOS v7
    details: Sary ARM/ARM64 apetraka mivantana amin'ny routeur. Tsy mila serveur hafa, tsy mila VPS.
  - title: MikroTik RouterOS API v7
    details: Fampifandraisana hotspot, IP bindings, walled garden ary session mandeha avy hatrany amin'ny API an'ny routeur.
  - title: MariaDB ao anaty container
    details: MariaDB tafiditra ao amin'ny container, data maharitra amin'ny USB ext4. Dump sy famerenana amin'ny mysqldump.
  - title: Walled Garden vonona
    details: Fitsipika walled garden omena ho an'ny MVola, Befiana SMS, Tawk.to ary portail captive.
---

## Fijerena ny tableau de bord

![Tableau de bord Wima Zone Billing](/screenshots/dashboard.png)

<p style="text-align: center; opacity: 0.7; margin-top: -1rem;">
  Fijerena amin'ny fotoana tena izy : fidiram-bola, mpanjifa mavitrika, statut API (MVola, SMS, SMTP), stock tikety sy graphika varotra isam-bolana.
</p>

## Nahoana Wima Zone amin'ny MikroTik ?

Wima Zone Billing dia **rafitra faktiora hotspot** natao mba handeha **mivantana amin'ny routeur MikroTik-nao** amin'ny mode container. Tsy mila serveur hofaina, tsy mila Docker hafa — rehetra eo amin'ny routeur.

### Toetra manan-danja

- <Icon name="Router" color="warning" /> **Fametrahana amin'ny routeur** : sary container amin'ny Docker Hub, alaina mivantana amin'ny RouterOS v7.
- <Icon name="Database" color="info" /> **MariaDB ao anaty container** : mandeha ao anatin'ny container, data maharitra amin'ny USB ext4, tsy mila serveur DB ivelany.
- <Icon name="Users" color="info" /> **Fikarakarana mpanjifa feno** : fidirana hotspot, voucher, tableau de bord, fanohanana.
- <Icon name="Receipt" color="success" /> **Votoaty billing** : drafitra, faktiora, fandoavana MVola, fampahatsiahivana.
- <Icon name="Wrench" color="primary" /> **Fitaovana ops** : scheduler, queue, diagnostika API MikroTik, fanavaozana container amin'ny baiko iray.

::: tip Fitaovana soso-kevitra
Ny routeur **hAP ax3** (ARM 64, 1 GB RAM) no tsara indrindra. Azo vidiana ao amin'ny [wimazone.mg/boutique](https://wimazone.mg/boutique).
:::
