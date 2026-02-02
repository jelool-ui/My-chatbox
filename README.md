# 🔐 Backend Sécurisé pour Chatbot Groq

Backend Node.js/Express qui protège votre clé API Groq.

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Configuration
cp .env.example .env
# Éditer .env et ajouter votre clé GROQ_API_KEY

# Démarrage
npm run dev
```

Le serveur démarre sur http://localhost:3000

## 📡 Routes disponibles

### GET /health
Vérifie que le serveur fonctionne.

**Exemple** :
```bash
curl http://localhost:3000/health
```

**Réponse** :
```json
{
  "status": "ok",
  "message": "Backend Groq fonctionne correctement",
  "timestamp": "2025-01-30T10:00:00.000Z"
}
```

### POST /api/chat
Envoie un message au chatbot.

**Exemple** :
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Bonjour"}
    ]
  }'
```

**Paramètres** :
- `messages` (array, obligatoire) - Historique de la conversation
- `model` (string, optionnel) - Modèle Groq à utiliser (défaut: llama-3.3-70b-versatile)
- `temperature` (number, optionnel) - Créativité (0-1, défaut: 0.7)
- `max_tokens` (number, optionnel) - Longueur max (défaut: 1024)

**Réponse** :
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Bonjour ! Comment puis-je vous aider ?"
    }
  }]
}
```

### GET /api/stats
Statistiques du serveur.

## 🔒 Sécurité

### Rate Limiting
- **100 requêtes** par IP toutes les 15 minutes
- Protection contre les abus

### CORS
- Configuré pour accepter uniquement le frontend autorisé
- Modifier `FRONTEND_URL` dans `.env`

### Variables d'environnement
Toutes les clés sensibles sont dans `.env` (jamais dans le code).

## 📦 Dépendances

- **express** - Framework web
- **cors** - Gestion CORS
- **dotenv** - Variables d'environnement
- **express-rate-limit** - Rate limiting

## 🌐 Déploiement

### Railway (Recommandé)
1. Push sur GitHub
2. Importer sur Railway
3. Ajouter les variables d'environnement
4. Déploiement automatique !

### Render
1. Connecter GitHub
2. Build: `npm install`
3. Start: `npm start`
4. Ajouter les variables d'environnement

### AWS EC2
Voir le guide complet dans `GUIDE_BACKEND_SECURISE.md`

## 🧪 Tests

```bash
# Test santé
curl http://localhost:3000/health

# Test chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Test"}]}'
```

## 📝 Configuration

**Fichier `.env`** :
```env
GROQ_API_KEY=gsk_votre_cle_ici
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANT** : Ne jamais commit le fichier `.env` !

## 🐛 Dépannage

### Port déjà utilisé
```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9
```

### Clé API invalide
Vérifier que `GROQ_API_KEY` dans `.env` est correcte.

### Erreur CORS
Vérifier que `FRONTEND_URL` correspond à votre frontend.

## 📖 Documentation complète

Voir `GUIDE_BACKEND_SECURISE.md` pour :
- Guide détaillé d'installation
- Déploiement en production
- Sécurité avancée
- Monitoring et logs

## 📄 Licence

MIT
