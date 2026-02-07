'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Lock, ChevronRight, Gift, Smartphone, Layout, Mic } from 'lucide-react';
import { QuestionnaireData } from '@/lib/schema';

function TeaserContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const context = searchParams.get('context') || 'funeral';

    const [data, setData] = useState<Partial<QuestionnaireData> | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(`questionnaire-memoire-${context}`);
        if (saved) {
            setData(JSON.parse(saved));
        }
    }, [context]);

    const handlePayment = (plan: string) => {
        // Simulation de paiement
        // TODO: Intégrer Stripe ici
        alert(`Paiement de l'offre ${plan} simulé avec succès !`);
        // Redirection vers le questionnaire complet (mode premium)
        router.push(`/create/questionnaire?context=${context}&premium=true`);
    };

    if (!data) return <div className="min-h-screen flex items-center justify-center bg-memoir-bg">Chargement de votre aperçu...</div>;

    const prenom = data.identite?.prenom || 'Nom Inconnu';
    const resume = data.resume || 'Un début d\'histoire...';
    const style = data.style || 'votre style';

    return (
        <div className="min-h-screen bg-memoir-bg py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-memoir-gold/10 text-memoir-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        Aperçu gratuit
                    </span>
                    <h1 className="text-3xl md:text-5xl font-serif italic text-memoir-blue mb-4">
                        Le mémorial de {prenom} prend forme.
                    </h1>
                    <p className="text-memoir-blue/60 text-lg">
                        Vous avez posé les fondations. Il ne reste plus qu'à écrire la suite.
                    </p>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-memoir-gold/20 mb-16 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="w-24 h-24 bg-memoir-bg rounded-full mx-auto flex items-center justify-center text-memoir-blue text-4xl font-serif italic">
                            {prenom[0]}
                        </div>
                        <h2 className="text-2xl font-serif text-memoir-blue">Une vie, une histoire</h2>
                        <div className="text-left bg-memoir-bg/50 p-6 rounded-2xl relative">
                            <p className="text-memoir-blue/80 italic mb-4">"{resume}"</p>
                            <p className="text-memoir-blue/60 text-sm">
                                C'est ici que l'histoire commencera. Avec vos mots, vos souvenirs, et le style <strong>{style}</strong> que vous avez choisi...
                            </p>

                            {/* Blur effect for locked content */}
                            <div className="mt-4 space-y-3 opacity-30 select-none blur-[2px]">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-6">
                                <div className="flex items-center gap-2 text-memoir-gold font-bold uppercase tracking-widest text-xs bg-white px-4 py-2 rounded-full shadow-sm border border-memoir-gold/20">
                                    <Lock className="w-3 h-3" />
                                    Lecture réservée
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Pricing Plans based on Context */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold text-memoir-blue mb-8">Votre formule</h2>

                    <div className="flex justify-center">
                        {/* Single Primary Plan based on context */}
                        {(context === 'object_memory') ? (
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-memoir-gold/20 max-w-md w-full relative overflow-hidden group hover:scale-105 transition-transform">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-memoir-gold to-memoir-neon" />
                                <h3 className="text-2xl font-serif italic text-memoir-blue mb-2">Mémoire d'Objet</h3>
                                <div className="text-5xl font-serif text-memoir-gold mb-2">49€</div>
                                <p className="text-memoir-blue/60 text-sm mb-6 uppercase tracking-widest font-bold">Paiement unique</p>

                                <ul className="space-y-4 text-left text-memoir-blue/70 mb-8 px-4">
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Espace sécurisé à vie</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Récit rédigé par Alma</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Puce NFC incluse (Ø25mm)</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Galerie photos</span></li>
                                </ul>
                                <button onClick={() => handlePayment('objet_49')} className="w-full py-4 bg-memoir-gold text-white font-bold rounded-xl hover:bg-memoir-gold/90 transition-colors shadow-lg shadow-memoir-gold/20">
                                    Débloquer mon mémorial
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-memoir-blue/10 max-w-md w-full relative overflow-hidden group hover:scale-105 transition-transform">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-memoir-blue to-memoir-neon" />
                                <h3 className="text-2xl font-serif italic text-memoir-blue mb-2">{context === 'celebration' ? 'Hommage Vivant' : 'Mémorial en Ligne'}</h3>
                                <div className="text-5xl font-serif text-memoir-blue mb-2">79€</div>
                                <p className="text-memoir-blue/60 text-sm mb-6 uppercase tracking-widest font-bold">Paiement unique</p>

                                <ul className="space-y-4 text-left text-memoir-blue/70 mb-8 px-4">
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Espace dédié à vie</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Biographie assistée par IA</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Contributions illimitées</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-memoir-gold shrink-0" /> <span>Plaque QR Code offerte</span></li>
                                </ul>
                                <button onClick={() => handlePayment('personne_79')} className="w-full py-4 bg-memoir-blue text-white font-bold rounded-xl hover:bg-memoir-blue/90 transition-colors shadow-lg shadow-memoir-blue/20">
                                    Créer ce mémorial
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center text-memoir-blue/40 text-sm">
                    Paiement sécurisé via Stripe. Satisfait ou remboursé sous 14 jours.
                </div>
            </div>
        </div>
    );
}

export default function TeaserPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <TeaserContent />
        </Suspense>
    );
}
