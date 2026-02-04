'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Save, Search, Globe, Lock } from 'lucide-react';

const FUNERAL_TYPES = [
    { id: 'cemetery', name: 'Cimetière', icon: '🪦' },
    { id: 'garden', name: 'Jardin du souvenir', icon: '🌳' },
    { id: 'crematorium', name: 'Crématorium', icon: '🕯️' },
];

const OBJECT_TYPES = [
    { id: 'object', name: 'Objet (Plaque / Bijou)', icon: '💎' },
];

export default function GeolocationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Simulation du rôle via URL ou état global (pour MVP)
    // En prod, cela viendrait du contexte d'auth
    const isPro = searchParams.get('role') === 'pro' || document.referrer.includes('admin');

    const [locationType, setLocationType] = useState(isPro ? 'cemetery' : 'object');
    const [address, setAddress] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [enableDelivery, setEnableDelivery] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const availableTypes = isPro ? FUNERAL_TYPES : OBJECT_TYPES;

    const handleSave = () => {
        alert('Localisation sauvegardée avec succès !');
        router.push(isPro ? '/admin/dashboard' : '/dashboard/1');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour</span>
                    </button>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[#C9A24D] text-[#0F2A44] px-6 py-2 rounded-lg hover:bg-[#E1C97A] transition-colors font-medium"
                    >
                        <Save className="w-4 h-4" />
                        <span>Sauvegarder</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-[#C9A24D]" />
                        </div>
                        {isPro && (
                            <span className="bg-[#0F2A44] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Espace Pro
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Localisation du mémorial
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        {isPro
                            ? "Définissez le lieu de repos (Cimetière, Jardin...) pour la famille."
                            : "Localisez votre objet souvenir après réception."}
                    </p>
                </div>

                {/* Type de lieu */}
                <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-8 mb-6 shadow-sm">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-4">Type de lieu</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {availableTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setLocationType(type.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${locationType === type.id
                                    ? 'border-[#C9A24D] bg-[#C9A24D]/5'
                                    : 'border-gray-200 hover:border-[#C9A24D]/50'
                                    }`}
                            >
                                <div className="text-2xl mb-2">{type.icon}</div>
                                <p className="text-sm font-medium text-[#0F2A44]">{type.name}</p>
                            </button>
                        ))}
                    </div>
                    {!isPro && (
                        <p className="text-sm text-gray-500 mt-4 italic bg-gray-50 p-3 rounded-lg border border-gray-200">
                            ℹ️ Note : La localisation du lieu d'inhumation est gérée uniquement par votre conseiller funéraire.
                        </p>
                    )}
                </div>

                {/* Adresse */}
                <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-8 mb-6 shadow-sm">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-4">Adresse</h2>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700 font-medium mb-2">
                            Rechercher une adresse
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Nom du lieu, adresse, ville..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                            />
                        </div>
                    </div>

                    {/* Carte placeholder */}
                    <div className="w-full h-64 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center mb-4 relative overflow-hidden group">
                        <div className="text-center z-10">
                            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Carte interactive</p>
                            <p className="text-sm text-gray-400">(Google Maps / OpenStreetMap)</p>
                        </div>
                        {/* Fake map implementation feel */}
                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Paris&zoom=13&size=600x300&sensor=false')] opacity-10 bg-cover bg-center" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-2">
                                Adresse complète
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Rue de la Paix"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 font-medium mb-2">
                                Code postal
                            </label>
                            <input
                                type="text"
                                placeholder="75001"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                            />
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-8 mb-6 shadow-sm">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-4">Options</h2>

                    <div className="space-y-4">
                        {/* Affichage public */}
                        <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                            <input
                                type="checkbox"
                                id="isPublic"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                                className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                            />
                            <div className="flex-1">
                                <label htmlFor="isPublic" className="font-medium text-[#0F2A44] cursor-pointer">
                                    <Globe className="inline w-4 h-4 mr-2" />
                                    Afficher sur la page publique
                                </label>
                                <p className="text-sm text-gray-600 mt-1">
                                    Les visiteurs verront la localisation sur une carte
                                </p>
                            </div>
                        </div>

                        {/* Livraison de fleurs */}
                        <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                            <input
                                type="checkbox"
                                id="enableDelivery"
                                checked={enableDelivery}
                                onChange={(e) => setEnableDelivery(e.target.checked)}
                                className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                            />
                            <div className="flex-1">
                                <label htmlFor="enableDelivery" className="font-medium text-[#0F2A44] cursor-pointer">
                                    💐 Activer la livraison de fleurs
                                </label>
                                <p className="text-sm text-gray-600 mt-1">
                                    {isPro
                                        ? "Les visiteurs pourront commander des fleurs livrées directement au lieu de sépulture."
                                        : "Je souhaite recevoir des fleurs à cette adresse (domicile)."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 text-gray-600 hover:text-[#0F2A44] transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-[#C9A24D] text-[#0F2A44] rounded-xl hover:bg-[#E1C97A] transition-colors font-medium text-lg"
                    >
                        Sauvegarder la localisation
                    </button>
                </div>
            </main>
        </div>
    );
}
