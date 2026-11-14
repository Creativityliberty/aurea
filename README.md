# AURÉA — Hero Section cinématographique

Prototype HTML/CSS/JS pour une marque d'architecture **fictive**, conçu sur la vidéo Gemini fournie.

## Prévisualisation

1. Décompressez l'archive.
2. Ouvrez `index.html` dans Chrome, Firefox ou Safari. Si l'autoplay vidéo est bloqué dans un navigateur sur `file://`, lancez un mini serveur local : `python3 -m http.server 8000`, puis ouvrez `http://localhost:8000`.
3. La vidéo est muette, en lecture automatique, en boucle et avec contrôle « Pause / Lecture ».

## Fichiers

- `index.html` : structure HTML accessible + Hero Section + sections de démonstration.
- `styles.css` : direction artistique, responsive et transitions.
- `script.js` : menu mobile, comportement de navigation, lecture / pause et préférence de mouvement réduit.
- `assets/aurea-hero.mp4` : vidéo originale Gemini transcodée **sans audio** et optimisée pour le web.
- `assets/aurea-poster.webp` : image de couverture et fallback lorsque la vidéo ne joue pas.
- `assets/aurea-project.webp` : image de la section Projet.

## Personnalisation rapide

- Marque et texte : recherchez `AURÉA` dans `index.html`.
- Typographie et palette : `:root` au début de `styles.css`.
- Placement du sujet sur mobile : `.hero-media video { object-position: 66% center; }`.
- Contraste de l'image : `.hero-shade` dans `styles.css`.
- Remplacement vidéo : `assets/aurea-hero.mp4`.

## Notes de mise en production

La vidéo source est **1280 × 720**, **24 fps**, pour environ **10 secondes**. Une résolution supérieure nécessite une nouvelle génération ou un upscaling, elle n'est pas simulée dans cette livraison. La vidéo d'origine a un déplacement continu ; son raccord de boucle peut rester perceptible. Les images sont extraites de la vidéo. Les photos / textes / contenus sont des éléments fictifs de démonstration, tout comme la marque AURÉA. Aucun formulaire d'envoi ni backend n'est activé ; branchez vos contacts réels, contenus et données légales avant publication.

La maquette s'adapte aux mobiles, propose une image fallback et respecte `prefers-reduced-motion`.
