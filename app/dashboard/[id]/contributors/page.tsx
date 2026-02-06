'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Mail, UserPlus, CheckCircle, Clock, Send } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';

// Mock data
const MOCK_CONTRIBUTORS = [
    {
        id: '1',
        email: 'marie.dupont@email.fr',
        name: 'Marie Dupont',
        status: 'complete' as const,
        invitedAt: '15 janvier 2026',
        completedAt: '18 janvier 2026',
    },
    {
        id: '2',
        email: 'paul.martin@email.fr',
        name: null,
        status: 'en-attente' as const,
        invitedAt: '20 janvier 2026',
        completedAt: null,
    },
];

export default function ContributorsPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const [contributors, setContributors] = useState(MOCK_CONTRIBUTORS);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    const maxContributors = 5; // Including creator
    const canInviteMore = contributors.length < maxContributors - 1; // -1 for creator

    const handleInvite = () => {
        if (!newEmail) return;

        const newContributor = {
            id: Date.now().toString(),
            email: newEmail,
            name: null,
            status: 'en-attente' as const,
            invitedAt: new Date().toLocaleDateString('fr-FR'),
            completedAt: null,
        };

        setContributors([...contributors, newContributor]);
        setNewEmail('');
        setShowInviteModal(false);
        alert(`Invitation envoyée à ${newEmail}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href={`/dashboard/${id}`} className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour au mémorial</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Contributeurs principaux
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        Invitez vos proches à contribuer au mémorial (max {maxContributors} personnes)
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl border border-[#C9A24D]/20 p-6 mb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Progression des contributeurs</p>
                            <p className="text-3xl font-medium text-[#0F2A44]">
                                {contributors.filter(c => c.status === 'complete').length + 1} / {contributors.length + 1}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Vous inclus</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Places disponibles</p>
                            <p className="text-3xl font-medium text-[#C9A24D]">
                                {maxContributors - contributors.length - 1}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Creator (you) */}
                <div className="mb-6">
                    <h2 className="text-xl text-[#0F2A44] font-medium mb-4 flex items-center gap-2">
                        <span>Créateur</span>
                    </h2>
                    <div className="bg-white rounded-xl border border-[#C9A24D]/30 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-full flex items-center justify-center">
                                    <span className="text-xl text-[#C9A24D]">👤</span>
                                </div>
                                <div>
                                    <p className="font-medium text-[#0F2A44]">Vous (Aline Weber)</p>
                                    <p className="text-sm text-gray-600">aline.weber@email.fr</p>
                                </div>
                            </div>
                            <StatusBadge status="complete" />
                        </div>
                    </div>
                </div>

                {/* Contributors List */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl text-[#0F2A44] font-medium flex items-center gap-2">
                            <span>Contributeurs invités</span>
                            <span className="text-sm text-gray-500 font-normal">({contributors.length})</span>
                        </h2>
                        {canInviteMore && (
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="flex items-center gap-2 bg-[#C9A24D] text-[#0F2A44] px-4 py-2 rounded-lg hover:bg-[#E1C97A] transition-colors font-medium"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Inviter</span>
                            </button>
                        )}
                    </div>

                    {contributors.length > 0 ? (
                        <div className="space-y-4">
                            {contributors.map((contributor) => (
                                <div
                                    key={contributor.id}
                                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#C9A24D]/50 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                {contributor.status === 'complete' ? (
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <Clock className="w-6 h-6 text-amber-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-[#0F2A44]">
                                                    {contributor.name || contributor.email}
                                                </p>
                                                {contributor.name && (
                                                    <p className="text-sm text-gray-600">{contributor.email}</p>
                                                )}
                                                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                                    <span>Invité le {contributor.invitedAt}</span>
                                                    {contributor.completedAt && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Complété le {contributor.completedAt}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge status={contributor.status} />
                                            {contributor.status === 'en-attente' && (
                                                <button className="text-sm text-[#C9A24D] hover:text-[#E1C97A] transition-colors underline">
                                                    Renvoyer
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <p className="text-gray-500 italic mb-4">Aucun contributeur invité pour le moment</p>
                            <button
                                onClick={() => setShowInviteModal(true)}
                                className="text-[#C9A24D] hover:text-[#E1C97A] transition-colors"
                            >
                                Inviter le premier contributeur
                            </button>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                    <div className="flex gap-3">
                        <div className="text-blue-600 text-2xl">ℹ️</div>
                        <div>
                            <h3 className="text-blue-900 font-medium mb-2">Comment ça marche ?</h3>
                            <ul className="text-sm text-blue-800 leading-relaxed space-y-1">
                                <li>• Chaque contributeur reçoit un email avec un lien unique</li>
                                <li>• Ils peuvent choisir Alma ou le Questionnaire</li>
                                <li>• Leurs témoignages seront intégrés lors de la génération finale</li>
                                <li>• Maximum {maxContributors} contributeurs (vous inclus)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Action */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={() => router.push(`/dashboard/${id}`)}
                        className="px-6 py-3 text-gray-600 hover:text-[#0F2A44] transition-colors"
                    >
                        Retour
                    </button>
                    <button
                        onClick={() => router.push(`/dashboard/${id}/generate`)}
                        className="px-8 py-3 bg-[#C9A24D] text-[#0F2A44] rounded-xl hover:bg-[#E1C97A] transition-colors font-medium text-lg"
                    >
                        Générer le mémorial
                    </button>
                </div>
            </main>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8">
                        <h3 className="text-2xl text-[#0F2A44] mb-4 font-medium" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                            Inviter un contributeur
                        </h3>
                        <p className="text-gray-600 mb-6 italic">
                            Invitez un proche à partager ses souvenirs
                        </p>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-700 font-medium mb-2">
                                Adresse email
                            </label>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="exemple@email.fr"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleInvite}
                                disabled={!newEmail}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A24D] text-[#0F2A44] rounded-lg hover:bg-[#E1C97A] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                                <span>Envoyer</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
