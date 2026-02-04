'use client';

import { useState } from 'react';
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
    Clock
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

export default function MemorialDashboard() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Mock data - In a real app, fetch based on ID
    const memorial = {
        id,
        deceasedName: 'Marie Dubois',
        status: 'en-cours' as const,
        completionPercentage: 45,
        contributorsCount: 2,
        lastEdited: 'Il y a 2 heures'
    };

    const steps = [
        {
            id: 'personalize',
            title: 'Personnalisation visuelle',
            description: 'Choisissez l\'apparence, les couleurs et l\'ambiance du mémorial.',
            icon: Palette,
            href: `/dashboard/${id}/personalize`,
            status: 'todo',
            important: true
        },
        {
            id: 'content',
            title: 'Histoires et souvenirs',
            description: 'Racontez son histoire avec Alma ou via le questionnaire.',
            icon: FileText,
            href: `/alma`, // Ou /questionnaire selon le choix
            status: 'in-progress'
        },
        {
            id: 'media',
            title: 'Galerie photos & vidéos',
            description: 'Ajoutez les plus beaux clichés et moments de vie.',
            icon: Mic, // Using Mic as placeholder for media/gallery if ImageIcon not imported
            href: `/medias`,
            status: 'todo'
        },
        {
            id: 'location',
            title: 'Lieu de recueillement',
            description: 'Indiquez où se trouve le lieu de mémoire.',
            icon: MapPin,
            href: `/dashboard/${id}/location`,
            status: 'todo'
        },
        {
            id: 'contributors',
            title: 'Inviter des proches',
            description: 'Invitez la famille à enrichir ce mémorial.',
            icon: Users,
            href: `/dashboard/${id}/contributors`,
            status: 'completed'
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F4F2]">
            {/* Header du Dashboard */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="text-gray-400 hover:text-[#0F2A44] transition-colors"
                        >
                            ← Retour
                        </button>
                        <div>
                            <h1 className="text-xl font-medium text-[#0F2A44] flex items-center gap-3">
                                Mémorial de {memorial.deceasedName}
                                <StatusBadge status={memorial.status} />
                            </h1>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <Clock className="w-3 h-3" /> Modifié {memorial.lastEdited}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => window.open(`/memorial/${id}`, '_blank')}
                        className="flex items-center gap-2 text-[#C9A24D] hover:underline text-sm"
                    >
                        Voir le mémorial public <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Progression Globale */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#C9A24D]/10 mb-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h2 className="text-2xl text-[#0F2A44] mb-2 font-light">Progression de l'hommage</h2>
                            <p className="text-gray-600">Vous êtes sur la bonne voie pour créer un mémorial inoubliable.</p>
                        </div>
                        <span className="text-4xl font-medium text-[#C9A24D]">{memorial.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-[#C9A24D] h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${memorial.completionPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Grille des étapes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            onClick={() => router.push(step.href)}
                            className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C9A24D]/30 transition-all cursor-pointer group relative overflow-hidden ${step.important ? 'ring-2 ring-[#C9A24D]/20' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-[#0F2A44]/5 text-[#0F2A44]'}`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                {step.status === 'completed' && (
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Fait</span>
                                )}
                                {step.status === 'in-progress' && (
                                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">En cours</span>
                                )}
                            </div>

                            <h3 className="text-lg font-medium text-[#0F2A44] mb-2 group-hover:text-[#C9A24D] transition-colors flex items-center gap-2">
                                {step.title}
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}

                    {/* Carte E-commerce (Future) */}
                    <div className="bg-gradient-to-br from-[#0F2A44] to-[#1a3b5c] p-6 rounded-xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Gift className="w-6 h-6 text-[#C9A24D]" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Boutique & Fleurs</h3>
                            <p className="text-white/70 text-sm mb-4">
                                Commandez des fleurs ou des objets souvenirs uniques.
                            </p>
                            <span className="inline-block px-3 py-1 bg-[#C9A24D]/20 text-[#C9A24D] border border-[#C9A24D]/30 rounded-full text-xs">
                                Bientôt disponible
                            </span>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C9A24D]/10 rounded-full blur-2xl" />
                    </div>
                </div>
            </main>
        </div>
    );
}
