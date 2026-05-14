---
title: Questions fréquentes (FAQ)
description: Les questions qui reviennent le plus souvent — installation, facturation, utilisation, dépannage
---

# Questions fréquentes

Une sélection des questions que reçoivent le plus les admins et les clients de Wima Zone Billing.

## <Icon name="Package" color="warning" /> Installation & container

<details>
<summary><strong>Quel routeur MikroTik dois-je acheter ?</strong></summary>

Pour un déploiement confortable, utilisez le **hAP ax3** (ARM 64 bits, 1 GB RAM). Les modèles 32 bits (hAP ac², L009) fonctionnent mais sont plus limités sur la taille d'image container. Voir la table complète sur [Prérequis MikroTik](/docs/guide/installation#requirements).
</details>

<details>
<summary><strong>Comment activer le mode container sur mon routeur ?</strong></summary>

Par défaut, RouterOS sort d'usine en mode `home` qui bloque la fonctionnalité container. Il faut basculer en mode `advanced` :

```routeros
/system/device-mode/update mode=advanced
```

Puis confirmer en **appuyant physiquement sur le bouton reset** du routeur dans les 60 secondes.
</details>

<details>
<summary><strong>Ma clé USB en FAT32 ne marche pas — pourquoi ?</strong></summary>

Les mounts container et MariaDB exigent un système de fichiers **ext4**. FAT32 et NTFS ne sont pas supportés. Reformatez la clé depuis un Linux avec `mkfs.ext4`.
</details>

<details>
<summary><strong>Mes données sont perdues après avoir recréé le container — que faire ?</strong></summary>

Cause la plus fréquente : mount mal configuré. L'image attend `src=usb1/billing-data dst=/data` (le datadir MariaDB est `/data/mysql` **à l'intérieur** du mount `/data`). Si `dst=/var/lib/mysql`, MariaDB ignore le mount et écrit sur l'overlay du container — wipé à chaque pull. Vérifiez avec `/container/mounts/print` que `dst=/data` et `src` est **en dehors** de `root-dir`. Activez `MARIADB_REQUIRE_MOUNT=true` pour bloquer tout démarrage avec un mount invalide.
</details>

<details>
<summary><strong>Comment mettre à jour vers la dernière version ?</strong></summary>

Arrêtez et supprimez le container (les données USB sont conservées), puis recréez-le — la nouvelle image est tirée automatiquement. Voir [Mise à jour](/docs/guide/mikrotik#mise-a-jour). **Faites toujours un dump MariaDB avant.**
</details>

## <Icon name="Receipt" color="success" /> Facturation & paiement

<details>
<summary><strong>Comment configurer MVola ?</strong></summary>

Allez dans **Paramètres → APIs → MVola**, renseignez Consumer Key, Consumer Secret, Partner Name et l'URL de callback (`https://votre-portail/webhooks/mvola`). Basculez en **Production** une fois les tests validés. Voir [Configurer les APIs externes](/docs/manual/tutoriels/apis-externes).
</details>

<details>
<summary><strong>Les SMS ne partent pas. Pourquoi ?</strong></summary>

Vérifiez (1) que la clé API Befiana est valide, (2) que le Sender ID fait 11 caractères max, (3) que votre compte Befiana a du crédit. Envoyez un SMS de test depuis **Paramètres → APIs → SMS**.
</details>

<details>
<summary><strong>Peut-on activer les relances automatiques ?</strong></summary>

Oui. Dans **Paramètres → Facturation → Relances**, cochez les paliers (J+1, J+3, J+7) et le canal (SMS, email). Le scheduler s'occupe d'envoyer les rappels.
</details>

<details>
<summary><strong>Comment récupérer une facture PDF ?</strong></summary>

Dans **Factures clients**, cliquez sur la facture → bouton **Télécharger PDF**. Vous pouvez aussi envoyer par email directement depuis la même fiche.
</details>

## <Icon name="Users" color="info" /> Utilisation quotidienne

<details>
<summary><strong>Comment générer un lot de vouchers ?</strong></summary>

**Gestion des clients → Tickets → + Générer des vouchers**. Choisissez le forfait, la quantité, la longueur du code et le format. Voir [Créer un forfait et générer des vouchers](/docs/manual/tutoriels/forfait-voucher).
</details>

<details>
<summary><strong>Comment déconnecter un client en cours de session ?</strong></summary>

**Gestion des clients → Sessions Actives**, sélectionnez la ligne puis cliquez sur **Déconnecter**. La commande est envoyée immédiatement au routeur MikroTik.
</details>

<details>
<summary><strong>Comment imprimer des tickets sur une imprimante thermique 58 mm ?</strong></summary>

Dans **Paramètres → Templates ticket**, choisissez le template **58mm thermique**. Puis dans Tickets, sélectionnez les vouchers et cliquez sur **Imprimer la sélection**. Compatible avec les imprimantes USB/Bluetooth Android POS.
</details>

<details>
<summary><strong>Peut-on exporter les rapports en Excel ?</strong></summary>

Oui : ouvrez un rapport, cliquez sur **Exporter CSV**. Le fichier est compatible Excel / LibreOffice / Google Sheets. Pour un PDF formaté, utilisez **Exporter PDF**.
</details>

## <Icon name="AlertCircle" color="danger" /> Dépannage client

<details>
<summary><strong>Le portail captif ne s'ouvre pas chez le client.</strong></summary>

Vérifiez dans l'ordre :
1. Le Walled Garden autorise bien le domaine du portail (`/ip/hotspot/walled-garden/print`)
2. Le DNS du routeur pointe vers le container (`/ip/dns/print`)
3. Le container est démarré (`/container/print` → `running`)
4. L'IP binding du client n'est pas en `blocked`
</details>

<details>
<summary><strong>"Ce code a déjà été activé" alors que le client ne s'est jamais connecté.</strong></summary>

Deux causes possibles : (1) un appareil secondaire du client l'a déjà utilisé, (2) un bug d'affichage du voucher pré-rempli. Désactivez le voucher dans **Tickets**, générez-en un nouveau et remettez-le au client.
</details>

<details>
<summary><strong>Le client est déconnecté toutes les 2 minutes.</strong></summary>

C'est souvent le **bandwidth profile** MikroTik qui n'est pas correctement appliqué. Resynchronisez depuis **Routeurs → [nom] → Synchroniser maintenant**. Si le problème persiste, baissez `HOTSPOT_STATUS_TIMEOUT_SECONDS` à `1` dans les variables container.
</details>

<details>
<summary><strong>La connexion est très lente. Que vérifier ?</strong></summary>

1. Charge CPU du routeur (Winbox → Tools → Profile) — si >80%, trop de clients ou scheduler trop agressif.
2. `HOTSPOT_STATUS_CACHE_SECONDS` : augmentez à `5` pour réduire les appels API.
3. Bande passante du forfait : le client est peut-être limité à raison.
4. Walled Garden : trop d'entrées alourdissent le filtrage.
</details>

## <Icon name="Helmet" color="primary" /> Plus d'aide

- [Glossaire des termes](/docs/manual/glossaire) — définitions techniques
- [Tutoriels](/docs/manual/tutoriels/) — parcours pas-à-pas
- [Dépannage MikroTik](/docs/guide/mikrotik#depannage) — problèmes d'installation
- [GitHub Issues](https://github.com/ITDev-Success/billing/issues) — signaler un bug
