'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import { Plus, User, Settings } from 'lucide-react';

// Mock data for demonstration
const MOCK_MEMORIALS = [
    {
        id: '1',
        name: 'Marie Dubois',
        photo: '/image-site2.png',
        status: 'publie' as const,
        contributors: { completed: 4, total: 5 },
        pendingMessages: 3,
        createdAt: 'Créé le 15 janvier 2026',
    },
    {
        id: '2',
        name: 'Jean Martin',
        photo: undefined,
        status: 'en-cours' as const,
        contributors: { completed: 2, total: 4 },
        createdAt: 'Créé le 28 janvier 2026',
    },
    {
        id: '3',
        name: 'Sophie Laurent',
        photo: '/image-site1.png',
        status: 'brouillon' as const,
        contributors: { completed: 1, total: 3 },
        createdAt: 'Créé le 1 février 2026',
    },
];

export default function DashboardPage() {
    const router = useRouter();
    const [memorials] = useState(MOCK_MEMORIALS);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.jpg" alt="Et j'ai crié" className="w-12 h-12 rounded-full" />
                        <span className="text-xl text-[#0F2A44] font-medium" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                            Et j'ai crié
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                            <User className="w-5 h-5" />
                            <span className="hidden md:inline text-sm">Mon compte</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Bonjour, Aline
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        Vos espaces mémoire
                    </p>
                </div>

                {/* Create Button */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/dashboard/new')}
                        className="flex items-center gap-3 bg-[#C9A24D] text-[#0F2A44] px-8 py-4 rounded-xl hover:bg-[#E1C97A] transition-all shadow-lg hover:shadow-xl text-lg font-medium"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        <Plus className="w-6 h-6" />
                        <span>Créer un mémorial</span>
                    </button>
                </div>

                {/* Memorials Grid */}
                {memorials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memorials.map((memorial) => (
                            <DashboardCard key={memorial.id} memorial={memorial} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg mb-6">Vous n'avez pas encore créé de mémorial</p>
                        <button
                            onClick={() => router.push('/dashboard/new')}
                            className="inline-flex items-center gap-2 text-[#C9A24D] hover:text-[#E1C97A] transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Créer votre premier mémorial</span>
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-[#C9A24D]/20 py-8 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
                    <p>© 2026 Et j'ai crié • Tous droits réservés</p>
                </div>
            </footer>
        </div>
    );
}
