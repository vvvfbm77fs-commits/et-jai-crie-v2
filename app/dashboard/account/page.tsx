'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Calendar, Lock, Trash2, HardDrive, FileText, ArrowLeft } from 'lucide-react';

export default function AccountPage() {
    // Mock user data (later replaced by Supabase data)
    const [user, setUser] = useState({
        email: 'aline@example.com',
        name: 'Aline Weber',
        createdAt: '15 janvier 2026',
        memorialsCount: 3,
        storageUsed: '450 Mo',
    });

    return (
        <div className="min-h-screen bg-[#F5F4F2] py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="text-gray-500 hover:text-[#0F2A44] transition-colors flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Retour au tableau de bord
                    </Link>
                    <h1 className="text-3xl font-serif text-[#0F2A44] italic">Mon compte</h1>
                    <p className="text-gray-600">Gérez vos informations personnelles et vos préférences.</p>
                </div>

                <div className="space-y-6">
                    {/* Informations essentielles */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#C9A24D]" />
                            Informations essentielles
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1">Email</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-500 border border-gray-100">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                                <p className="text-xs text-gray-400 mt-1 pl-1">L'email ne peut pas être modifié pour l'instant.</p>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1">Nom d'affichage</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full p-3 bg-white rounded-lg text-[#0F2A44] border border-gray-200 focus:border-[#C9A24D] focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1">Date d'inscription</label>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-500 border border-gray-100">
                                    <Calendar className="w-4 h-4" />
                                    {user.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mes données */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#C9A24D]" />
                            Statistiques
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[#F5F4F2] rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mémoires créées</p>
                                    <p className="text-2xl font-serif text-[#0F2A44]">{user.memorialsCount}</p>
                                </div>
                                <FileText className="w-8 h-8 text-[#C9A24D]/40" />
                            </div>
                            <div className="p-4 bg-[#F5F4F2] rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Espace utilisé</p>
                                    <p className="text-2xl font-serif text-[#0F2A44]">{user.storageUsed}</p>
                                </div>
                                <HardDrive className="w-8 h-8 text-[#C9A24D]/40" />
                            </div>
                        </div>
                    </div>

                    {/* Gestion du compte */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-[#C9A24D]" />
                            Sécurité & Confidentialité
                        </h2>

                        <div className="space-y-4">
                            <Link href="/mot-de-passe-oublie" className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#0F2A44]/20 hover:bg-gray-50 transition-all group">
                                <span className="text-[#0F2A44] font-medium group-hover:text-[#0F2A44]">Modifier mon mot de passe</span>
                                <Lock className="w-4 h-4 text-gray-400 group-hover:text-[#0F2A44]" />
                            </Link>

                            <button onClick={() => alert('Fonctionnalité à venir')} className="w-full flex items-center justify-between p-4 rounded-xl border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all group text-left">
                                <span className="text-red-600 font-medium">Supprimer mon compte</span>
                                <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                            </button>
                            <p className="text-xs text-gray-400 px-1">Cette action est irréversible et supprimera toutes vos données.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
