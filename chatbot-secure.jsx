import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot, User, Zap, Shield } from 'lucide-react';

export default function ChatbotSecure() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis votre assistant IA sécurisé. Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  // URL du backend (à modifier selon votre déploiement)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Vérifier la connexion au backend au démarrage
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      setBackendStatus('offline');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (backendStatus === 'offline') {
      alert('Le backend n\'est pas disponible. Veuillez vérifier qu\'il est démarré.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Appel au backend (pas directement à l'API Groq)
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'llama-3.3-70b-versatile',
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.choices && data.choices[0]) {
        const assistantMessage = data.choices[0].message.content;
        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
      } else {
        throw new Error('Réponse invalide du serveur');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `❌ Erreur: ${error.message}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full max-w-4xl h-[90vh] bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6 border-b border-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-300" />
                <div className="absolute inset-0 blur-xl bg-blue-500/50"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Chatbot Sécurisé</h1>
                <p className="text-blue-300 text-sm">🔐 API protégée • Backend sécurisé</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                backendStatus === 'online' ? 'bg-green-400 animate-pulse' :
                backendStatus === 'offline' ? 'bg-red-400' :
                'bg-yellow-400 animate-pulse'
              }`}></div>
              <span className="text-xs text-slate-300">
                {backendStatus === 'online' ? 'En ligne' :
                 backendStatus === 'offline' ? 'Hors ligne' :
                 'Vérification...'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 shadow-lg'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800/80 rounded-2xl px-5 py-3 border border-slate-700/50 shadow-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-sm text-slate-300">En train de réfléchir...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-slate-900/50 border-t border-blue-500/20">
          {backendStatus === 'offline' && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl">
              <p className="text-sm text-red-300 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Backend hors ligne. Vérifiez que le serveur est démarré sur {BACKEND_URL}
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              disabled={isLoading || backendStatus !== 'online'}
              className="flex-1 bg-slate-800/80 text-white placeholder-slate-400 rounded-xl px-5 py-3 border border-slate-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim() || backendStatus !== 'online'}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Backend sécurisé • Clé API protégée • Appuyez sur Entrée pour envoyer
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
