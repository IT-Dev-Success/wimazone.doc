---
title: Client Logiciel Wima Cafe
---

# Client Logiciel Wima Cafe

Ny client Wima Cafe dia application Flutter desktop apetraka amin'ny poste tsirairay. Izy dia mitantana ny lock screen, manaraka ny session ary mifandray amin'ny serveur billing.

## Fametrahana

### Fepetra takiana

- Flutter SDK 3.x+
- Dart SDK
- Windows 10+ na Linux na macOS (fanohanana desktop)

### Fanamboarana

```bash
cd cafe-client
flutter pub get
flutter build windows --release    # na linux / macos
```

Ny executable vokarina dia ao amin'ny `build/windows/runner/Release/`.

## Configuration

Amin'ny fanokafana voalohany, ny ecran configuration dia mangataka :

| Saha | Famaritana | Ohatra |
|---|---|---|
| URL serveur Billing | URL HTTP Laravel | `http://172.17.0.2:80` |
| URL WebSocket | URL temps reel | `ws://172.17.0.2:80/ws/cafe-client` |
| Anaran'ny poste | ID tsy miova (mifanaraka amin'ny dashboard) | `PC-01` |
| Code d'activation | Token `XXX-XXX-XXX-XXX` (12 isa) | `123-456-789-012` |
| Anaran'ny orinasa | Aseho amin'ny lock screen | `Wima Cafe` |

### Code d'activation

Ny code d'activation dia vokarina ho azy rehefa mamorona poste ao amin'ny dashboard admin. Endrika **12 isa sokajiana isan-telo** : `XXX-XXX-XXX-XXX`.

Ny fampidirana dia amin'ny saha segmenté (4 boaty isan-telo isa) :

- Mandroso ho azy amin'ny vondrona manaraka
- Miverina ho azy amin'ny Backspace
- Mandray copy-paste ny code feno
- Fanamarinana : isa ihany no raisina

## Fiasa

### Lock screen

Raha tsy misy session mandeha, ny poste dia mampiseho lock screen feno misy :

- Logo sy anaran'ny orinasa
- Anaran'ny poste
- IP sy MAC hita
- Indicateur connexion amin'ny serveur (maitso/mena/volomboasary)
- Bouton "Manomboka session" (raha alefa ny libre-service)

### Session mandeha

Mandritra ny session, miafina ny lock screen ary afaka mampiasa ny bureau ny mpampiasa. Ny client dia mbola :

- Mampiseho ny fotoana sisa amin'ny ambadika
- Mandefa heartbeat isaky ny 30s
- Mandray baiko (hidio, ajanona, alefa indray)

### Hadisoana authentification

Raha diso ny code d'activation, ny client dia :

- Mampiseho voamarina volomboasary misy hafatra hadisoana
- Manajanona ny fiverenana ho azy
- Mampiseho bouton hanokafana settings mba hanitsiana ny code

## Fifandraisana API

Ny client dia mampiasa API REST miaraka amin'ny Bearer token :

- **Register** : firaketana poste amin'ny fanombohana (maka IP, MAC, hostname, OS)
- **Heartbeat** : famantarana fiainana, mamerina etat session
- **Poll** : fangatahana etat (raha tsy azo ny WebSocket)
- **Start session** : fanombohana libre-service
- **End session** : fanaperana session avy amin'ny client

Ny fangatahana rehetra dia manana timeout 15 segondra.

## Paramètres

Ny paramètres dia azo idirana amin'ny icone engrenage ambany havia ny lock screen. Afaka ovaina ny configuration tsy mila mamerina apetraka ny application.
