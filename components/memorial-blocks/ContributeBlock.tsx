'use client';

import { MessageSquare, Heart, Camera } from 'lucide-react';

interface ContributeBlockProps {
    template: any;
    isLightBg: boolean;
}

export default function ContributeBlock({ template, isLightBg }: ContributeBlockProps) {
    return (
        <div
            className="rounded-2xl p-8 border-2 border-dashed transition-all hover:bg-black/5"
            style={{
                borderColor: `${template.colors.accent}40`,
                backgroundColor: isLightBg ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)'
            }}
        >
            <div className="flex flex-col items-center text-center max-w-lg mx-auto">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${template.colors.accent}15`, color: template.colors.accent }}
                >
                    <MessageSquare className="w-8 h-8" />
                </div>

                <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: template.colors.text }}
                >
                    Contribuer à cet hommage
                </h3>

                <p className="text-lg italic opacity-70 mb-8" style={{ color: template.colors.text }}>
                    Partagez un souvenir, une photo ou un mot doux pour honorer sa mémoire.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
                        style={{
                            backgroundColor: template.colors.accent,
                            color: isLightBg ? '#fff' : template.colors.bg
                        }}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Laissez un message
                    </button>

                    <button
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 border-2"
                        style={{
                            borderColor: template.colors.accent,
                            color: template.colors.accent
                        }}
                    >
                        <Camera className="w-4 h-4" />
                        Ajouter une photo
                    </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs opacity-50 uppercase tracking-widest" style={{ color: template.colors.text }}>
                    <Heart className="w-3 h-3 fill-current" />
                    Espace de bienveillance
                </div>
            </div>
        </div>
    );
}
