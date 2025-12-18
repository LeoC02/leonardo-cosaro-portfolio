import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function ChatInterface({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Ciao! Sono l\'assistente di Leonardo Cosaro. Posso aiutarti a conoscere le sue competenze, progetti e modalità di collaborazione. Come posso aiutarti?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemPrompt = `Sei l'assistente personale di Leonardo Cosaro, un backend developer specializzato in Python.

Il tuo ruolo è:
- Rispondere a domande sui progetti di Leonardo
- Fornire informazioni sulle sue competenze tecniche (Python, Django, FastAPI, Flask, PostgreSQL, MySQL, REST API)
- Aiutare i visitatori a capire come può collaborare con loro
- Essere professionale ma amichevole

Progetti di Leonardo:
1. Gestione e Analisi dei Dati - Web app per gestione, modifica e analisi dati statistici con Django e PostgreSQL
2. Gestione Campagne Email - Gestionale per email marketing con PHP Laravel e MySQL
3. Gestione Flussi Operativi - Gestionale per organizzazione flussi aziendali con Django, PostgreSQL e Celery

Leonardo segue i progetti in ogni fase: analisi, progettazione, sviluppo, test, rilascio e supporto.

Contatti:
- Email: leonardocosarodev@gmail.com
- Location: Italia
- GitHub e LinkedIn disponibili sul sito

Rispondi sempre in italiano e in modo conciso.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `${systemPrompt}\n\nDomanda dell'utente: ${userMessage}`,
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Mi dispiace, si è verificato un errore. Riprova tra poco.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:bottom-24 md:right-6 md:left-auto md:top-auto 
              md:w-[380px] md:h-[600px] z-50
              bg-slate-900/95 backdrop-blur-xl rounded-2xl
              border border-white/10 shadow-2xl shadow-black/50
              flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10
              bg-gradient-to-r from-blue-600/20 to-violet-600/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-violet-600
                  flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Assistente di Leonardo</h3>
                  <p className="text-white/50 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10
                  flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600' 
                      : 'bg-white/10'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm
                      ${message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                        : 'bg-white/5 text-white/90 border border-white/10'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi un messaggio..."
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40
                    focus:border-violet-500/50 focus:ring-violet-500/20 h-10 rounded-xl"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600
                    hover:from-blue-500 hover:to-violet-500 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}