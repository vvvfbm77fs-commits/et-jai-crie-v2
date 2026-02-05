'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

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
    // Track actions independently
    const [userActions, setUserActions] = useState<{ candle: boolean; flower: boolean }>({
        candle: false,
        flower: false
    });
    const [animating, setAnimating] = useState<'candle' | 'flower' | null>(null);

    useEffect(() => {
        const savedCandles = localStorage.getItem(`candles-${memorialId}`);
        if (savedCandles) setCandles(parseInt(savedCandles, 10));

        const savedFlowers = localStorage.getItem(`flowers-${memorialId}`);
        if (savedFlowers) setFlowers(parseInt(savedFlowers, 10));

        const actionCandle = localStorage.getItem(`user-action-candle-${memorialId}`);
        const actionFlower = localStorage.getItem(`user-action-flower-${memorialId}`);

        setUserActions({
            candle: !!actionCandle,
            flower: !!actionFlower
        });
    }, [memorialId]);

    const handleAction = (type: 'candle' | 'flower') => {
        if (userActions[type]) return; // Already done this specific action

        setAnimating(type);

        if (type === 'candle') {
            const newVal = candles + 1;
            setCandles(newVal);
            localStorage.setItem(`candles-${memorialId}`, newVal.toString());
            localStorage.setItem(`user-action-candle-${memorialId}`, 'true');
        } else {
            const newVal = flowers + 1;
            setFlowers(newVal);
            localStorage.setItem(`flowers-${memorialId}`, newVal.toString());
            localStorage.setItem(`user-action-flower-${memorialId}`, 'true');
        }

        setUserActions(prev => ({ ...prev, [type]: true }));
        setTimeout(() => setAnimating(null), 1500);
    };

    const isLight = bgColor === '#FFFFFF' || bgColor.includes('#F');

    return (
        <div
            className="rounded-2xl shadow-xl p-8 md:p-12 text-center border border-white/10 backdrop-blur-sm relative overflow-hidden transition-all duration-700 hover:shadow-2xl"
            style={{
                backgroundColor: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(20, 20, 30, 0.4)',
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

            <div className="flex flex-col md:flex-row gap-12 justify-center items-center my-8">
                {/* CANDLE */}
                <button
                    onClick={() => handleAction('candle')}
                    disabled={userActions.candle}
                    className="group relative flex flex-col items-center gap-4 transition-transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-90"
                >
                    <div className={`relative w-28 h-28 flex items-center justify-center rounded-full transition-all duration-500 overflow-hidden bg-white border-4 ${userActions.candle ? 'border-orange-100 shadow-[0_0_40px_rgba(255,165,0,0.4)]' : 'border-transparent shadow-sm group-hover:shadow-md'
                        }`}>
                        <img
                            src="/icons/candle.png"
                            alt="Allumer une bougie"
                            className={`w-full h-full object-cover transition-all duration-700 ${userActions.candle ? 'scale-110 opacity-100' : 'opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                        />

                        {/* Burst effect on click */}
                        {animating === 'candle' && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-orange-200/50" />
                        )}
                    </div>
                    <div className="text-center">
                        <span className={`text-3xl font-light block transition-colors ${userActions.candle ? 'text-orange-600' : 'text-gray-400'}`}>
                            {candles}
                        </span>
                        <span className="text-xs uppercase tracking-widest opacity-60" style={{ color: textColor }}>Bougies</span>
                    </div>
                </button>

                {/* FLOWER */}
                <button
                    onClick={() => handleAction('flower')}
                    disabled={userActions.flower}
                    className="group relative flex flex-col items-center gap-4 transition-transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-90"
                >
                    <div className={`relative w-28 h-28 flex items-center justify-center rounded-full transition-all duration-500 overflow-hidden bg-white border-4 ${userActions.flower ? 'border-pink-100 shadow-[0_0_40px_rgba(255,192,203,0.4)]' : 'border-transparent shadow-sm group-hover:shadow-md'
                        }`}>
                        <img
                            src="/icons/flower.png"
                            alt="Déposer une fleur"
                            className={`w-full h-full object-cover transition-all duration-700 ${userActions.flower ? 'scale-110 opacity-100' : 'opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}
                        />

                        {/* Burst effect on click */}
                        {animating === 'flower' && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-pink-200/50" />
                        )}
                    </div>
                    <div className="text-center">
                        <span className={`text-3xl font-light block transition-colors ${userActions.flower ? 'text-pink-600' : 'text-gray-400'}`}>
                            {flowers}
                        </span>
                        <span className="text-xs uppercase tracking-widest opacity-60" style={{ color: textColor }}>Fleurs</span>
                    </div>
                </button>
            </div>

            {/* Thank you message */}
            {(userActions.candle || userActions.flower) && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                        style={{ backgroundColor: `${accentColor}10`, color: accentColor }}>
                        <Sparkles className="w-3 h-3" />
                        Nous vous remercions pour votre pensée
                    </p>
                </div>
            )}

        </div>
    );
}
