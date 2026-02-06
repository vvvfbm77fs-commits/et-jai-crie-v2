'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Bell, Globe, Shield, HelpCircle, ArrowLeft, Moon, Sun, ChevronRight, ToggleRight, ToggleLeft } from 'lucide-react';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        newsletter: false,
    });

    // Toggle component mock
    const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button onClick={onChange} className={`transition-colors duration-200 ${checked ? 'text-[#C9A24D]' : 'text-gray-300'}`}>
            {checked ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#F5F4F2] py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="text-gray-500 hover:text-[#0F2A44] transition-colors flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Retour au tableau de bord
                    </Link>
                    <h1 className="text-3xl font-serif text-[#0F2A44] italic">Réglages</h1>
                    <p className="text-gray-600">Personnalisez votre expérience et vos préférences.</p>
                </div>

                <div className="space-y-6">
                    {/* Préférences d'affichage */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-[#C9A24D]" />
                            Affichage
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0F2A44]">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#0F2A44]">Langue</p>
                                        <p className="text-xs text-gray-500">Langue de l'interface</p>
                                    </div>
                                </div>
                                <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#0F2A44] focus:outline-none focus:border-[#C9A24D]">
                                    <option>Français</option>
                                    <option disabled>English (Coming soon)</option>
                                    <option disabled>Español (Coming soon)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0F2A44]">
                                        <Moon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#0F2A44]">Mode sombre</p>
                                        <p className="text-xs text-gray-500">Thème visuel de l'application</p>
                                    </div>
                                </div>
                                <Toggle checked={false} onChange={() => { }} />
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-[#C9A24D]" />
                            Notifications
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-[#0F2A44]">Emails transactionnels</p>
                                    <p className="text-xs text-gray-500">Confirmations de commande, création de mémoire...</p>
                                </div>
                                <Toggle
                                    checked={notifications.email}
                                    onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-[#0F2A44]">Actualités du projet</p>
                                    <p className="text-xs text-gray-500">Nouveautés, mises à jour et inspirations.</p>
                                </div>
                                <Toggle
                                    checked={notifications.newsletter}
                                    onChange={() => setNotifications({ ...notifications, newsletter: !notifications.newsletter })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vie privée & Légal */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#C9A24D]" />
                            Vie privée & Données
                        </h2>

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                                <span className="text-sm text-gray-600 group-hover:text-[#0F2A44]">Gérer mes consentements (cookies)</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0F2A44]" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                                <span className="text-sm text-gray-600 group-hover:text-[#0F2A44]">Télécharger mes données (Export RGPD)</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0F2A44]" />
                            </button>
                            <Link href="/mentions-legales" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                                <span className="text-sm text-gray-600 group-hover:text-[#0F2A44]">Conditions d'utilisation</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0F2A44]" />
                            </Link>
                        </div>
                    </div>

                    {/* Aide */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9A24D]/10">
                        <h2 className="text-lg font-medium text-[#0F2A44] mb-6 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-[#C9A24D]" />
                            Aide
                        </h2>

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                                <span className="text-sm text-gray-600 group-hover:text-[#0F2A44]">Guide d'utilisation</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0F2A44]" />
                            </button>
                            <a href="mailto:contact@et-jai-crie.fr" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                                <span className="text-sm text-gray-600 group-hover:text-[#0F2A44]">Nous contacter</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0F2A44]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
