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
                    className="group relative flex flex-col items-center gap-4 transition-transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-80"
                >
                    <div className={`relative w-24 h-24 flex items-center justify-center rounded-full transition-all duration-500 ${userActions.candle ? 'bg-orange-50 shadow-[0_0_40px_rgba(255,165,0,0.3)]' : 'bg-black/5 hover:bg-orange-50/50'
                        }`}>
                        {/* Custom Candle SVG */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className={`transition-all duration-700 ${userActions.candle ? 'scale-110' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                            {/* Candle Body */}
                            <path d="M7 14V21C7 21.55 7.45 22 8 22H16C16.55 22 17 21.55 17 21V14H7Z" fill={userActions.candle ? "#E65100" : "#9E9E9E"} />
                            <path d="M7 14H17V15H7V14Z" fill={userActions.candle ? "#FFB74D" : "#BDBDBD"} />
                            {/* Flame - Animate if active */}
                            {(userActions.candle || animating === 'candle') && (
                                <path d="M12 2C12 2 8 8 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 8 12 2 12 2Z"
                                    className="animate-pulse origin-bottom"
                                    fill="#FF6D00"
                                    style={{ transformBox: 'fill-box', transformOrigin: 'center bottom', animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                                />
                            )}
                            {!userActions.candle && animating !== 'candle' && (
                                <path d="M12 2C12 2 8 8 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 8 12 2 12 2Z"
                                    fill="#9E9E9E"
                                />
                            )}
                        </svg>

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
                    className="group relative flex flex-col items-center gap-4 transition-transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-80"
                >
                    <div className={`relative w-24 h-24 flex items-center justify-center rounded-full transition-all duration-500 ${userActions.flower ? 'bg-pink-50 shadow-[0_0_40px_rgba(255,192,203,0.4)]' : 'bg-black/5 hover:bg-pink-50/50'
                        }`}>
                        {/* Custom Flower SVG */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className={`transition-all duration-700 ${userActions.flower ? 'scale-110' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                            <path d="M12 5.5C14 7 17 9 17 12C17 15 14 17 12 18.5C10 17 7 15 7 12C7 9 10 7 12 5.5Z" fill={userActions.flower ? "#C2185B" : "#BDBDBD"} />
                            <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.5" />
                            <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill={userActions.flower ? "#F48FB1" : "#E0E0E0"} />
                            <path d="M2 12C2 17.5228 6.47715 22 12 22V19C8.13401 19 5 15.866 5 12H2Z" fill={userActions.flower ? "#F48FB1" : "#E0E0E0"} />
                            <path d="M12 2C6.47715 2 2 6.47715 2 12H5C5 8.13401 8.13401 5 12 5V2Z" fill={userActions.flower ? "#F48FB1" : "#E0E0E0"} />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2V5C15.866 5 19 8.13401 19 12H22Z" fill={userActions.flower ? "#F48FB1" : "#E0E0E0"} />
                        </svg>

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
