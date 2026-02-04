'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function InvitePage() {
    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [memorialName, setMemorialName] = useState('Marie Dubois');

    useEffect(() => {
        // Simulate token validation
        setTimeout(() => {
            setValid(true);
            setLoading(false);
        }, 1000);
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F2A44] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#C9A24D] animate-spin mx-auto mb-4" />
                    <p className="text-[#C9A24D] text-lg">Vérification de votre invitation...</p>
                </div>
            </div>
        );
    }

    if (!valid) {
        return (
            <div className="min-h-screen bg-[#0F2A44] flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl p-8 max-w-md text-center">
                    <p className="text-2xl mb-4">❌</p>
                    <h1 className="text-2xl text-[#0F2A44] mb-4 font-medium">Invitation invalide</h1>
                    <p className="text-gray-600 mb-6">
                        Ce lien d'invitation n'est plus valide ou a expiré.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-[#C9A24D] text-[#0F2A44] rounded-lg hover:bg-[#E1C97A] transition-colors"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F2A44] to-[#1C3B5A] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl w-full shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.jpg" alt="Et j'ai crié" className="w-20 h-20 rounded-full mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Vous êtes invité
                    </h1>
                    <p className="text-xl text-gray-600">
                        à contribuer au mémorial de
                    </p>
                    <p className="text-2xl text-[#C9A24D] mt-2 font-medium" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        {memorialName}
                    </p>
                </div>

                {/* Message */}
                <div className="bg-[#F5F4F2] rounded-xl p-6 mb-8">
                    <p className="text-gray-700 leading-relaxed italic">
                        Votre témoignage est précieux. Partagez vos souvenirs, vos anecdotes, ce qui rendait cette
                        personne unique à vos yeux. Votre contribution sera intégrée dans le mémorial final.
                    </p>
                </div>

                {/* Selection */}
                <div className="mb-8">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-4 text-center">
                        Comment souhaitez-vous contribuer ?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Alma */}
                        <button
                            onClick={() => router.push('/alma')}
                            className="group p-6 border-2 border-[#C9A24D]/30 rounded-xl hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all text-left"
                        >
                            <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A24D]/20 transition-colors">
                                <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="text-lg font-medium text-[#0F2A44] mb-2">Avec Alma</h3>
                            <p className="text-sm text-gray-600">
                                Conversation guidée avec notre IA bienveillante
                            </p>
                        </button>

                        {/* Questionnaire */}
                        <button
                            onClick={() => router.push('/questionnaire')}
                            className="group p-6 border-2 border-[#C9A24D]/30 rounded-xl hover:border-[#C9A24D] hover:bg-[#C9A24D]/5 transition-all text-left"
                        >
                            <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C9A24D]/20 transition-colors">
                                <span className="text-3xl">📝</span>
                            </div>
                            <h3 className="text-lg font-medium text-[#0F2A44] mb-2">Questionnaire</h3>
                            <p className="text-sm text-gray-600">
                                Répondez à des questions structurées à votre rythme
                            </p>
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="text-center text-sm text-gray-500">
                    <p>Temps estimé : 15-30 minutes</p>
                    <p className="mt-1">Vous pourrez sauvegarder et reprendre plus tard</p>
                </div>
            </div>
        </div>
    );
}
