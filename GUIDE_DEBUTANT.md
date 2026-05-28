# OLEEN - Guide debutant

Date de depart : 27/05/2026
Date cible : 03/06/2026

OLEEN est une application mobile Expo React Native pour iOS et Android. Cette version est une demo complete pour devoir de lycee : toutes les fonctionnalites demandees sont presentes, avec des donnees locales et des interactions simples.

## 1. Lancer l'application

Ouvre un terminal dans le dossier principal :

```powershell
cd E:\Autres\OLEEN2.0
npm start
```

Ensuite :

- Sur Android : installe Expo Go et scanne le QR code.
- Sur iPhone : installe Expo Go et scanne le QR code.
- Sur emulateur Android : utilise `npm run android`.
- Pour une vraie compilation iOS depuis Windows : utilise Expo Go pour la demo, ou EAS Build plus tard.

Compatibilite actuelle : le projet est regle sur Expo SDK 54 pour fonctionner avec Expo Go `54.0.8`.

## 2. Ce qui est deja dans l'app

- Videos de sports : lecteur visuel + liste de sources a ouvrir.
- Sciences astronomiques : articles, evenements du ciel et quiz.
- Paris sportifs : mises, cotes, tickets et historique en credits virtuels.
- Solfege par instrument : piano, guitare, violon, flute, batterie, saxophone.
- Videos de musique live : scene live, lecteur visuel et sources externes.
- Reseau social : profil, publication, likes, commentaires et partages.

Important : le module de paris reste une simulation. Pas d'argent reel, pas de paiement, pas de compte de paris.

## 3. Plan de travail jusqu'au 03/06/2026

### 27/05/2026

- Lancer l'app avec `npm start`.
- Tester chaque onglet.
- Noter ce qui manque pour ta presentation.

### 28/05/2026

- Remplacer les textes de demo par tes vrais contenus.
- Choisir 3 videos sportives et 3 lives musicaux a presenter.

### 29/05/2026

- Ajuster les matchs fictifs du module de paris.
- Verifier que les mises et les gains virtuels sont comprehensibles.

### 30/05/2026

- Completer les cours de solfege avec les instruments que tu veux mettre en avant.
- Ajouter 1 question de quiz supplementaire si tu as le temps.

### 31/05/2026

- Polir l'interface : titres, couleurs, textes trop longs.
- Tester sur telephone.

### 01/06/2026

- Preparer une demo de 2 a 3 minutes.
- Faire une capture d'ecran de chaque module.

### 02/06/2026

- Repetition generale.
- Corriger les derniers bugs visibles.

### 03/06/2026

- Presentation finale.
- Montrer d'abord l'accueil, puis chaque module obligatoire.

## 4. Methode vibe coding

Travaille par petites demandes. Exemple :

```text
Ameliore seulement l'ecran Paris sportifs. Je veux que les tickets soient plus clairs et que le bouton Gagne ajoute les credits.
```

Bon rythme :

1. Demander une petite modification.
2. Tester dans Expo Go.
3. Dire exactement ce que tu vois.
4. Continuer module par module.

## 5. Fichiers importants

- `App.js` : toute l'application mobile.
- `app.json` : nom, slug et configuration Expo.
- `package.json` : dependances et commandes.
- `all.txt` dans le dossier parent : ancienne version web fournie comme reference.
