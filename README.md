# 🛍️ BoutiqueMaillot — Projet React

Boutique de maillots de football personnalisés, convertie de HTML/JS vers React.

## 🚀 Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:5173
```

## 📦 Build pour production

```bash
npm run build
npm run preview
```

## 🗂️ Structure du projet

```
maillot-shop/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Point d'entrée
    ├── App.jsx               # Routeur principal (home/detail/cart)
    ├── context/
    │   └── CartContext.jsx   # Gestion du panier (Context API + localStorage)
    ├── data/
    │   └── products.js       # Liste des 28 maillots
    ├── components/
    │   ├── Navbar.jsx        # Barre de navigation + menu utilisateur + panier
    │   └── ProductCard.jsx   # Carte produit avec hover effect
    └── pages/
        ├── HomePage.jsx      # Grille des produits + Hero + Footer
        ├── ProductDetail.jsx # Détail + formulaire personnalisation + aperçu live
        └── CartPage.jsx      # Panier + résumé + commande WhatsApp
```

## ✨ Fonctionnalités

- ✅ Affichage de 28 maillots en grille responsive
- ✅ Recherche en temps réel
- ✅ Page détail avec personnalisation (nom, numéro, taille, quantité)
- ✅ Aperçu live du flocage
- ✅ Calcul automatique du prix (flocage inclus)
- ✅ Panier avec localStorage (persistant)
- ✅ Suppression d'articles du panier
- ✅ Commander via WhatsApp
- ✅ Menu utilisateur avec dropdown
- ✅ Footer complet
- ✅ Design responsive

## 📝 Ajouter vos images

Placez vos images dans `public/images/` et mettez à jour les chemins dans `src/data/products.js` :

```js
{ id: 1, name: "Maillot PSG", price: 80, image: "/images/psg.jpg", color: "#004170" },
```

## 🛠️ Technologies

- **React 18** + Hooks (useState, useEffect, useContext, useRef)
- **Vite** (bundler rapide)
- **Context API** pour le panier global
- **localStorage** pour la persistance
- **CSS-in-JS** (styles inline) — pas de dépendance CSS externe
