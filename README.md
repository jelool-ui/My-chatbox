# 🤖 Chatbot IA - Interface moderne

## ✨ Caractéristiques

- ✅ Interface de chat élégante et moderne
- ✅ Utilise l'API Claude Sonnet 4 (IA de pointe)
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Animations fluides et effets visuels
- ✅ Prêt à déployer gratuitement

## 📦 Fichiers inclus

1. **chatbot-ai.jsx** - Interface complète du chatbot (React)
2. **app.py** - Backend Flask (optionnel)
3. **requirements.txt** - Dépendances Python
4. **package.json** - Dépendances Node.js
5. **GUIDE_DEPLOIEMENT.md** - Instructions détaillées

## 🚀 Démarrage rapide

### Option 1 : Tester localement (recommandé)

1. Créer un projet React :
```bash
npm create vite@latest mon-chatbot -- --template react
cd mon-chatbot
```

2. Installer Tailwind CSS :
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

3. Remplacer `src/App.jsx` par le fichier `chatbot-ai.jsx`

4. Configurer Tailwind dans `src/index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Lancer le projet :
```bash
npm run dev
```

### Option 2 : Déployer sur Vercel (gratuit)

1. Push votre code sur GitHub
2. Aller sur vercel.com
3. Importer le projet depuis GitHub
4. Déploiement automatique ! ✨

## 💡 Comment ça marche ?

Le chatbot utilise **l'API Claude d'Anthropic** directement depuis le navigateur. 
Aucun serveur backend n'est nécessaire pour commencer !

```javascript
// Appel API Claude (déjà intégré dans le code)
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    messages: [...]
  })
})
```

## 🎨 Personnalisation

### Changer les couleurs
Modifier les classes Tailwind dans `chatbot-ai.jsx` :
- `from-purple-600 to-blue-600` → Votre gradient
- `bg-slate-900` → Votre couleur de fond

### Changer le modèle IA
Dans le code, ligne ~50 :
```javascript
model: 'claude-sonnet-4-20250514'  // Sonnet 4
model: 'claude-haiku-4-5-20251001'  // Haiku (moins cher)
model: 'claude-opus-4-5-20251101'   // Opus (plus puissant)
```

### Ajouter votre clé API
Si vous voulez utiliser votre propre clé Anthropic :
```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'VOTRE_CLE_ICI',
  'anthropic-version': '2023-06-01'
}
```

## 📊 Coûts estimés

- **Hébergement frontend** : Gratuit (Vercel/Netlify)
- **API Claude Sonnet 4** : 
  - ~$3 par million de tokens
  - Usage personnel : 5-20$/mois

## 🛠️ Technologies utilisées

- **React 18** - Framework frontend
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes
- **Claude API** - Intelligence artificielle
- **Vite** - Build tool

## 📝 Licence

Projet libre d'utilisation pour apprentissage et usage personnel.

## 🤝 Contribution

N'hésitez pas à :
- Améliorer le design
- Ajouter des fonctionnalités
- Corriger des bugs
- Partager vos créations !

## 📞 Questions ?

Consultez le **GUIDE_DEPLOIEMENT.md** pour des instructions détaillées.

---

**Créé avec ❤️ par Claude**
