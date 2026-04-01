import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { MODELS, callGemini, callOpenRouter } from '../lib/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  modelId?: string;
}

interface ChatUIProps {
  onClose: () => void;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-neon-green" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

export default function ChatUI({ onClose }: ChatUIProps) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [history, setHistory] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, responses]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsSending(true);
    setResponses({});

    try {
      // Call all models in parallel
      const promises = MODELS.map(async (model) => {
        let result = '';
        try {
          if (model.provider === 'google') {
            result = await callGemini(model.id, userMessage);
          } else {
            result = await callOpenRouter(model.id, userMessage);
          }
        } catch (err) {
          result = `Error: ${err instanceof Error ? err.message : String(err)}`;
        }
        setResponses(prev => ({ ...prev, [model.id]: result }));
      });

      await Promise.allSettled(promises);
    } catch (error) {
      console.error("Critical Chat Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-6xl h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-teal flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">AI ka Thanos Chat</h2>
              <p className="text-xs text-white/50">6 Models • One Prompt • Infinite Power</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {history.length === 0 && !isSending && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bot className="w-16 h-16" />
              <p className="text-xl font-medium">Unleash the power. Ask anything.</p>
            </div>
          )}

          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-neon-purple/20 border border-neon-purple/30 text-white' : 'bg-white/5 border border-white/10'}`}>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider opacity-50">
                  {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  {msg.role === 'user' ? 'You' : 'AI ka Thanos'}
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Multi-model Responses */}
          {(isSending || Object.keys(responses).length > 0) && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODELS.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 rounded-xl border bg-white/5 flex flex-col h-full transition-all duration-500 ${
                      responses[model.id] 
                        ? (model.color === 'neon-teal' ? 'border-neon-teal/30' : 
                           model.color === 'neon-purple' ? 'border-neon-purple/30' : 
                           'border-neon-green/30')
                        : 'border-white/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${
                        model.color === 'neon-teal' ? 'bg-neon-teal/10 text-neon-teal border-neon-teal/20' :
                        model.color === 'neon-purple' ? 'bg-neon-purple/10 text-neon-purple border-neon-purple/20' :
                        'bg-neon-green/10 text-neon-green border-neon-green/20'
                      }`}>
                        {model.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {responses[model.id] && <CopyButton text={responses[model.id]} />}
                        {!responses[model.id] && isSending && (
                          <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 text-sm text-white/80 whitespace-pre-wrap overflow-y-auto max-h-[300px] custom-scrollbar">
                      {responses[model.id] || (isSending ? 'Thinking...' : '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="max-w-4xl mx-auto relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Enter your prompt to run across all models..."
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-4 pr-14 focus:outline-none focus:border-neon-purple/50 transition-colors resize-none h-20"
            />
            <button
              onClick={handleSend}
              disabled={isSending || !input.trim()}
              className="absolute right-3 bottom-3 p-3 bg-gradient-to-r from-neon-purple to-neon-teal rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-center text-[10px] text-white/30 mt-2">
            AI ka Thanos may provide different perspectives. Always verify important information.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
