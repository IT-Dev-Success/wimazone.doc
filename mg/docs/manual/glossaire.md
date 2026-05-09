---
title: Rakibolana
description: Famaritana ny voambolana ara-teknika ampiasaina ao amin'ny Wima Zone Billing
---

# Rakibolana

Ny voambolana ara-teknika ho hitanao ao amin'ny torolàlana sy ny interface.

## <Icon name="Router" color="warning" /> Fitaovana & tambajotra

### MikroTik {#mikrotik}
Mpamorona routeur Letoney. Wima Zone Billing dia mikasika ny modely **hAP ax3** (RouterOS v7, ARM 64 bits) afaka mandefa container Docker mivantana.

### RouterOS {#routeros}
System OS an'ny MikroTik. **V7.10+** no takiana ho an'ny mode container.

### Container {#container}
Tontolo misaraka mitondra ny application (Laravel + MariaDB + Nginx). Amin'ny MikroTik, ny container Wima Cafe dia mandeha mivantana amin'ny routeur.

### VETH {#veth}
Virtual Ethernet — interface tambajotra virtoaly mampifandray ny container amin'ny bridge `dockers`. Ao amin'ny Wima Zone, `veth-billing` no IP `172.17.0.2`.

### Bridge {#bridge}
Switch logique MikroTik. Ny bridge `dockers` no mampifandray ny VETH amin'ny tambajotra routeur.

### NAT {#nat}
Network Address Translation — lalàna firewall mamadika IP anaty (172.17.0.0/24) ho IP ivelany.

## <Icon name="Wifi" color="info" /> Hotspot & fidirana

### Hotspot {#hotspot}
Serivisy MikroTik mahasakana ny Wi-Fi tsy voamarina ary mampiseho **portail captif** mangataka code voucher.

### Portail captif {#portail-captif}
Pejy web mipoitra ho azy amin'ny mpanjifa Wi-Fi alohan'ny fidirana amin'ny Internet. Amin'ny Wima Zone : `http://wima-zone.wifi/login`.

### Walled Garden {#walled-garden}
Lisitra domain nahazoana alalana **tsy misy fanamarinana** : MVola, SMS Befiana, Tawk.to, domain portail. Ilaina mba afaka mandoa vola ny mpanjifa aloha.

### IP Binding {#ip-binding}
Fifandraisana IP amin'ny profil MikroTik (`blocked`, `bypassed`, `regular`). Ampiasaina hanakanana poste cybercafé.

### SSID {#ssid}
Anaran'ny tambajotra Wi-Fi (oh. `Wima Zone-Hotspot`).

## <Icon name="Receipt" color="success" /> Faktiora

### Voucher (Tikety) {#voucher}
Code ampiasaina indray mandeha (8 ka 12 litera) amidy amin'ny mpanjifa. Rehefa alefa, misokatra session voafetra amin'ny ora na habe.

### Forfait {#forfait}
Drafitra vidiny azo ovaina : faharetana, habe, bandwidth, vidiny. Ny forfait tsirairay mifanaraka amin'ny profil bandwidth MikroTik.

### Session {#session}
Fifandraisana Wi-Fi mavitrika. Misy : IP, MAC, fanombohana, forfait, habe nampiasaina.

### MVola {#mvola}
Serivisy mobile money Telma Madagasikara. Wima Zone dia mampiditra ny webhooks MVola hanangonana vola voucher.

### Befiana {#befiana}
Passerelle SMS malagasy ampiasaina amin'ny fampandrenesana (fanombohana voucher, fahataperana).

## <Icon name="Database" color="primary" /> Rafitra teknika

### MariaDB {#mariadb}
Database (fork MySQL). Tafiditra ao anaty container Wima Zone, maharitra amin'ny USB ext4 (`/var/lib/mysql`).

### Reverb {#reverb}
Serveur WebSocket ofisialy an'ny Laravel, ampiasaina handefasana fanavaozana amin'ny fotoana tena izy.

### Queue worker {#queue-worker}
Processus miasa ambadika manao ny asa asynchrone (SMS, sync hotspot). Alefa amin'ny `LARAVEL_ENABLE_QUEUE_WORKER=true`.

### Scheduler {#scheduler}
Processus cron-like miasa amin'ny asa miverimberina (fahataperana, tatitra, fanadiovana). Alefa amin'ny `LARAVEL_ENABLE_SCHEDULER=true`.
