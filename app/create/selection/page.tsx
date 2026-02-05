'use client';

import Link from 'next/link';
import { Flower2, BookOpen, Armchair, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SelectionPage() {
    const cards = [
        {
            id: 'funeral',
            title: "Quelqu'un est parti",
            description: "Créer un espace de mémoire partagé, accessible par tous pour honorer sa mémoire.",
            icon: Flower2,
            style: "bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-[0_0_30px_rgba(100,100,255,0.2)] border-white/20",
            buttonStyle: "bg-white text-[#1a1a2e] hover:bg-white/90"
        },
        {
            id: 'living_story',
            title: "Quelqu'un est vivant",
            description: "Célébrer sa vie, maintenant. Raconter son histoire et partager ses souvenirs précieux.",
            icon: BookOpen,
            style: "bg-gradient-to-br from-[#C9A24D] to-[#E1C97A] text-memoir-blue shadow-[0_0_30px_rgba(201,162,77,0.4)] border-white/20",
            buttonStyle: "bg-memoir-blue text-white hover:bg-memoir-blue/90"
        },
        {
            id: 'object_memory',
            title: "Cet objet a une âme",
            description: "Révéler son histoire cachée, la garder précieusement et la transmettre.",
            icon: Armchair,
            style: "bg-gradient-to-br from-[#5D4037] to-[#8D6E63] shadow-[0_0_30px_rgba(141,110,99,0.4)] border-white/20",
            buttonStyle: "bg-white text-[#5D4037] hover:bg-white/90"
        }
    ];

    return (
        <div className="min-h-screen bg-memoir-blue flex flex-col items-center justify-center p-6 bg-[url('/bg-grain.png')]">
            <div className="w-full max-w-6xl">
                <div className="mb-12 text-center relative z-10">
                    <Link href="/dashboard" className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden md:inline">Retour</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl text-white font-serif italic mb-4">Que souhaitez-vous créer ?</h1>
                    <p className="text-white/60 text-lg">Choisissez le type de Commun qui correspond à votre intention.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div key={card.id} className={`flex flex-col p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${card.style}`}>
                            <div className="mb-6 bg-white/10 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <card.icon className={`w-8 h-8 ${card.id === 'living_story' ? 'text-memoir-blue' : 'text-white'}`} />
                            </div>
                            <h2 className={`text-2xl font-serif italic mb-4 ${card.id === 'living_story' ? 'text-memoir-blue' : 'text-white'}`}>
                                {card.title}
                            </h2>
                            <p className={`text-sm mb-8 flex-grow leading-relaxed ${card.id === 'living_story' ? 'text-memoir-blue/80' : 'text-white/80'}`}>
                                {card.description}
                            </p>
                            <Link
                                href={`/create?context=${card.id}`}
                                className={`w-full py-4 rounded-xl text-center font-medium flex items-center justify-center gap-2 transition-colors ${card.buttonStyle}`}
                            >
                                Commencer <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
