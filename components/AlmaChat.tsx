'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AlmaChatProps {
  userName?: string;
  onSuggestion?: (suggestion: string) => void;
}

const QUICK_TAG_CLASS = "text-xs px-3 py-1.5 bg-white text-memoir-blue/80 rounded-lg border border-memoir-gold/10 hover:border-memoir-gold hover:text-memoir-gold transition-all text-left shadow-sm";

export default function AlmaChat({ userName = 'Aline', onSuggestion }: AlmaChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Charger la conversation sauvegardée au démarrage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('almaConversation');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        } catch (e) {
          console.error('Erreur chargement conversation ALMA');
        }
      }
    }

    return [
      {
        role: 'assistant',
        content: `Bonjour ${userName}. Je suis Alma. Ici, vous pouvez parler de la personne qui compte pour vous, à votre rythme. Par où aimeriez-vous commencer ?`,
        timestamp: new Date(),
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      localStorage.setItem('almaConversation', JSON.stringify(newMessages));
      return newMessages;
    });

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/alma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || "Je vous écoute. Continuez à me parler.",
        timestamp: new Date(),
      };

      setMessages(prev => {
        const newMessages = [...prev, assistantMessage];
        localStorage.setItem('almaConversation', JSON.stringify(newMessages));
        return newMessages;
      });

      if (assistantMessage.content.includes('Je vous redirige maintenant')) {
        setTimeout(() => {
          window.location.href = '/medias';
        }, 2000);
      }

      if (onSuggestion) {
        onSuggestion(assistantMessage.content);
      }

    } catch (error) {
      console.error('❌ Erreur ALMA:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Je suis désolée, une erreur s\'est produite. Pouvez-vous reformuler ?',
        timestamp: new Date(),
      };

      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        localStorage.setItem('almaConversation', JSON.stringify(newMessages));
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSend = (text: string) => {
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      localStorage.setItem('almaConversation', JSON.stringify(newMessages));
      return newMessages;
    });

    setInput('');
    setIsLoading(true);

    (async () => {
      try {
        const response = await fetch('/api/alma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            conversationHistory: [...messages, userMessage].map(m => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const data = await response.json();

        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };

        setMessages(prev => {
          const newMessages = [...prev, assistantMessage];
          localStorage.setItem('almaConversation', JSON.stringify(newMessages));
          return newMessages;
        });

        if (onSuggestion) onSuggestion(assistantMessage.content);

      } catch (error) {
        console.error('Erreur ALMA QuickSend:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFinish = async () => {
    const finishMessage: Message = {
      role: 'user',
      content: 'J\'ai fini, j\'ai donné assez d\'informations.',
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, finishMessage];
      localStorage.setItem('almaConversation', JSON.stringify(newMessages));
      return newMessages;
    });

    setInput('J\'ai fini, j\'ai donné assez d\'informations.');
    setIsLoading(true);

    try {
      const response = await fetch('/api/alma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'J\'ai fini, j\'ai donné assez d\'informations.',
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };

        setMessages(prev => {
          const newMessages = [...prev, assistantMessage];
          localStorage.setItem('almaConversation', JSON.stringify(newMessages));
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Erreur finale ALMA:', error);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      window.location.href = '/medias';
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Bandeau explicatif */}
      <div className="p-3 bg-memoir-bg text-memoir-blue text-xs text-center border-b border-memoir-gold/20 font-serif italic">
        Alma est là pour vous écouter. Cliquez sur les mots à droite pour enrichir le récit instantanément.
      </div>

      <div className="flex-1 flex overflow-hidden min-h-[calc(100vh-120px)]">
        {/* Chat Area (2/3) */}
        <div className="flex-1 flex flex-col border-r border-memoir-gold/10 bg-white md:w-2/3">
          {/* Header */}
          <div className="p-4 border-b border-memoir-gold/10 bg-memoir-bg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-memoir-blue/5 border border-memoir-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-memoir-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-memoir-blue font-serif">Alma</h3>
                <p className="text-xs text-memoir-blue/60">Votre biographe personnelle</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/questionnaire'}
              className="text-xs text-memoir-blue/60 hover:text-memoir-gold underline transition-colors"
            >
              Passer au questionnaire classique
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${message.role === 'user'
                    ? 'bg-memoir-blue text-white rounded-br-none'
                    : 'bg-gray-50 text-memoir-blue border border-memoir-gold/10 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed font-light">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-memoir-bg rounded-2xl px-4 py-3 border border-memoir-gold/10">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-memoir-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-memoir-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-memoir-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-memoir-gold/10 bg-white">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={handleFinish}
                className="whitespace-nowrap px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors border border-green-200 ml-auto"
              >
                ✓ J'ai tout dit
              </button>
            </div>

            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrivez librement..."
                disabled={isLoading}
                rows={2}
                className="flex-1 px-4 py-3 border border-memoir-gold/20 rounded-xl focus:border-memoir-gold focus:outline-none resize-none text-sm text-memoir-blue bg-memoir-bg/30 placeholder:text-memoir-blue/30"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 bg-memoir-gold text-white rounded-xl hover:bg-memoir-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Contextuelle (1/3) */}
        < div className="w-1/3 bg-memoir-bg p-6 border-l border-memoir-gold/10 hidden md:block overflow-y-auto custom-scrollbar" >
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-memoir-blue mb-1 flex items-center gap-2 font-serif italic">
              ✨ Boîte à inspiration
            </h3>
            <p className="text-xs text-memoir-blue/50">
              Cliquez pour envoyer directement l'idée à Alma.
            </p>
          </div>

          <div className="space-y-6 pb-20">
            {/* 1. Identité & Caractère */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Sa nature profonde</h4>
              <div className="flex flex-wrap gap-2">
                {["Il était solaire", "Elle était discrète", "Une force de la nature", "Toujours optimiste", "Un caractère entier", "La générosité même", "Un pilier pour nous", "Quelqu'un de sage", "Un esprit libre", "Très protecteur", "Une grande sensibilité"].map(phrase => (
                  <button key={phrase} onClick={() => handleQuickSend(phrase)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Valeurs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Ses valeurs</h4>
              <div className="flex flex-wrap gap-2">
                {["La famille avant tout", "La valeur travail", "L'honnêteté", "La fidélité en amitié", "Le respect des autres", "La transmission", "La simplicité", "La justice", "L'entraide"].map(phrase => (
                  <button key={phrase} onClick={() => handleQuickSend(`Pour lui/elle, c'était important : ${phrase}`)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Passions & Goûts */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Ses amours</h4>
              <div className="flex flex-wrap gap-2">
                {["La musique", "Les voyages", "Jardiner", "Cuisiner pour les autres", "La lecture", "La nature", "La mer", "La montagne", "Bricoler", "Les animaux", "L'histoire", "Le cinéma"].map(theme => (
                  <button key={theme} onClick={() => handleQuickSend(`Il/Elle aimait passionnément ${theme.toLowerCase()}`)} className={QUICK_TAG_CLASS}>
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Humour & Souvenirs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Sourires & Anecdotes</h4>
              <div className="flex flex-wrap gap-2">
                {["Il avait toujours une blague", "Son rire était contagieux", "Il faisait des bêtises drôles", "Ses expressions cultes", "Les repas de famille", "Nos vacances ensemble", "Les fêtes de Noël"].map(phrase => (
                  <button key={phrase} onClick={() => handleQuickSend(`Je me souviens de ça : ${phrase}`)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Parcours de vie */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Son parcours</h4>
              <div className="flex flex-wrap gap-2">
                {["Son métier était sa passion", "Il a beaucoup voyagé", "Il est parti de rien", "Une vie de labeur", "Ses engagements associatifs", "Sa réussite professionnelle", "Les épreuves traversées"].map(phrase => (
                  <button key={phrase} onClick={() => handleQuickSend(`À propos de son parcours : ${phrase}`)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Liens */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Nos liens</h4>
              <div className="flex flex-wrap gap-2">
                {["Une grande complicité", "Mon meilleur ami", "Un guide pour moi", "On se disait tout", "Des hauts et des bas", "Un amour inconditionnel"].map(phrase => (
                  <button key={phrase} onClick={() => handleQuickSend(`Notre relation c'était : ${phrase}`)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div >
      </div >


    </div >
  );
}
