'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Users,
    Palette,
    FileText,
    Mic,
    MapPin,
    Gift,
    Share2,
    ExternalLink,
    ChevronRight,
    Clock,
    Eye,
    CheckCircle2,
    Heart
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function MemorialDashboard() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [name, setName] = useState('Le Défunt');
    const [context, setContext] = useState('alma');

    useEffect(() => {
        const stored = localStorage.getItem('questionnaireData') || localStorage.getItem('onboarding_data');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.prenom || data.nom) {
                setName(`${data.prenom || ''} ${data.nom || ''}`.trim());
            }
            if (data.context) setContext(data.context);
        }
    }, []);

    const memorial = {
        id,
        deceasedName: name,
        status: 'en-cours' as const,
        completionPercentage: 65,
        lastEdited: 'À l\'instant'
    };

    const steps = [
        {
            id: 'personalize',
            title: 'Personnalisation & Aperçu',
            description: 'Design, couleurs, filtres photo et organisation des blocs.',
            icon: Palette,
            href: `/dashboard/${id}/validate`,
            status: 'in-progress',
            important: true
        },
        {
            id: 'content',
            title: 'Histoires et souvenirs',
            description: 'Complétez le récit de vie avec Alma ou par écrit.',
            icon: FileText,
            href: context === 'alma' ? '/alma' : '/questionnaire',
            status: 'completed'
        },
        {
            id: 'media',
            title: 'Galerie photos & vidéos',
            description: 'Ajoutez les plus beaux clichés et moments de vie.',
            icon: Mic,
            href: `/medias`,
            status: 'todo'
        },
        {
            id: 'location',
            title: 'Cérémonie & Lieu de repos',
            description: 'Indiquez le lieu de recueillement et les infos pratiques.',
            icon: MapPin,
            href: `/dashboard/${id}/location`,
            status: 'todo'
        },
        {
            id: 'tree',
            title: 'Arbre Généalogique',
            description: 'Construisez la lignée familiale et l\'héritage.',
            icon: Users,
            href: `/dashboard/${id}/validate?tab=blocks`,
            status: 'todo'
        },
        {
            id: 'contribution',
            title: 'Cagnotte & Liens',
            description: 'Configurez les liens de soutien ou de fleurs.',
            icon: Heart,
            href: `/dashboard/${id}/validate?tab=blocks`,
            status: 'todo'
        }
    ];

    return (
        <div className="min-h-screen bg-memoir-bg flex flex-col font-sans">
            {/* Header du Dashboard */}
            <header className="bg-white/80 backdrop-blur-md border-b border-memoir-gold/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-memoir-blue/40 hover:text-memoir-blue transition-colors flex items-center gap-2 text-sm"
                        >
                            <ChevronLeft className="w-4 h-4" /> Accueil
                        </Link>
                        <div className="h-6 w-px bg-memoir-gold/20 mx-2 hidden md:block" />
                        <div>
                            <h1 className="text-xl font-serif italic text-memoir-blue flex items-center gap-3">
                                Mémorial de <span className="text-memoir-gold font-bold">{memorial.deceasedName}</span>
                                <StatusBadge status={memorial.status} />
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.open(`/memorial/${id}/preview`, '_blank')}
                            className="flex items-center gap-2 text-memoir-blue hover:text-memoir-gold bg-white px-4 py-2 rounded-full transition-all text-sm font-bold border border-memoir-blue/10 hover:border-memoir-gold shadow-sm"
                        >
                            <Eye className="w-4 h-4" />
                            Aperçu
                        </button>
                        <button
                            onClick={() => router.push(`/dashboard/${id}/validate`)}
                            className="flex items-center gap-2 bg-memoir-blue text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm font-bold shadow-md"
                        >
                            <CheckCircle2 className="w-4 h-4 text-memoir-gold" />
                            Publier l'hommage
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 flex-1">
                {/* Progression Globale */}
                <div className="bg-white rounded-3xl p-10 shadow-sm border border-memoir-gold/20 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                        <Heart className="w-48 h-48 text-memoir-gold" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
                        <div>
                            <span className="inline-block px-3 py-1 bg-memoir-gold/10 text-memoir-gold rounded-full text-[10px] font-bold tracking-widest uppercase mb-3">Tableau de bord</span>
                            <h2 className="text-3xl text-memoir-blue mb-2 font-serif italic">L'hommage de {memorial.deceasedName} prend vie.</h2>
                            <p className="text-memoir-blue/50 text-base font-light">
                                Complétez chaque étape pour créer un souvenir éternel et le partager avec vos proches.
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-5xl font-serif italic text-memoir-gold">{memorial.completionPercentage}%</span>
                            <span className="text-[10px] text-memoir-blue/30 uppercase tracking-widest font-bold mt-1">Avancement</span>
                        </div>
                    </div>

                    <div className="w-full bg-memoir-bg rounded-full h-2.5 overflow-hidden relative z-10">
                        <div
                            className="bg-memoir-gold h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(201,162,77,0.3)]"
                            style={{ width: `${memorial.completionPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Grille des étapes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            onClick={() => router.push(step.href)}
                            className={`bg-white p-8 rounded-3xl border transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col h-full ${step.important
                                    ? 'border-memoir-gold/40 shadow-xl shadow-memoir-gold/5'
                                    : 'border-memoir-blue/5 shadow-sm hover:shadow-xl hover:border-memoir-gold/30'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 ${step.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-memoir-bg text-memoir-blue/60 group-hover:bg-memoir-blue group-hover:text-white'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                {step.status === 'completed' ? (
                                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
                                        <CheckCircle2 className="w-3 h-3" /> Terminé
                                    </div>
                                ) : (
                                    <div className="bg-memoir-gold/10 text-memoir-gold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
                                        À faire
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-serif italic text-memoir-blue mb-3 group-hover:text-memoir-gold transition-colors flex items-center justify-between">
                                {step.title}
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                            </h3>
                            <p className="text-sm text-memoir-blue/60 leading-relaxed font-light flex-1">
                                {step.description}
                            </p>

                            {step.important && (
                                <div className="mt-6 pt-6 border-t border-memoir-gold/10">
                                    <span className="text-[10px] text-memoir-gold font-bold uppercase tracking-wider">Étape recommandée</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Carte E-commerce Refresh */}
                    <div className="bg-memoir-blue p-8 rounded-3xl text-white relative overflow-hidden group flex flex-col justify-between h-full border border-memoir-gold/10">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-memoir-gold/10 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/5">
                                <Gift className="w-6 h-6 text-memoir-gold" />
                            </div>
                            <h3 className="text-xl font-serif italic text-white mb-3">Supports Physiques</h3>
                            <p className="text-white/60 text-sm font-light leading-relaxed">
                                Plaque gravée, médaillon ou objet souvenir : reliez ce mémorial au monde réel.
                            </p>
                        </div>

                        <div className="relative z-10 mt-8">
                            <span className="inline-block px-4 py-2 bg-white/10 text-white/50 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                Prochainement
                            </span>
                        </div>

                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-memoir-gold/10 rounded-full blur-[60px] group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>
            </main>

            {/* Footer compact */}
            <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-memoir-gold/10 text-center">
                <p className="text-[10px] text-memoir-blue/30 uppercase tracking-[0.2em] font-bold">
                    ID : {id} • Besoin d'aide ? Contactez notre équipe sensible • Et j'ai crié © 2026
                </p>
            </footer>
        </div>
    );
}
