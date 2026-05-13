---
title: Fidirana voalohany sy fametrahana
description: Fantaro ny Wima Zone Billing ary apetraho ao anatin'ny 10 minitra
---

# Fidirana voalohany sy fametrahana

Ity tutoriel ity dia mitari-dia anao amin'ny **fidirana voalohany** amin'ny Wima Zone Billing : login, fiarovana kaonty, branding ary kaonty admin.

## <Icon name="LogIn" color="info" /> 1) Fidirana voalohany

Sokafy ny URL portail admin :

```
http://172.17.0.2
```

(na ny port naverina, oh. `http://192.168.88.1:8080`).

**Porofo voalohany** :

```text
Email    : admin@wimazone.local
Password : ChangeMe!2026
```

## <Icon name="Lock" color="danger" /> 2) Ambeno ny kaonty Super Admin

**Alohan'ny zava-drehetra** :

1. Kitio ny avatar → **Profil**
2. Onglet **Fiarovana**
3. Ovao ny tenimiafina (12 litera farafahakeliny)
4. Ovay ny mailaka fanamarinana
5. Alefaso ny 2FA raha misy

## <Icon name="Image" color="warning" /> 3) Apetraho ny branding

Menu → **Paramètres → Général**

| Saha | Ohatra |
|---|---|
| **Anaran'ny orinasa** | `WiFi Tana` |
| **Logo** | PNG/SVG (soso-kevitra 256×256 px) |
| **Favicon** | 32×32 px |
| **Loko lehibe** | `#0ea5e9` |
| **Vola** | `Ar` (Ariary) |
| **Faritra ora** | `Indian/Antananarivo` |
| **Fiteny mahazatra** | `Malagasy` na `Français` |

Kitio **Tehirizo** — miasa avy hatrany amin'ny portail captif sy ny tikety.

## <Icon name="Users" color="info" /> 4) Mamorona kaonty admin

Menu → **Mpampiasa & Rôle → Mpampiasa**

1. Kitio **+ Mpampiasa vaovao**
2. Fenoy : anarana, mailaka, tenimiafina vonjimaika
3. Fidio rôle :
   - **Super Admin** : fidirana feno (fehezo)
   - **Admin** : fitantanana andavanandro
   - **Caissier** : varotra tikety + dashboard
   - **Support** : vakiana ihany + chat

::: tip Fitsipika fari-pahefana kely indrindra
Mamorona kaonty Super Admin backup + kaonty Admin ho an'ny operateur-nao. Tsy ampiasaina afa-tsy rehefa ilaina ny Super Admin.
:::

## <Icon name="Globe" color="primary" /> 5) Apetraho ny URL portail captif

Menu → **Paramètres → Général → Portail**

| Saha | Famaritana |
|---|---|
| **URL portail** | `http://wimazone.wifi` (na domain-nao) |
| **Pejy fidirana** | Template HTML |
| **Fallback redirect** | URL vonjimaika |

Ampio amin'ny **Walled Garden** MikroTik ity URL ity.

## <Icon name="Compass" color="success" /> 6) Fitetezana ny tableau de bord

Miverena amin'ny **Dashboard**. Hitanao :

- **Barre statut APIs** ambony (MVola, SMS, SMTP)
- **Karatra 5 KPI** : Vola androany, Vola ity volana ity, Mavitrika/Lany, Mpanjifa, Tikety
- **Graphika** : Mpanjifa voarakitra & Varotra isam-bolana
- **Stock tikety** isaky ny forfait

::: tip Tutoriel tafiditra
Ny badge "Tutoriel disponible dans la barre de droite" dia mampiseho torolalana tafiditra. Kitio **Ouvrir le tutoriel** hahalala ny interface.
:::

## <Icon name="CheckCircle2" color="success" /> 7) Lisitra aorian'ny fametrahana

- [ ] Tenimiafina Super Admin novaina
- [ ] Branding (logo, loko, vola) voapetraka
- [ ] Kaonty Admin iray farafahakeliny voaforona
- [ ] URL portail captif voatondro
- [ ] Faritra ora sy fiteny marina

## Dingana manaraka

→ [Apetraho ny API ivelany](/mg/docs/manual/tutoriels/apis-externes) (MVola, SMS, SMTP)
