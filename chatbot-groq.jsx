import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot, User, Zap } from 'lucide-react';

export default function ChatbotGroq() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Je suis votre assistant IA propulsé par Groq. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('groq_api_key', apiKey);
      setShowApiKeyInput(false);
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      alert('Veuillez entrer votre clé API Groq');
      setShowApiKeyInput(true);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Appel à l'API Groq
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Modèle gratuit et puissant
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const assistantMessage = data.choices[0].message.content;
        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
      } else if (data.error) {
        throw new Error(data.error.message || 'Erreur API');
      } else {
        throw new Error('Réponse invalide de l\'API');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: `❌ Erreur: ${error.message}. Vérifiez votre clé API.` 
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

  const resetApiKey = () => {
    setShowApiKeyInput(true);
    setApiKey('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full max-w-4xl h-[90vh] bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-6 border-b border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="w-8 h-8 text-emerald-300" />
                <div className="absolute inset-0 blur-xl bg-emerald-500/50"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Chatbot Groq</h1>
                <p className="text-emerald-300 text-sm">⚡ Ultra-rapide • 100% Gratuit</p>
              </div>
            </div>
            <button
              onClick={resetApiKey}
              className="text-emerald-300 hover:text-emerald-200 text-sm underline"
            >
              Changer clé API
            </button>
          </div>
        </div>

        {/* API Key Input Modal */}
        {showApiKeyInput && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-emerald-500/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl font-bold text-white">Clé API Groq</h2>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Obtenez votre clé API gratuite sur{' '}
                <a 
                  href="https://console.groq.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  console.groq.com
                </a>
              </p>
              
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-xl px-4 py-3 border border-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 mb-4"
                onKeyPress={(e) => e.key === 'Enter' && saveApiKey()}
              />
              
              <button
                onClick={saveApiKey}
                disabled={!apiKey.trim()}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Sauvegarder
              </button>

              <div className="mt-6 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                <p className="text-xs text-emerald-300">
                  ✅ 100% gratuit<br/>
                  ✅ Aucune carte bancaire requise<br/>
                  ✅ Ultra-rapide (LPU)<br/>
                  ✅ Modèles puissants (Llama 3.3 70B)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 shadow-lg'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/50">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800/80 rounded-2xl px-5 py-3 border border-slate-700/50 shadow-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-sm text-slate-300">En train de réfléchir...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-slate-900/50 border-t border-emerald-500/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              disabled={isLoading}
              className="flex-1 bg-slate-800/80 text-white placeholder-slate-400 rounded-xl px-5 py-3 border border-slate-700/50 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 flex items-center gap-2 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            ⚡ Propulsé par Groq • 100% Gratuit • Appuyez sur Entrée pour envoyer
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
