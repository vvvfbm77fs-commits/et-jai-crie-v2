'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Sparkles, PenTool, Lock } from 'lucide-react';

export default function MethodChoice() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'honorer'; // feter, transmettre, honorer
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // Redirect if not logged in
                const returnUrl = encodeURIComponent(`/create/method?type=${type}`);
                router.push(`/login?returnUrl=${returnUrl}`);
                return;
            }
            setUser(user);
            setLoading(false);
        };
        checkAuth();
    }, [router, type]);

    const handleChoice = async (method: 'questionnaire' | 'alma' | 'libre') => {
        if (!user) return;
        setCreating(method);

        try {
            // Create Memory
            const { data: memory, error } = await supabase
                .from('memories')
                .insert({
                    user_id: user.id,
                    // email: user.email, // Assume user_id links to email
                    context: type, // context_type in prompt, using 'context' to match existing schema if set
                    payment_status: 'pending',
                    status: 'draft'
                })
                .select('id')
                .single();

            if (error) throw error;
            if (!memory) throw new Error('Failed to create');

            // Redirect
            if (method === 'questionnaire') {
                router.push(`/create?memoryId=${memory.id}`); // Standard flow
            } else if (method === 'libre') {
                router.push(`/create/libre?memoryId=${memory.id}`);
            }
        } catch (e) {
            console.error(e);
            alert('Une erreur est survenue.');
            setCreating(null);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">Chargement...</div>;

    const titles = {
        feter: 'Vous vous apprêtez à célébrer quelqu\'un de vivant',
        transmettre: 'Vous vous apprêtez à transmettre une mémoire',
        honorer: 'Vous vous apprêtez à honorer une mémoire'
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A2E] mb-4">
                        Comment souhaitez-vous raconter cette histoire ?
                    </h1>
                    <p className="text-[#D4AF37] font-medium tracking-wide">
                        {titles[type as keyof typeof titles]}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1: Questionnaire */}
                    <div
                        onClick={() => handleChoice('questionnaire')}
                        className="group relative bg-white rounded-2xl shadow-sm border border-stone-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden ring-1 ring-transparent hover:ring-[#D4AF37]/20"
                    >
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                            Recommandé
                        </div>
                        <div className="w-12 h-12 bg-[#FDFBF7] rounded-[14px] flex items-center justify-center mb-6 text-[#1A1A2E] group-hover:bg-[#1A1A2E] group-hover:text-[#D4AF37] transition-colors">
                            <Edit2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Répondre à un questionnaire</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                            Guidé, structuré, rapide. Questions simples et progressives. Idéal si vous voulez un cadre.
                        </p>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2 group-hover:gap-3 transition-all">
                            Choisir cette méthode →
                        </div>
                        {creating === 'questionnaire' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>

                    {/* CARD 2: Alma */}
                    <div className="opacity-60 bg-stone-50 rounded-2xl border border-stone-200 p-8 relative cursor-not-allowed">
                        <div className="absolute top-4 right-4 text-stone-400">
                            <Lock className="w-4 h-4" />
                        </div>
                        <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center mb-6 text-stone-400">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-lg font-bold text-stone-400">Conversation avec Alma</h3>
                            <span className="bg-stone-200 text-stone-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Bientôt</span>
                        </div>
                        <p className="text-sm text-stone-400 mb-6 leading-relaxed">
                            Naturel, accompagné, personnel. Notre IA vous guide dans une conversation naturelle.
                        </p>
                        <button disabled className="w-full py-3 bg-stone-200 text-stone-400 rounded-lg text-xs font-bold uppercase tracking-widest">
                            Bientôt disponible
                        </button>
                    </div>

                    {/* CARD 3: Libre */}
                    <div
                        onClick={() => handleChoice('libre')}
                        className="group bg-white rounded-2xl shadow-sm border border-stone-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-[#FDFBF7] rounded-[14px] flex items-center justify-center mb-6 text-[#1A1A2E] group-hover:bg-[#1A1A2E] group-hover:text-white transition-colors">
                            <PenTool className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Écrire librement</h3>
                        <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                            Créatif, personnel, sans limite. Écrivez à votre façon, aucune contrainte.
                        </p>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#1A1A2E] flex items-center gap-2 group-hover:gap-3 transition-all">
                            Choisir cette méthode →
                        </div>
                        {creating === 'libre' && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin"></div></div>}
                    </div>

                </div>

                <div className="text-center mt-12">
                    <button onClick={() => router.push('/')} className="text-sm text-stone-400 hover:text-[#1A1A2E] underline decoration-stone-300">
                        ← Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
}
