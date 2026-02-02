# 🚀 Chatbot Groq - Prêt à Déployer

Ce dossier contient **TOUS les fichiers** nécessaires pour déployer votre chatbot en ligne.

## ✅ Contenu du package

```
deploy-ready/
├── index.html              ✓
├── package.json            ✓
├── vite.config.js          ✓
├── tailwind.config.js      ✓
├── postcss.config.js       ✓
└── src/
    ├── main.jsx            ✓
    ├── index.css           ✓
    └── App.jsx             ✓ (Votre chatbot)
```

**Tout est prêt !** Il suffit de déployer ! 🎉

---

## 🌐 Méthode 1 : Vercel (Le plus simple)

### Via GitHub

1. **Créer un repo GitHub**
   - Aller sur https://github.com/new
   - Nom : `mon-chatbot-groq`
   - Public
   - Create repository

2. **Upload les fichiers**
   - Cliquer sur "uploading an existing file"
   - Glisser-déposer TOUT le dossier `deploy-ready`
   - Commit

3. **Déployer sur Vercel**
   - Aller sur https://vercel.com
   - Se connecter avec GitHub
   - "New Project"
   - Importer `mon-chatbot-groq`
   - **Deploy !**

**Temps : 5 minutes** ⏱️

### Via Vercel CLI (si vous avez un terminal)

```bash
cd deploy-ready
npm install -g vercel
vercel
```

---

## 🔥 Méthode 2 : StackBlitz (100% en ligne)

1. **Aller sur** : https://stackblitz.com
2. Cliquer sur "New Project" → "Import from GitHub"
3. OU : Créer un nouveau projet React
4. Remplacer les fichiers par ceux du dossier `deploy-ready`
5. Cliquer sur "Deploy" en haut
6. Choisir Vercel ou Netlify
7. **C'est en ligne !**

---

## 🎯 Méthode 3 : Netlify

### Via drag & drop

1. **Build le projet localement** (si possible) :
   ```bash
   npm install
   npm run build
   ```

2. **Aller sur** : https://app.netlify.com/drop
3. Glisser le dossier `dist` généré
4. **Déployé !**

### Via GitHub

1. Push sur GitHub (comme Vercel)
2. Aller sur https://netlify.com
3. "New site from Git"
4. Sélectionner votre repo
5. Build command : `npm run build`
6. Publish directory : `dist`
7. **Deploy !**

---

## 🔑 Important : Clé API Groq

**Après le déploiement**, les utilisateurs devront entrer leur clé API Groq.

Pour obtenir une clé gratuite :
1. https://console.groq.com
2. Créer un compte
3. API Keys → Create API Key
4. Copier la clé (commence par `gsk_...`)

---

## 🛠️ Personnalisation

### Changer le titre
**Fichier `index.html`**, ligne 7 :
```html
<title>Mon Super Chatbot</title>
```

### Changer les couleurs
**Fichier `src/App.jsx`**, chercher :
- `emerald` → remplacer par votre couleur (blue, purple, pink, etc.)

### Changer le modèle IA
**Fichier `src/App.jsx`**, ligne ~72 :
```javascript
model: 'llama-3.3-70b-versatile'     // Actuel
model: 'mixtral-8x7b-32768'          // Plus rapide
model: 'gemma2-9b-it'                // Plus léger
```

---

## 📊 Ce qui se passe après le déploiement

1. **Vercel/Netlify build votre projet** (2-3 minutes)
2. **Génère une URL publique** : `https://votre-projet.vercel.app`
3. **Votre chatbot est accessible partout !** 🌍

---

## ✅ Checklist avant déploiement

- [ ] Tous les fichiers sont dans le dossier
- [ ] Vous avez un compte GitHub
- [ ] Vous avez un compte Vercel ou Netlify
- [ ] Vous avez une clé API Groq (pour tester)

---

## 🎉 Après le déploiement

**Vous obtenez** :
- ✅ URL publique (ex: `https://chatbot-groq.vercel.app`)
- ✅ HTTPS automatique (sécurisé)
- ✅ Mises à jour automatiques (si connecté à GitHub)
- ✅ 100% gratuit pour toujours

**Partagez l'URL** avec vos amis ! 🚀

---

## ❓ Questions fréquentes

**Q: Combien ça coûte ?**  
R: 0€. Vercel et Netlify sont gratuits pour les projets perso.

**Q: Ça reste en ligne combien de temps ?**  
R: Indéfiniment ! Tant que vous ne supprimez pas.

**Q: Je peux modifier après ?**  
R: Oui ! Modifiez sur GitHub, ça redéploie automatiquement.

**Q: C'est rapide ?**  
R: Oui ! Groq utilise des LPU (ultra-rapide).

**Q: Mes données sont sécurisées ?**  
R: La clé API est stockée localement dans le navigateur de chaque utilisateur.

---

## 🆘 Besoin d'aide ?

**Erreur au build ?**
- Vérifier que tous les fichiers sont bien uploadés
- Vérifier qu'il n'y a pas d'erreurs dans `App.jsx`

**Le site ne charge pas ?**
- Attendre 2-3 minutes (temps de build)
- Vérifier les logs de déploiement

**La clé API ne marche pas ?**
- Vérifier qu'elle commence par `gsk_`
- Vérifier sur https://console.groq.com qu'elle est active

---

**Bon déploiement !** 🎊
