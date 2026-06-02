# OLEEN

OLEEN est une application mobile realisee dans le cadre d'un projet de lycee.
Elle rassemble plusieurs espaces dans une seule experience : sport, astronomie,
musique, apprentissage du solfege, reseau social et paris sportifs simules.

## Site de presentation

Le site vitrine du projet se trouve dans le dossier `docs/`.

Quand GitHub Pages est active, il est publie a cette adresse :

```text
https://odg747.github.io/OLEEN/
```

## Application mobile

La version mobile est developpee avec Expo React Native. Elle peut etre testee
sur Android et iOS avec Expo Go.

Fonctionnalites principales :

- Videos de sports
- Sciences astronomiques
- Paris sportifs simules avec credits virtuels
- Apprentissage du solfege par instrument
- Videos de musique live ou replay
- Reseau social avec publications, likes, commentaires et partages

Le module de paris est uniquement une simulation. Il n'utilise pas d'argent reel.

## Stack

- Expo SDK 54
- React Native 0.81
- React 19
- JavaScript
- AsyncStorage
- HTML, CSS et JavaScript pour le site de presentation

## Installation

```powershell
npm install
```

## Lancer l'application

```powershell
npm start
```

Le serveur Expo demarre sur le port `8083`.

## Builds EAS

Le projet est configure avec EAS Build.

Build de test interne :

```powershell
npx eas build --platform android --profile preview
```

Build de production :

```powershell
npx eas build --platform android --profile production
```

## Lancer le site en local

Le site est statique. Il suffit d'ouvrir ce fichier dans un navigateur :

```text
docs/index.html
```

## Organisation de l'equipe

L'equipe est composee de 7 personnes :

- 1 chef developpeur
- 1 developpeur
- 3 designers
- 1 responsable communication
- 1 responsable finances

## Structure

```text
.
+-- App.js
+-- app.json
+-- assets/
+-- docs/
|   +-- index.html
|   +-- styles.css
|   +-- script.js
|   +-- assets/
+-- metro.config.js
+-- package.json
+-- README.md
```

## Depot

```text
https://github.com/ODG747/OLEEN
```
