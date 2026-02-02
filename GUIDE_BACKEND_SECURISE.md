# 🔐 Guide Backend Sécurisé - Protection de la clé API

## 🎯 Pourquoi sécuriser ?

**Problème** : Si vous mettez votre clé API directement dans le frontend, n'importe qui peut :
- 📋 Voir votre clé dans le code source
- 💸 Utiliser votre clé et vous coûter de l'argent
- 🔓 Abuser de votre quota gratuit

**Solution** : Un backend qui cache la clé API !

---

## 📊 Architecture

```
┌─────────────────┐
│   UTILISATEUR   │
└────────┬────────┘
         │ (envoie message)
         ▼
┌─────────────────┐
│    FRONTEND     │ ← Pas de clé API ici !
│  (React/Vite)   │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│     BACKEND     │ ← Clé API cachée ici 🔐
│  (Node.js/Express)
└────────┬────────┘
         │ (utilise clé)
         ▼
┌─────────────────┐
│   API GROQ      │
└─────────────────┘
```

---

## 🚀 Installation Locale (Test)

### Étape 1 : Installer le backend

```bash
# Naviguer dans le dossier backend
cd backend-secure

# Installer les dépendances
npm install
```

### Étape 2 : Configurer les variables d'environnement

```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier .env
nano .env  # ou code .env sur VS Code
```

**Contenu du fichier `.env`** :
```bash
GROQ_API_KEY=gsk_votre_vraie_cle_ici
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Étape 3 : Démarrer le backend

```bash
# Mode développement (avec auto-reload)
npm run dev

# Ou mode production
npm start
```

Vous devriez voir :
```
🚀 Backend démarré sur le port 3000
📡 API disponible sur http://localhost:3000/api/chat
🔐 Clé API Groq: Configurée ✓
```

### Étape 4 : Configurer le frontend

**Créer un fichier `.env` dans votre dossier frontend** :
```bash
# Dans le dossier du frontend
echo "VITE_BACKEND_URL=http://localhost:3000" > .env
```

### Étape 5 : Utiliser le nouveau frontend

1. Copier `chatbot-secure.jsx` dans `src/App.jsx`
2. Démarrer le frontend :
```bash
npm run dev
```

### Étape 6 : Tester ! 🎉

- Ouvrir http://localhost:5173
- Vérifier que le point vert indique "En ligne"
- Envoyer un message
- Ça marche ! La clé API est maintenant protégée ! 🔐

---

## ☁️ Déploiement en Production

### Option 1 : Railway (Recommandé - Gratuit)

**Backend sur Railway :**

1. **Créer un compte sur Railway.app**
   - S'inscrire gratuitement

2. **Nouveau projet**
   - "New Project" → "Deploy from GitHub"
   - Connecter votre repo GitHub
   - Sélectionner le dossier `backend-secure`

3. **Configurer les variables d'environnement**
   - Aller dans "Variables"
   - Ajouter :
     ```
     GROQ_API_KEY=gsk_votre_cle
     PORT=3000
     NODE_ENV=production
     FRONTEND_URL=https://votre-frontend.vercel.app
     ```

4. **Déployer**
   - Railway déploie automatiquement !
   - Vous obtenez une URL : `https://votre-backend.railway.app`

**Frontend sur Vercel :**

1. **Déployer le frontend**
   ```bash
   vercel
   ```

2. **Configurer la variable d'environnement**
   - Sur Vercel Dashboard
   - Settings → Environment Variables
   - Ajouter :
     ```
     VITE_BACKEND_URL=https://votre-backend.railway.app
     ```

3. **Redéployer**
   ```bash
   vercel --prod
   ```

**C'EST TOUT ! ✅**

---

### Option 2 : Render (Alternative gratuite)

**Backend sur Render :**

1. Aller sur **render.com**
2. "New" → "Web Service"
3. Connecter GitHub
4. Configurer :
   - Build Command : `npm install`
   - Start Command : `npm start`
5. Ajouter les variables d'environnement (comme Railway)
6. Déployer !

---

### Option 3 : AWS EC2 (Plus complexe)

**⚠️ Pas recommandé pour débuter**, mais voici les étapes :

1. **Lancer EC2 t2.micro**
2. **Se connecter via SSH**
3. **Installer Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs -y
   ```

4. **Cloner votre code**
   ```bash
   git clone votre-repo
   cd backend-secure
   npm install
   ```

5. **Configurer .env**
   ```bash
   nano .env
   # Ajouter vos variables
   ```

6. **Installer PM2 (process manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

7. **Configurer Nginx (reverse proxy)**
   ```bash
   sudo apt install nginx -y
   sudo nano /etc/nginx/sites-available/default
   ```

   Contenu :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Redémarrer Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

---

## 🛡️ Sécurité Avancée

### 1. Rate Limiting (déjà inclus)

Le backend limite à **100 requêtes par IP toutes les 15 minutes**.

Pour modifier :
```javascript
// Dans server.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Changer à 50 requêtes
});
```

### 2. CORS strict

En production, limitez les domaines autorisés :
```javascript
// Dans .env
FRONTEND_URL=https://mon-chatbot.vercel.app

// Dans server.js, c'est déjà configuré :
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
```

### 3. HTTPS en production

**Railway et Render** : HTTPS automatique ✅

**EC2** : Utiliser Certbot (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

### 4. Monitoring des requêtes

Ajouter un logger :
```bash
npm install morgan
```

```javascript
// Dans server.js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### 5. Protection contre attaques

Installer Helmet :
```bash
npm install helmet
```

```javascript
// Dans server.js
const helmet = require('helmet');
app.use(helmet());
```

---

## 📊 Coûts Estimés

| Service | Coût (Backend) | Coût (Frontend) |
|---------|----------------|-----------------|
| **Railway** | Gratuit (500h/mois) | - |
| **Render** | Gratuit (750h/mois) | - |
| **Vercel** | - | Gratuit illimité |
| **AWS EC2** | Gratuit 1 an | - |

**Pour usage personnel** : 100% gratuit avec Railway + Vercel ! 🎉

---

## ✅ Checklist de Sécurité

Avant de rendre public votre chatbot :

- [ ] ✅ Clé API dans `.env` (pas dans le code)
- [ ] ✅ `.env` dans `.gitignore`
- [ ] ✅ CORS configuré (pas `*` en production)
- [ ] ✅ Rate limiting activé
- [ ] ✅ HTTPS activé en production
- [ ] ✅ Variables d'environnement sur Railway/Render
- [ ] ✅ Frontend pointe vers le bon backend
- [ ] ✅ Tester avec différentes IP

---

## 🔍 Dépannage

### Backend ne démarre pas
```bash
# Vérifier les logs
npm start

# Si erreur "port already in use"
lsof -ti:3000 | xargs kill -9
```

### Frontend ne se connecte pas au backend
1. Vérifier que le backend est démarré
2. Vérifier `VITE_BACKEND_URL` dans `.env`
3. Vérifier la console du navigateur (F12)
4. Tester l'URL backend directement : `http://localhost:3000/health`

### Erreur CORS
```javascript
// Dans server.js, temporairement pour tester :
app.use(cors({ origin: '*' }));
// Puis remettre l'URL spécifique après
```

### Groq retourne une erreur
- Vérifier que `GROQ_API_KEY` est correct
- Tester la clé sur https://console.groq.com
- Vérifier les logs du backend

---

## 🎯 Résumé

**Version simple (frontend seul)** :
- ✅ Rapide à setup
- ❌ Clé API exposée
- ⚠️ OK pour usage personnel seulement

**Version sécurisée (avec backend)** :
- ✅ Clé API protégée 🔐
- ✅ Rate limiting
- ✅ Partageable publiquement
- ⏱️ Setup un peu plus long

**Mon conseil** :
1. Commencer avec la version simple pour apprendre
2. Passer à la version sécurisée avant de partager publiquement
3. Déployer sur Railway (backend) + Vercel (frontend)

---

## 📞 Support

**Tester le backend** :
```bash
curl http://localhost:3000/health
```

**Tester l'API chat** :
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

Si ça fonctionne, votre backend est configuré correctement ! 🎉
