# OLEEN

OLEEN est une application mobile réalisée dans le cadre d'un projet de Lycée de fin d'année de 2nd.
Elle rassemble plusieurs espaces dans une seule experience : sport, astronomie,
musique, apprentissage du solfege, reseau social et paris sportifs simules.

## Site de presentation

Le site vitrine du projet se trouve dans le dossier `docs/`.

Il peut être hébergé avec Github Pages.

Quand GitHub Pages est activé, il peut aussi être publié à cette adresse :

```text
https://odg747.github.io/OLEEN/
```

## Application mobile

La version mobile est développée avec Expo React Native. Elle est présentée et
téstée sur Android avec Expo Go.

Fonctionnalités principales :

- Videos de sports
- Sciences astronomiques
- Paris sportifs simulés avec credits virtuels
- Apprentissage du solfège par instrument
- Vidéos de musique live ou replay
- Réseau social avec publications, likes, commentaires et partages

Le module de paris est uniquement une simulation. Il n'utilise pas d'argent réel.

## Stack

- Expo SDK 54
- React Native 0.81
- React 19
- JavaScript
- AsyncStorage
- HTML, CSS et JavaScript pour le site de présentation

## Installation

```powershell
npm install
```

## Lancer l'application

```powershell
npm start
```

Le serveur Expo démarre sur le port `8083` par défaut.

## Builds EAS

Le projet est configuré avec EAS Build.

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
+-- netlify.toml
+-- PRESENTATION_VIDEO.md
+-- metro.config.js
+-- package.json
+-- README.md
```

## Téléchargment

```
https://expo.dev/accounts/odg747/projects/oleen/builds/1c117ad6-17f0-4f72-89f0-7bb3541e8591
```
