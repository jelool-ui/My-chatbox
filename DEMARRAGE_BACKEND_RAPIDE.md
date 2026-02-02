# ⚡ Démarrage Rapide - Backend Sécurisé

## 🎯 En 5 minutes chrono !

### Étape 1 : Backend (2 min)

```bash
cd backend-secure
npm install
cp .env.example .env
```

**Éditer `.env`** et ajouter votre clé :
```
GROQ_API_KEY=gsk_votre_cle_ici
```

**Démarrer** :
```bash
npm run dev
```

✅ Si vous voyez "Backend démarré sur le port 3000" → OK !

---

### Étape 2 : Frontend (2 min)

**Dans un nouveau terminal** :

```bash
# Créer le projet React
npm create vite@latest mon-chatbot-secure -- --template react
cd mon-chatbot-secure

# Installer
npm install
npm install lucide-react tailwindcss

# Configurer Tailwind
npx tailwindcss init -p
```

**Créer `.env`** :
```
VITE_BACKEND_URL=http://localhost:3000
```

**Copier `chatbot-secure.jsx`** dans `src/App.jsx`

**Configurer Tailwind dans `src/index.css`** :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Lancer** :
```bash
npm run dev
```

---

### Étape 3 : Tester (1 min)

1. Ouvrir http://localhost:5173
2. Vérifier le point vert "En ligne"
3. Envoyer un message
4. ✅ Ça marche !

---

## 🚀 Déployer en production (5 min)

### Backend → Railway

1. Push sur GitHub
2. Aller sur railway.app
3. "New Project" → "Deploy from GitHub"
4. Ajouter variable : `GROQ_API_KEY=gsk_...`
5. Copier l'URL : `https://votre-backend.railway.app`

### Frontend → Vercel

```bash
vercel
```

Ajouter la variable d'environnement sur Vercel :
```
VITE_BACKEND_URL=https://votre-backend.railway.app
```

Redéployer :
```bash
vercel --prod
```

---

## ✅ C'EST FINI !

Votre chatbot est maintenant :
- 🔐 Sécurisé (clé API cachée)
- 🌐 En ligne (accessible partout)
- 💯 Gratuit (Railway + Vercel)
- ⚡ Rapide (Groq LPU)

**URL finale** : `https://votre-app.vercel.app`

Partagez-la avec le monde ! 🎉
