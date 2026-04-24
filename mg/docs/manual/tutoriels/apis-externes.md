---
title: Apetraho ny API ivelany
description: MVola, SMS Befiana, SMTP
---

# Apetraho ny API ivelany

Ny Wima Zone dia mifandray amin'ny serivisy ivelany maro. Ireto ny fomba fametrahana azy.

## <Icon name="Smartphone" color="primary" /> MVola Mobile Money

1. Menu → **Paramètres → APIs → MVola**
2. Fenoy :
   - **Consumer Key** (omen'ny MVola)
   - **Consumer Secret**
   - **Partner Name**
   - **Callback URL** : `https://portail-anao.example.com/webhooks/mvola`
3. Mode **Sandbox** ho an'ny fitsapana, **Production** aorian'ny fanamarinana
4. Kitio **Tsapao ny fifandraisana**

::: tip Laharana MVola
Ovay amin'ny **Paramètres → Général** ny laharana MVola mpivarotra hiseho amin'ny mpanjifa.
:::

## <Icon name="MessageSquare" color="warning" /> SMS Befiana

1. Menu → **Paramètres → APIs → SMS (Befiana)**
2. Fenoy :
   - **API Key Befiana**
   - **Sender ID** (oh. `WimaZone`, 11 litera max)
3. Alefaso ny gabarit :
   - **Fanombohana voucher**
   - **Fahataperana akaiky** (X minitra alohan'ny farany)
   - **Faktiora nalefa**
4. Tsapao amin'ny laharana fitsapana

## <Icon name="Mail" color="info" /> SMTP (mailaka)

1. Menu → **Paramètres → SMTP**
2. Fenoy :

| Saha | Ohatra Gmail |
|---|---|
| **Host** | `smtp.gmail.com` |
| **Port** | `587` |
| **Fiarovana** | `TLS` |
| **Mpampiasa** | `kaonty-anao@gmail.com` |
| **Tenimiafina** | tenimiafina app Gmail |
| **From** | `billing@wimazone.mg` |

3. Kitio **Mandefa mailaka fitsapana**

::: warning Production
Ho an'ny mailaka marobe, ampiasao serivisy manokana (Mailgun, SendGrid, AWS SES).
:::

## <Icon name="MessageCircle" color="success" /> Tawk.to (chat)

1. Menu → **Paramètres → Général → Chat support**
2. Apetraho ny ID Tawk.to
3. Alefa — hiseho amin'ny portail captif ny widget

## <Icon name="CheckCircle" color="primary" /> Jereo ny statut

Amin'ny **Dashboard**, ny barre **Statut des APIs** dia mampiseho :

- `MVola configuré` ✓ volomaitso
- `SMS incomplet` ⚠ volomboasary
- `SMTP incomplet` ⚠ volomboasary

## Dingana manaraka

→ [Mamorona forfait sy mamokatra voucher](/mg/docs/manual/tutoriels/forfait-voucher)
