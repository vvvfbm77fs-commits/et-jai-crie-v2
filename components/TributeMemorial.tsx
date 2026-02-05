'use client';

import { useState, useEffect } from 'react';
import { Flame, Flower, Sparkles } from 'lucide-react';

interface TributeMemorialProps {
    prenom: string;
    memorialId: string;
    accentColor: string;
    textColor: string;
    bgColor: string;
}

export default function TributeMemorial({ prenom, memorialId, accentColor, textColor, bgColor }: TributeMemorialProps) {
    const [candles, setCandles] = useState(0);
    const [flowers, setFlowers] = useState(0);
    const [userAction, setUserAction] = useState<'candle' | 'flower' | null>(null);
    const [animation, setAnimation] = useState<'candle' | 'flower' | null>(null);

    useEffect(() => {
        // Load counts
        const savedCandles = localStorage.getItem(`candles-${memorialId}`);
        if (savedCandles) setCandles(parseInt(savedCandles, 10));

        const savedFlowers = localStorage.getItem(`flowers-${memorialId}`);
        if (savedFlowers) setFlowers(parseInt(savedFlowers, 10));

        // Check if user already contributed
        const action = localStorage.getItem(`user-action-${memorialId}`);
        if (action === 'candle' || action === 'flower') setUserAction(action as any);
    }, [memorialId]);

    const handleAction = (type: 'candle' | 'flower') => {
        if (userAction) return;

        setAnimation(type);

        if (type === 'candle') {
            const newVal = candles + 1;
            setCandles(newVal);
            localStorage.setItem(`candles-${memorialId}`, newVal.toString());
        } else {
            const newVal = flowers + 1;
            setFlowers(newVal);
            localStorage.setItem(`flowers-${memorialId}`, newVal.toString());
        }

        localStorage.setItem(`user-action-${memorialId}`, type);
        setUserAction(type);

        setTimeout(() => setAnimation(null), 2000);
    };

    const isLight = bgColor === '#FFFFFF' || bgColor.includes('#F'); // Simple heuristic

    return (
        <div
            className="rounded-2xl shadow-xl p-8 md:p-12 text-center border border-white/10 backdrop-blur-sm relative overflow-hidden"
            style={{
                backgroundColor: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.2)',
                borderColor: `${accentColor}30`
            }}
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-memoir-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-memoir-blue/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <h3
                className="text-2xl md:text-3xl font-light mb-2"
                style={{ color: textColor, fontFamily: 'var(--font-heading)' }}
            >
                Rendre hommage
            </h3>
            <p className="text-sm opacity-70 mb-10 italic" style={{ color: textColor }}>
                en mémoire de {prenom}
            </p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">

                {/* Candle Action */}
                <div className="group relative">
                    <button
                        onClick={() => handleAction('candle')}
                        disabled={!!userAction}
                        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${animation === 'candle' ? 'scale-110 shadow-[0_0_30px_rgba(255,165,0,0.6)]' : 'hover:scale-105 hover:shadow-lg'
                            } ${userAction === 'candle' ? 'ring-2 ring-offset-2' : ''}`}
                        style={{
                            backgroundColor: isLight ? '#FFF' : 'rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderColor: accentColor
                        }}
                    >
                        {animation === 'candle' ? (
                            <div className="text-5xl animate-bounce">🕯️</div>
                        ) : (
                            <Flame
                                className={`w-10 h-10 transition-colors ${userAction === 'candle' ? 'text-orange-500 fill-orange-500' : 'text-gray-400 group-hover:text-orange-400'}`}
                                strokeWidth={1.5}
                            />
                        )}
                    </button>
                    <div className="mt-4">
                        <p className="text-2xl font-light" style={{ color: accentColor }}>{candles}</p>
                        <p className="text-xs uppercase tracking-widest opacity-60" style={{ color: textColor }}>Bougies</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-20 md:w-px md:h-20 bg-current opacity-20" style={{ color: textColor }} />

                {/* Flower Action */}
                <div className="group relative">
                    <button
                        onClick={() => handleAction('flower')}
                        disabled={!!userAction}
                        className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${animation === 'flower' ? 'scale-110 shadow-[0_0_30px_rgba(255,192,203,0.6)]' : 'hover:scale-105 hover:shadow-lg'
                            } ${userAction === 'flower' ? 'ring-2 ring-offset-2' : ''}`}
                        style={{
                            backgroundColor: isLight ? '#FFF' : 'rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderColor: accentColor
                        }}
                    >
                        {animation === 'flower' ? (
                            <div className="text-5xl animate-pulse">🌸</div>
                        ) : (
                            <Flower
                                className={`w-10 h-10 transition-colors ${userAction === 'flower' ? 'text-pink-500 fill-pink-500' : 'text-gray-400 group-hover:text-pink-400'}`}
                                strokeWidth={1.5}
                            />
                        )}
                    </button>
                    <div className="mt-4">
                        <p className="text-2xl font-light" style={{ color: accentColor }}>{flowers}</p>
                        <p className="text-xs uppercase tracking-widest opacity-60" style={{ color: textColor }}>Fleurs</p>
                    </div>
                </div>

            </div>

            {userAction && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                        style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
                        <Sparkles className="w-4 h-4" />
                        <span>Merci de votre hommage</span>
                    </div>
                </div>
            )}
        </div>
    );
}
