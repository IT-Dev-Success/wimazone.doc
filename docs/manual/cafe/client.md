---
title: Client Flutter Cafe
---

# Client Flutter Cafe

Le client WimaZone Cafe est une application Flutter desktop installee sur chaque poste de travail du cyber cafe. Elle gere le verrouillage de l'ecran, le suivi de session et la communication avec le serveur billing.

## Installation

### Prerequis

- Flutter SDK 3.x+
- Dart SDK
- Windows 10+ ou Linux (support desktop)

### Compilation

```bash
cd cafe-client
flutter pub get
flutter build windows --release    # ou linux
```

L'executable genere se trouve dans `build/windows/runner/Release/` (ou equivalent Linux).

## Configuration

Au premier lancement, l'ecran de configuration demande :

| Champ | Description | Exemple |
|---|---|---|
| URL du serveur Billing | Adresse HTTP du serveur Laravel | `http://192.168.88.1:8080` |
| URL WebSocket | Adresse WebSocket pour les commandes temps reel | `ws://192.168.88.1:8080/ws/cafe-client` |
| Nom du poste | Identifiant unique du poste (doit correspondre au dashboard) | `PC-01` |
| Code d'activation | Token au format `XXX-XXX-XXX-XXX` (12 chiffres) | `123-456-789-012` |
| Nom de l'entreprise | Affiche sur l'ecran de verrouillage | `WimaZone Cafe` |

### Code d'activation

Le code d'activation est genere automatiquement lors de la creation du poste dans le dashboard admin. Il est au format **12 chiffres groupes par 3** : `XXX-XXX-XXX-XXX`.

La saisie se fait via un champ segmente (4 cases de 3 chiffres) avec :

- Avance automatique au groupe suivant quand 3 chiffres sont saisis
- Retour automatique au groupe precedent sur Backspace
- Support du copier-coller d'un code complet
- Validation : seuls les chiffres sont acceptes

## Fonctionnement

### Ecran de verrouillage

Quand aucune session n'est active, le poste affiche un ecran de verrouillage plein ecran avec :

- Logo et nom de l'entreprise
- Nom du poste
- Adresse IP et MAC detectees
- Indicateur de connexion au serveur (vert/rouge/orange)
- Bouton "Demarrer une session" (si libre-service active)

### Session active

Pendant une session, l'ecran de verrouillage disparait et l'utilisateur a acces au bureau. Le client continue de :

- Afficher le temps restant en arriere-plan
- Envoyer des heartbeats au serveur (toutes les 30s)
- Recevoir des commandes (verrouillage, arret, redemarrage)

### Erreurs d'authentification

Si le code d'activation est invalide, le client :

- Affiche un encadre orange avec le message d'erreur
- Arrete les tentatives de reconnexion automatique
- Propose un bouton pour ouvrir les parametres et corriger le code

## Communication API

Le client utilise une API REST avec authentification Bearer token :

- **Register** : enregistre le poste au demarrage (met a jour IP, MAC, hostname, OS)
- **Heartbeat** : signal de vie periodique, retourne l'etat de session courant
- **Poll** : interrogation de l'etat de session (fallback quand WebSocket est indisponible)
- **Start session** : demarrage en mode libre-service
- **End session** : fin de session depuis le client

Toutes les requetes ont un timeout de 15 secondes et un parsing JSON securise.

## Parametres

Les parametres sont accessibles via l'icone engrenage en bas a gauche de l'ecran de verrouillage. Ils permettent de modifier la configuration sans reinstaller l'application.
