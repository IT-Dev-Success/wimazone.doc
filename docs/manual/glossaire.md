---
title: Glossaire
description: Définitions des termes techniques utilisés dans Wima Zone Billing
---

# Glossaire

Les termes techniques que vous croiserez dans la doc, les tutoriels et l'interface.

## <Icon name="Router" color="warning" /> Matériel & réseau

### MikroTik {#mikrotik}
Fabricant letton de routeurs réseau. Wima Zone Billing cible les modèles **hAP ax2 / ax3** (RouterOS v7, ARM 64 bits) capables d'exécuter des containers Docker directement.

### RouterOS {#routeros}
Système d'exploitation propriétaire MikroTik. La **version 7.10+** est requise pour le mode container utilisé par Wima Zone.

### Container {#container}
Environnement isolé contenant l'application (Laravel + MariaDB + Nginx). Sur MikroTik, le container Wima Cafe tourne directement sur le routeur via l'interface VETH, sans VM.

### VETH {#veth}
Virtual Ethernet — interface réseau virtuelle reliant le container au bridge `dockers` du routeur. Dans Wima Zone, `veth-billing` a l'IP `172.17.0.2`.

### Bridge {#bridge}
Commutateur logique MikroTik. Le bridge `dockers` relie les interfaces virtuelles (VETH) des containers au réseau du routeur.

### NAT {#nat}
Network Address Translation — règle firewall qui traduit les adresses IP privées (172.17.0.0/24) vers l'IP publique du routeur pour l'accès Internet sortant.

## <Icon name="Wifi" color="info" /> Hotspot & accès

### Hotspot {#hotspot}
Service MikroTik qui intercepte le trafic d'un client Wi-Fi non authentifié et affiche un **portail captif** demandant un code voucher ou un login.

### Portail captif {#portail-captif}
Page web présentée automatiquement aux clients Wi-Fi avant qu'ils n'aient accès à Internet. Sur Wima Zone : `http://wima-zone.wifi/login`.

### Walled Garden {#walled-garden}
Liste d'adresses / domaines autorisés **sans authentification** : MVola, SMS Befiana, Tawk.to, domaine du portail. Indispensable pour que le client puisse payer avant d'être connecté.

### IP Binding {#ip-binding}
Association persistante d'une adresse IP à un profil MikroTik (`blocked`, `bypassed`, `regular`). Utilisé pour bloquer/débloquer un poste cybercafé.

### SSID {#ssid}
Nom du réseau Wi-Fi visible par les clients (ex. `Wima Zone-Hotspot`).

## <Icon name="Receipt" color="success" /> Facturation

### Voucher (Ticket) {#voucher}
Code à usage unique (8 à 12 caractères) vendu au client. Une fois activé, il ouvre une session limitée en durée et/ou en volume.

### Forfait {#forfait}
Offre tarifaire configurable : durée, volume, bande passante, prix. Chaque forfait correspond à un profil bandwidth MikroTik.

### Session {#session}
Connexion Wi-Fi active d'un client. Contient : IP, MAC, début, forfait, volume consommé. Visible en temps réel dans **Sessions Actives**.

### MVola {#mvola}
Service de paiement mobile money de Telma Madagascar. Wima Zone intègre les webhooks pour encaisser les paiements voucher.

### Befiana {#befiana}
Passerelle SMS malgache utilisée pour les notifications aux clients (activation voucher, expiration).

## <Icon name="Database" color="primary" /> Stack technique

### MariaDB {#mariadb}
Base de données relationnelle (fork de MySQL). Embarquée dans le container Wima Zone, persistée sur clé USB ext4 (`/var/lib/mysql`).

### Reverb {#reverb}
Serveur WebSocket officiel de Laravel, utilisé pour pousser en temps réel les mises à jour de sessions au dashboard admin et au client Wima Cafe desktop.

### Queue worker {#queue-worker}
Processus d'arrière-plan qui traite les tâches asynchrones (envoi SMS, synchro hotspot, relances). Activé via `LARAVEL_ENABLE_QUEUE_WORKER=true`.

### Scheduler {#scheduler}
Processus cron-like qui exécute les tâches récurrentes (expirations, rapports, nettoyages). Activé via `LARAVEL_ENABLE_SCHEDULER=true`.
