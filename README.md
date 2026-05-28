# OLEEN

Application mobile Expo React Native realisee pour un devoir de lycee.

OLEEN regroupe plusieurs univers dans une seule application mobile : videos de sport, sciences astronomiques, paris sportifs simules, apprentissage du solfege, musique live et reseau social.

## Apercu

Cette version est une demo mobile complete, utilisable avec Expo Go sur Android et iOS. Les donnees sont stockees localement sur le telephone, sans serveur distant.

Le module de paris sportifs utilise uniquement des credits virtuels. Il ne contient pas d'argent reel, pas de paiement, pas de retrait et pas de compte de paris.

## Fonctionnalites

- Videos de sports : lecteur visuel, selection de videos et liens vers des sources externes.
- Sciences astronomiques : contenus educatifs, evenements du ciel et quiz rapide.
- Paris sportifs : matchs fictifs, cotes, mises, tickets, gains potentiels et historique.
- Solfege par instrument : modules piano, guitare, violon, flute, batterie et saxophone.
- Videos de musique en temps reel : scene live, selection de performances et liens externes.
- Reseau social : profil utilisateur, publications, likes, commentaires et partages.

## Stack technique

- Expo SDK 54
- React Native 0.81
- React 19
- JavaScript
- AsyncStorage pour les donnees locales
- Lucide React Native pour les icones

## Installation

Installe Node.js, puis lance :

```powershell
npm install
```

## Lancement

```powershell
npm start
```

Le projet demarre sur le port `8083`.

Avec Expo Go :

1. Ouvrir Expo Go sur le telephone.
2. Scanner le QR code affiche dans le terminal.
3. Verifier que le telephone et le PC sont sur le meme reseau Wi-Fi.

Lien local utilise pendant le developpement :

```text
exp://192.168.1.6:8083
```

## Compatibilite Expo Go

Le projet est aligne sur Expo SDK 54 pour fonctionner avec Expo Go `54.0.8`.

Si Expo Go affiche une erreur de SDK incompatible, verifier la version d'Expo Go et relancer le serveur avec cache vide :

```powershell
npm start
```

## Structure du projet

```text
oleen-mobile/
  App.js
  app.json
  package.json
  metro.config.js
  GUIDE_DEBUTANT.md
  assets/
```

## Guide debutant

Le fichier `GUIDE_DEBUTANT.md` contient un plan de travail simple jusqu'a la date cible du `03/06/2026`, avec une approche progressive pour tester et ameliorer l'application.

## Etat du projet

Version actuelle : demo fonctionnelle.

Ce qui est deja pret :

- Interface mobile complete
- Navigation par modules
- Donnees de demonstration
- Sauvegarde locale des interactions
- Compilation Android verifiee avec Expo

Ameliorations possibles :

- Ajouter le vrai logo OLEEN
- Remplacer les contenus fictifs par des contenus definitifs
- Ajouter des captures d'ecran au README
- Creer une version APK avec EAS Build

## Commandes utiles

```powershell
npm start
npm run android
npm run ios
npx expo-doctor
```

## Auteur

Projet OLEEN, devoir de lycee, 2026.
