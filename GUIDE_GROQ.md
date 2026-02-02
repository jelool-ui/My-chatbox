# 🚀 Chatbot Groq - 100% GRATUIT

## ⚡ Pourquoi Groq ?

- ✅ **100% GRATUIT** - Aucun paiement requis
- ✅ **Aucune carte bancaire** nécessaire
- ✅ **Ultra-rapide** - Propulsé par LPU (plus rapide que GPU)
- ✅ **Modèles puissants** - Llama 3.3 70B, Mixtral, et plus
- ✅ **Limite généreuse** - 14,400 requêtes/jour gratuit

## 📦 Installation en 3 minutes

### Étape 1 : Obtenir votre clé API Groq (GRATUIT)

1. Aller sur **https://console.groq.com**
2. Créer un compte (avec email ou Google)
3. Cliquer sur "API Keys"
4. Créer une nouvelle clé → Copier la clé (commence par `gsk_...`)

**C'EST TOUT !** Aucun paiement demandé ! 🎉

### Étape 2 : Installer le chatbot

```bash
# Créer le projet
npm create vite@latest mon-chatbot-groq -- --template react
cd mon-chatbot-groq

# Installer les dépendances
npm install
npm install lucide-react

# Installer Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Étape 3 : Configuration

**Fichier `tailwind.config.js`** :
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Fichier `src/index.css`** :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Étape 4 : Ajouter le chatbot

1. Copier le contenu de **`chatbot-groq.jsx`**
2. Coller dans **`src/App.jsx`** (remplacer tout)
3. Sauvegarder

### Étape 5 : Lancer ! 🎊

```bash
npm run dev
```

Ouvrir : **http://localhost:5173**

→ Entrer votre clé API Groq
→ Commencer à discuter !

---

## 🎨 Modèles disponibles (tous gratuits)

Dans `chatbot-groq.jsx`, ligne ~72, vous pouvez changer le modèle :

```javascript
model: 'llama-3.3-70b-versatile'     // ⭐ Recommandé - Le plus puissant
model: 'llama-3.1-70b-versatile'     // Très bon, un peu plus ancien
model: 'mixtral-8x7b-32768'          // Rapide et efficace
model: 'gemma2-9b-it'                // Léger et rapide
```

**Mon conseil** : Garder `llama-3.3-70b-versatile` (le meilleur) !

---

## 💰 Limites gratuites de Groq

| Modèle | Requêtes/minute | Requêtes/jour | Tokens/minute |
|--------|-----------------|---------------|---------------|
| **Llama 3.3 70B** | 30 | 14,400 | 6,000 |
| **Llama 3.1 70B** | 30 | 14,400 | 6,000 |
| **Mixtral 8x7B** | 30 | 14,400 | 5,000 |

**C'est ÉNORME pour un usage personnel !** 🤯

---

## 🌐 Déployer gratuitement

### Option 1 : Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
npm run build
vercel
```

### Option 2 : Netlify

```bash
npm run build
# Aller sur netlify.com
# Drag & drop le dossier 'dist'
```

### Option 3 : GitHub Pages

```bash
npm run build
# Push sur GitHub
# Activer GitHub Pages sur la branche gh-pages
```

---

## 🔐 Sécurité de la clé API

**⚠️ Important** : La clé API est stockée dans le navigateur (localStorage).

**Pour un usage personnel** : C'est OK ✅

**Pour un site public** : Vous devriez créer un backend qui protège la clé.

### Backend optionnel (pour sites publics)

Si vous voulez partager votre chatbot publiquement :

**Fichier `backend/server.js`** :
```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY; // Votre clé cachée

app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Backend sur port 3000'));
```

Déployer ce backend sur **Railway** ou **Render** (gratuit).

---

## 🎯 Comparaison avec Claude

| Critère | Groq (Gratuit) | Claude (Payant) |
|---------|----------------|-----------------|
| **Prix** | 0$ 🎉 | ~10-20$/mois |
| **Vitesse** | Ultra-rapide ⚡ | Rapide |
| **Qualité** | Très bonne ⭐⭐⭐⭐ | Excellente ⭐⭐⭐⭐⭐ |
| **Limite** | 14,400/jour | Selon abonnement |
| **Setup** | Simple | Besoin carte bancaire |

**Pour débuter** : Groq est **parfait** ! 🚀

---

## 🔥 Astuces

### Changer la température (créativité)
Ligne ~78 dans le code :
```javascript
temperature: 0.7  // 0 = précis, 1 = créatif
```

### Augmenter la longueur des réponses
```javascript
max_tokens: 2048  // Plus long (au lieu de 1024)
```

### Changer les couleurs
Chercher `emerald` dans le code et remplacer par :
- `purple` pour violet
- `blue` pour bleu
- `rose` pour rose
- `orange` pour orange

---

## ❓ Problèmes courants

### "Unauthorized" ou erreur 401
→ Vérifier que votre clé API est correcte (commence par `gsk_`)

### "Rate limit exceeded"
→ Vous avez dépassé 30 requêtes/minute. Attendez 1 minute.

### Réponses lentes
→ Normal si beaucoup d'utilisateurs. Groq est gratuit donc parfois saturé.

### Erreur CORS
→ Groq autorise les requêtes depuis le navigateur. Si problème, vérifier votre clé API.

---

## 🆚 Alternatives gratuites

Si Groq ne suffit pas :

1. **Together AI** - Crédits gratuits au départ
2. **Hugging Face** - Gratuit mais plus lent
3. **Cohere** - Crédits d'essai gratuits
4. **Replicate** - Paiement à l'usage (très cheap)

---

## 🎊 Félicitations !

Vous avez maintenant un chatbot IA **100% GRATUIT** et **ultra-rapide** !

**Prochaines étapes** :
1. Personnaliser le design
2. Ajouter des fonctionnalités (historique, export, etc.)
3. Déployer sur Vercel
4. Partager avec vos amis !

**Questions ?** Groq a une excellente documentation : https://console.groq.com/docs

---

## 📊 Stats impressionnantes de Groq

- **500+ tokens/seconde** (10x plus rapide que ChatGPT)
- **2-3 secondes** pour une réponse complète
- **Latence ultra-faible** grâce aux LPU

**C'est la meilleure option gratuite du marché !** 🏆
