'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, FileText, Users, QrCode, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

// Mock data for families
const MOCK_FAMILIES = [
    {
        id: '1',
        familyName: 'Famille Dubois',
        deceasedName: 'Marie Dubois',
        status: 'actif' as const,
        lastUpdate: '15/01/2026',
        accessCode: 'A8B9-X2',
    },
    {
        id: '2',
        familyName: 'Famille Martin',
        deceasedName: 'Jean Martin',
        status: 'attente' as const,
        lastUpdate: '28/01/2026',
        accessCode: 'K9L2-M5',
    },
];

export default function DashboardProPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [families] = useState(MOCK_FAMILIES);

    return (
        <div className="min-h-screen bg-memoir-bg flex">
            {/* Sidebar */}
            <aside className="w-64 bg-memoir-blue text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-memoir-gold/10">
                    <h2 className="text-xl font-serif italic text-memoir-gold mb-1">Espace Pro</h2>
                    <p className="text-xs text-white/50">Pompes Funèbres Générales</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-memoir-gold/10 text-memoir-gold rounded-lg transition-colors">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-medium">Dossiers Familles</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                        <Users className="w-5 h-5" />
                        <span className="text-sm font-medium">Accès Familles</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                        <QrCode className="w-5 h-5" />
                        <span className="text-sm font-medium">QR & Plaques</span>
                    </button>
                    <div className="h-px bg-white/10 my-4 mx-4"></div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-medium">Paramètres</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-memoir-gold/10">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl text-memoir-blue font-serif italic mb-2">Dossiers en cours</h1>
                        <p className="text-memoir-blue/60 text-sm">Gérez les espaces Communs de vos familles.</p>
                    </div>
                    <button
                        onClick={() => router.push('/dashboard/new?context=funeral')}
                        className="flex items-center gap-2 bg-memoir-gold text-white px-6 py-3 rounded-lg hover:bg-memoir-gold/90 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nouveau dossier</span>
                    </button>
                </header>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm border border-memoir-gold/10 p-4 mb-8">
                    <div className="flex items-center gap-3 px-4 py-2 bg-memoir-bg rounded-lg">
                        <Search className="w-5 h-5 text-memoir-blue/40" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom de famille ou défunt..."
                            className="bg-transparent border-none focus:outline-none text-memoir-blue w-full placeholder:text-memoir-blue/40"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-memoir-gold/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-memoir-bg text-xs uppercase text-memoir-blue/60 font-medium">
                            <tr>
                                <th className="px-6 py-4">Famille</th>
                                <th className="px-6 py-4">Défunt(e)</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">Code Accès</th>
                                <th className="px-6 py-4">Dernière MAJ</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-memoir-gold/10">
                            {families.map((family) => (
                                <tr key={family.id} className="hover:bg-memoir-bg/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-memoir-blue">{family.familyName}</td>
                                    <td className="px-6 py-4 text-memoir-blue/80">{family.deceasedName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${family.status === 'actif'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {family.status === 'actif' ? 'Actif' : 'En attente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-memoir-blue/60">{family.accessCode}</td>
                                    <td className="px-6 py-4 text-sm text-memoir-blue/60">{family.lastUpdate}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-memoir-gold hover:text-memoir-blue text-sm font-medium transition-colors">
                                            Gérer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
