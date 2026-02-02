const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Limiter aux domaines autorisés en production
  methods: ['POST', 'GET']
}));
app.use(express.json());

// Rate limiting - protection contre abus
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP toutes les 15 minutes
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' }
});

app.use('/api/chat', limiter);

// Route de santé
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend Groq fonctionne correctement',
    timestamp: new Date().toISOString()
  });
});

// Route principale pour le chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, temperature, max_tokens } = req.body;

    // Validation des données
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Format de messages invalide' 
      });
    }

    // Vérifier que la clé API est configurée
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'Clé API Groq non configurée sur le serveur' 
      });
    }

    // Appel à l'API Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 1024
      })
    });

    const data = await response.json();

    // Vérifier si l'API a retourné une erreur
    if (!response.ok) {
      console.error('Erreur API Groq:', data);
      return res.status(response.status).json({ 
        error: data.error?.message || 'Erreur lors de l\'appel à l\'API Groq' 
      });
    }

    // Retourner la réponse
    res.json(data);

  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ 
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route pour obtenir les stats (optionnel)
app.get('/api/stats', (req, res) => {
  res.json({
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}/api/chat`);
  console.log(`🔐 Clé API Groq: ${process.env.GROQ_API_KEY ? 'Configurée ✓' : 'NON configurée ✗'}`);
});

module.exports = app;
