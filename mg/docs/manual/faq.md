---
title: Fanontaniana matetika (FAQ)
description: Ireo fanontaniana matetika — fametrahana, faktiora, fampiasana, famahana olana
---

# Fanontaniana matetika

Fanontaniana mahazatra apetraky ny admin sy ny mpanjifa Wima Zone Billing.

## <Icon name="Package" color="warning" /> Fametrahana & container

<details>
<summary><strong>Inona no routeur MikroTik tokony ho vidiana ?</strong></summary>

Ho an'ny fametrahana tsara, ampiasao ny **hAP ax3** (ARM 64 bits, 1 GB RAM). Ny modely 32 bits dia mandeha fa voafetra kokoa. Jereo ny [Fepetra takiana MikroTik](/mg/docs/guide/installation#requirements).
</details>

<details>
<summary><strong>Ahoana no fanafahana ny mode container ?</strong></summary>

Rehefa avy amin'ny orinasa, ny RouterOS dia amin'ny mode `home` izay manakana ny container. Tsy maintsy ovana ho `advanced` :

```routeros
/system/device-mode/update mode=advanced
```

Avy eo hanindry ny **bouton reset** an'ny routeur ao anatin'ny 60 segondra.
</details>

<details>
<summary><strong>Tsy mandeha ny USB FAT32-ko — nahoana ?</strong></summary>

Ny mount container sy MariaDB dia mitaky system fichier **ext4**. Tsy tohanana ny FAT32 sy NTFS. Avereno voatsipika amin'ny Linux `mkfs.ext4`.
</details>

<details>
<summary><strong>Very ny data aorian'ny famoronana container indray — inona no atao ?</strong></summary>

Midika izany fa tsy maharitra ny mount `/var/lib/mysql`. Hamarino `/container/mounts/print` fa ny `src=usb1/billing-data/mysql` dia **ivelan'ny** `root-dir`. Alefaso `MARIADB_REQUIRE_MOUNT=true` mba hanakanana ny container hanomboka raha diso ny mount.
</details>

<details>
<summary><strong>Ahoana no fanavaozana ho amin'ny version farany ?</strong></summary>

Ajanona sy fafao ny container (ny data USB tsy voakasika), avy eo averina forona — ny sary vaovao dia alaina ho azy. Jereo [Fanavaozana](/mg/docs/guide/mikrotik#mise-a-jour). **Manaova dump MariaDB alohan'ny rehetra.**
</details>

## <Icon name="Receipt" color="success" /> Faktiora & fandoavana

<details>
<summary><strong>Ahoana no fametrahana MVola ?</strong></summary>

Mankanesa amin'ny **Paramètres → APIs → MVola**, fenoy Consumer Key, Consumer Secret, Partner Name ary URL callback. Ovay amin'ny **Production** aorian'ny fitsapana.
</details>

<details>
<summary><strong>Tsy mandeha ny SMS. Nahoana ?</strong></summary>

Hamarino (1) ny clé API Befiana, (2) ny Sender ID 11 litera max, (3) misy crédit ny kaonty Befiana. Andramo SMS amin'ny **Paramètres → APIs → SMS**.
</details>

<details>
<summary><strong>Azo alefa ho azy ny fampahatsiahivana ?</strong></summary>

Eny. Ao amin'ny **Paramètres → Faktiora → Fampahatsiahivana**, tsindrio ny palier (J+1, J+3, J+7) sy canal (SMS, mail). Ny scheduler no mandefa.
</details>

<details>
<summary><strong>Ahoana no hakana faktiora PDF ?</strong></summary>

Ao amin'ny **Faktiora mpanjifa**, kitio ilay faktiora → **Télécharger PDF**. Afaka alefa amin'ny mail mivantana ihany koa.
</details>

## <Icon name="Users" color="info" /> Fampiasana andavanandro

<details>
<summary><strong>Ahoana no famoronana voucher maro ?</strong></summary>

**Gestion des clients → Tickets → + Vokareo voucher**. Fidio ny forfait, isa, halaven'ny code ary endrika.
</details>

<details>
<summary><strong>Ahoana no fanaisorana mpanjifa mandeha ?</strong></summary>

**Gestion des clients → Sessions Mavitrika**, tsongay ny andalana dia kitio **Manisotra**. Alefa mivantana amin'ny routeur ny baiko.
</details>

<details>
<summary><strong>Ahoana no fanontana tikety amin'ny pirinty thermique 58 mm ?</strong></summary>

Ao amin'ny **Paramètres → Templates tikety**, fidio ny template **58mm thermique**. Avy eo ao amin'ny Tickets, tsongay ary kitio **Pirinty**. Mifanaraka amin'ny pirinty USB/Bluetooth Android POS.
</details>

<details>
<summary><strong>Azo alefa amin'ny Excel ny tatitra ?</strong></summary>

Eny : sokafy ny tatitra, kitio **Exporter CSV**. Mifanaraka amin'ny Excel / LibreOffice / Google Sheets.
</details>

## <Icon name="AlertCircle" color="danger" /> Famahana olana mpanjifa

<details>
<summary><strong>Tsy misokatra ny portail captif amin'ny mpanjifa.</strong></summary>

Jereo:
1. Ny Walled Garden mahazo alalana amin'ny domain portail
2. Ny DNS routeur mikasika ny container
3. Ny container mandeha (`/container/print` → `running`)
4. Ny IP binding mpanjifa tsy `blocked`
</details>

<details>
<summary><strong>"Efa nampiasaina ny code" nefa tsy mbola nampiasa ny mpanjifa.</strong></summary>

Antony roa : (1) fitaovana hafa an'ny mpanjifa efa nampiasa, (2) bug fampisehoana. Esory ilay voucher ao amin'ny **Tickets**, mamorona vaovao ary omena ny mpanjifa.
</details>

<details>
<summary><strong>Voaisotra isaky ny 2 minitra ny mpanjifa.</strong></summary>

Matetika dia ny **bandwidth profile** MikroTik no tsy voapetraka tsara. Avereno sync avy amin'ny **Routeurs → [anarana] → Sync izao**. Raha mbola misy ny olana, ahena `HOTSPOT_STATUS_TIMEOUT_SECONDS=1`.
</details>

<details>
<summary><strong>Miadana be ny fifandraisana. Inona no jerena ?</strong></summary>

1. CPU routeur (Winbox → Tools → Profile) — raha >80%, maro loatra ny mpanjifa.
2. `HOTSPOT_STATUS_CACHE_SECONDS` : ampio ho `5` mba hahena ny appel API.
3. Bandwidth forfait : mety voafetra ny mpanjifa.
4. Walled Garden : maro loatra ny entry dia miadana ny fanefena.
</details>

## <Icon name="Helmet" color="primary" /> Fanampiana fanampiny

- [Rakibolana](/mg/docs/manual/glossaire) — famaritana ara-teknika
- [Tutoriel](/mg/docs/manual/tutoriels/) — dingana tsirairay
- [Famahana olana MikroTik](/mg/docs/guide/mikrotik#depannage) — olana fametrahana
- [GitHub Issues](https://github.com/ITDev-Success/billing/issues) — milaza bug
