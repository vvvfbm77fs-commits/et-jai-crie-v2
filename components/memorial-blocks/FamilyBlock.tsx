'use client';

import { Users } from 'lucide-react';

interface FamilyBlockProps {
    template: any;
    isLightBg: boolean;
}

export default function FamilyBlock({ template, isLightBg }: FamilyBlockProps) {
    return (
        <div
            className="rounded-xl shadow p-8 text-center"
            style={{
                backgroundColor: isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${template.colors.accent}20`
            }}
        >
            <div className="flex justify-center mb-6">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${template.colors.accent}15`, color: template.colors.accent }}
                >
                    <Users className="w-8 h-8" />
                </div>
            </div>

            <h3
                className="text-2xl font-bold mb-4"
                style={{ color: template.colors.text }}
            >
                Arbre Généalogique
            </h3>

            <p className="text-lg italic opacity-70 leading-relaxed mb-6" style={{ color: template.colors.text }}>
                L'histoire se transmet de génération en génération.
                Une lignée de souvenirs qui unit le passé et le futur.
            </p>

            <div className="inline-block px-4 py-2 rounded-full border text-sm opacity-50" style={{ borderColor: template.colors.accent, color: template.colors.text }}>
                L'arbre est en cours de construction
            </div>
        </div>
    );
}
