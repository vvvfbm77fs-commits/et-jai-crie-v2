'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, FileText, PenTool, ChevronLeft, Sparkles, User, PenLine } from 'lucide-react';

function MethodSelectionContent() {
    const searchParams = useSearchParams();
    const context = searchParams.get('context') || 'funeral';

    const getTitle = () => {
        switch (context) {
            case 'celebration': return 'Comment souhaitez-vous fêter cette personne ?';
            case 'heritage': return 'Comment souhaitez-vous transmettre cette mémoire ?';
            case 'funeral': return 'Comment souhaitez-vous honorer cette mémoire ?';
            default: return 'Comment souhaitez-vous raconter cette histoire ?';
        }
    };

    const getSubtitle = () => {
        switch (context) {
            case 'celebration': return 'Choisissez la méthode qui vous inspire le plus pour célébrer.';
            case 'heritage': return 'Trois façons de raconter l\'histoire d\'un objet, d\'un lieu ou d\'une vie.';
            case 'funeral': return 'Prenez le temps de choisir ce qui vous apaise le plus.';
            default: return 'Choisissez la méthode qui vous convient le mieux.';
        }
    }

    return (
        <div className="min-h-screen bg-memoir-bg py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center text-memoir-blue/40 hover:text-memoir-blue transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Retour à l'accueil
                    </Link>
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <div className="w-16 h-1 bg-memoir-gold/30 mx-auto rounded-full mb-6"></div>
                        <h1 className="text-3xl md:text-5xl font-serif italic text-memoir-blue leading-tight">
                            {getTitle()}
                        </h1>
                        <p className="text-memoir-blue/60 text-lg font-light">
                            {getSubtitle()}
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

                    {/* Card 1: Alma */}
                    <Link
                        href={`/create/alma?context=${context}`}
                        className="group relative bg-white rounded-[32px] p-8 border border-memoir-gold/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                            <Sparkles className="w-24 h-24 text-memoir-gold" />
                        </div>

                        <div className="w-16 h-16 bg-memoir-bg rounded-2xl flex items-center justify-center text-memoir-gold mb-6 group-hover:bg-memoir-gold group-hover:text-white transition-colors">
                            <MessageCircle className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-serif italic text-memoir-blue mb-3">Raconter avec Alma</h3>
                        <p className="text-memoir-blue/60 text-sm leading-relaxed mb-6 flex-grow">
                            Une conversation guidée avec notre IA. Elle vous pose les bonnes questions pour construire le récit sans effort.
                        </p>

                        <div className="pt-6 border-t border-memoir-blue/5">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-memoir-gold">
                                <span>Durée : 5-10 min</span>
                                <span className="bg-memoir-gold/10 px-2 py-1 rounded">Guidé</span>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Questionnaire */}
                    <Link
                        href={`/create/questionnaire?context=${context}`}
                        className="group relative bg-white rounded-[32px] p-8 border border-memoir-blue/5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity">
                            <FileText className="w-24 h-24 text-memoir-blue" />
                        </div>

                        <div className="w-16 h-16 bg-memoir-bg rounded-2xl flex items-center justify-center text-memoir-blue mb-6 group-hover:bg-memoir-blue group-hover:text-white transition-colors">
                            <User className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-serif italic text-memoir-blue mb-3">Répondre à un questionnaire</h3>
                        <p className="text-memoir-blue/60 text-sm leading-relaxed mb-6 flex-grow">
                            Quelques questions simples et structurées pour aller à l'essentiel. Idéal si vous savez déjà quoi dire.
                        </p>

                        <div className="pt-6 border-t border-memoir-blue/5">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-memoir-blue/60 group-hover:text-memoir-blue transition-colors">
                                <span>Durée : 3-5 min</span>
                                <span className="bg-memoir-blue/5 px-2 py-1 rounded">Structuré</span>
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: Free Write */}
                    <Link
                        href={`/create/libre?context=${context}`}
                        className="group relative bg-white rounded-[32px] p-8 border border-memoir-blue/5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity">
                            <PenLine className="w-24 h-24 text-memoir-blue" />
                        </div>

                        <div className="w-16 h-16 bg-memoir-bg rounded-2xl flex items-center justify-center text-memoir-blue/60 mb-6 group-hover:bg-memoir-blue/60 group-hover:text-white transition-colors">
                            <PenTool className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-serif italic text-memoir-blue mb-3">Écrire librement</h3>
                        <p className="text-memoir-blue/60 text-sm leading-relaxed mb-6 flex-grow">
                            Un espace blanc pour rédiger votre texte à votre rythme, sans guide ni contrainte.
                        </p>

                        <div className="pt-6 border-t border-memoir-blue/5">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-memoir-blue/60 group-hover:text-memoir-blue transition-colors">
                                <span>À votre rythme</span>
                                <span className="bg-memoir-blue/5 px-2 py-1 rounded">Libre</span>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-memoir-bg">Chargement...</div>}>
            <MethodSelectionContent />
        </Suspense>
    );
}
