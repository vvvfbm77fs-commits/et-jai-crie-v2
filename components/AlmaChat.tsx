'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Lightbulb, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AlmaChatProps {
  userName?: string;
  context?: 'funeral' | 'living_story' | 'object_memory';
  onSuggestion?: (suggestion: string) => void;
  genre?: 'Elle' | 'Il' | 'Sans genre spécifié';
}

const ADJECTIVE_MAPPING: Record<string, { m: string, f: string, n: string }> = {
  'discret·e': { m: 'Il était discret', f: 'Elle était discrète', n: 'C\'était quelqu\'un de discret' },
  'généreux·se': { m: 'Il était généreux', f: 'Elle était généreuse', n: 'C\'était quelqu\'un de généreux' },
  'drôle': { m: 'Il était très drôle', f: 'Elle était très drôle', n: 'C\'était quelqu\'un de très drôle' },
  'engagé·e': { m: 'Il était engagé', f: 'Elle était engagée', n: 'C\'était quelqu\'un d\'engagé' },
  'réservé·e': { m: 'Il était réservé', f: 'Elle était réservée', n: 'C\'était quelqu\'un de réservé' },
  'passionné·e': { m: 'Il était passionné', f: 'Elle était passionnée', n: 'C\'était quelqu\'un de passionné' },
  'libre': { m: 'Il était libre', f: 'Elle était libre', n: 'C\'était un esprit libre' },
  'protecteur·rice': { m: 'Il était protecteur', f: 'Elle était protectrice', n: 'C\'était quelqu\'un de protecteur' },
  'créatif·ve': { m: 'Il était créatif', f: 'Elle était créative', n: 'C\'était quelqu\'un de créatif' },
  'pragmatique': { m: 'Il était pragmatique', f: 'Elle était pragmatique', n: 'C\'était quelqu\'un de pragmatique' },
  'curieux·se': { m: 'Il était curieux', f: 'Elle était curieuse', n: 'C\'était quelqu\'un de curieux' },
  'patient·e': { m: 'Il était patient', f: 'Elle était patiente', n: 'C\'était quelqu\'un de patient' },
  'exigeant·e': { m: 'Il était exigeant', f: 'Elle était exigeante', n: 'C\'était quelqu\'un d\'exigeant' },
  'tendre': { m: 'Il était tendre', f: 'Elle était tendre', n: 'C\'était quelqu\'un de tendre' },
  'entier·e': { m: 'Il était entier', f: 'Elle était entière', n: 'C\'était quelqu\'un d\'entier' },
  'solaire': { m: 'Il était solaire', f: 'Elle était solaire', n: 'C\'était une personnalité solaire' },
  'pudique': { m: 'Il était pudique', f: 'Elle était pudique', n: 'C\'était quelqu\'un de pudique' },
  'audacieux·se': { m: 'Il était audacieux', f: 'Elle était audacieuse', n: 'C\'était quelqu\'un d\'audacieux' },
  'calme': { m: 'Il était calme', f: 'Elle était calme', n: 'C\'était quelqu\'un de calme' },
  'énergique': { m: 'Il était énergique', f: 'Elle était énergique', n: 'C\'était quelqu\'un d\'énergique' },
  'rassurant·e': { m: 'Il était rassurant', f: 'Elle était rassurante', n: 'C\'était quelqu\'un de rassurant' },
  'indépendant·e': { m: 'Il était indépendant', f: 'Elle était indépendante', n: 'C\'était quelqu\'un d\'indépendant' },
};

export default function AlmaChat({ userName = 'Aline', context = 'funeral', genre, onSuggestion }: AlmaChatProps) {
  // ... keys ...

  // Helper to get suggestions
  const getSuggestions = () => {
    const isFem = genre === 'Elle';
    const isMasc = genre === 'Il';
    const genderKey = isFem ? 'f' : isMasc ? 'm' : 'n';

    const adjectifs = Object.values(ADJECTIVE_MAPPING).map(v => v[genderKey]);

    // ... values ...
    const subject = isFem ? 'Elle' : isMasc ? 'Il' : 'Cette personne';
    const object = isFem ? 'elle' : isMasc ? 'lui' : 'elle/lui';
    const possessif = isFem ? 'son/sa' : isMasc ? 'son/sa' : 'son/sa'; // French possessives depend on the object, not the subject, mostly.

    return {
      adjectifs,
      valeurs: ["La famille avant tout", "La valeur travail", "L'honnêteté", "La fidélité en amitié", "Le respect des autres", "La transmission", "La simplicité", "La justice", "L'entraide"].map(v => `Pour ${object}, c'était important : ${v}`),
      passions: ["La musique", "Les voyages", "Jardiner", "Cuisiner pour les autres", "La lecture", "La nature", "La mer", "La montagne", "Bricoler", "Les animaux", "L'histoire", "Le cinéma"].map(v => `${subject} aimait passionnément ${v.toLowerCase()}`),
      souvenirs: ["Il/Elle avait toujours une blague", "Son rire était contagieux", "Ses expressions cultes", "Les repas de famille", "Nos vacances ensemble"].map(v => {
        let s = v;
        if (isFem) s = s.replace('Il/Elle', 'Elle').replace('Il', 'Elle');
        else if (isMasc) s = s.replace('Il/Elle', 'Il');
        else s = s.replace('Il/Elle', 'Cette personne');
        return `Je me souviens de ça : ${s}`;
      })
    };
  };

  const suggestions = getSuggestions();

  const [messages, setMessages] = useState<Message[]>(() => {
    // Charger la conversation sauvegardée au démarrage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`almaConversation_${context}`); // Save per context
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

    let initialContent = `Bonjour ${userName}. Je suis Alma. `;
    switch (context) {
      case 'living_story':
        initialContent += "Je suis là pour vous aider à raconter votre histoire ou celle d'un proche. Par quel souvenir aimeriez-vous commencer ?";
        break;
      case 'object_memory':
        initialContent += "Je suis là pour révéler l'histoire de cet objet. Dîtes-moi, quel est cet objet et d'où vient-il ?";
        break;
      case 'funeral':
      default:
        initialContent += "Ici, vous pouvez parler de la personne qui compte pour vous, à votre rythme. Par où aimeriez-vous commencer ?";
        break;
    }

    return [
      {
        role: 'assistant',
        content: initialContent,
        timestamp: new Date(),
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
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
      localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
        localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
        localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
      localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
          localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
      localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
          localStorage.setItem(`almaConversation_${context}`, JSON.stringify(newMessages));
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
        Alma est là pour vous écouter. Cliquez sur les suggestions pour enrichir le récit instantanément.
      </div>

      <div className="flex-1 flex overflow-hidden min-h-[calc(100vh-120px)] relative">
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

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileSuggestions(!showMobileSuggestions)}
                className="md:hidden p-2 text-memoir-gold hover:bg-memoir-gold/10 rounded-full transition-colors"
                title="Inspiration"
              >
                <Lightbulb className="w-5 h-5" />
              </button>
              <button
                onClick={() => window.location.href = '/questionnaire'}
                className="hidden sm:block text-xs text-memoir-blue/60 hover:text-memoir-gold underline transition-colors"
              >
                Passer au questionnaire classique
              </button>
            </div>
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

        {/* Sidebar Contextuelle (1/3) - Overlay on mobile */}
        <div className={`
          bg-memoir-bg border-l border-memoir-gold/10 overflow-y-auto custom-scrollbar
          md:w-1/3 md:block md:static md:p-6
          ${showMobileSuggestions ? 'absolute inset-0 z-20 w-full block p-6' : 'hidden'}
        `}>
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-memoir-blue mb-1 flex items-center gap-2 font-serif italic">
                ✨ Boîte à inspiration
              </h3>
              <p className="text-xs text-memoir-blue/50">
                Cliquez pour envoyer directement l'idée à Alma.
              </p>
            </div>
            <button
              onClick={() => setShowMobileSuggestions(false)}
              className="md:hidden p-1 text-memoir-blue/50 hover:text-memoir-blue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 pb-20">
            {/* 1. Identité & Caractère */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Sa nature profonde</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.adjectifs.map((phrase, i) => (
                  <button key={i} onClick={() => handleQuickSend(phrase)} className={QUICK_TAG_CLASS}>
                    {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Valeurs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Ses valeurs</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.valeurs.map((phrase, i) => (
                  <button key={i} onClick={() => handleQuickSend(phrase)} className={QUICK_TAG_CLASS}>
                    {phrase.split(': ')[1] || phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Passions & Goûts */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Ses amours</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.passions.map((phrase, i) => (
                  <button key={i} onClick={() => handleQuickSend(phrase)} className={QUICK_TAG_CLASS}>
                    {phrase.replace(/.*aimait passionnément /, '')}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Humour & Souvenirs */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-memoir-gold uppercase tracking-widest pl-1">Sourires & Anecdotes</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.souvenirs.map((phrase, i) => (
                  <button key={i} onClick={() => handleQuickSend(phrase)} className={QUICK_TAG_CLASS}>
                    {phrase.replace('Je me souviens de ça : ', '')}
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
