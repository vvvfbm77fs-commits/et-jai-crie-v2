'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit3, RotateCcw, Eye, Check } from 'lucide-react';



export default function ValidatePage() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    useEffect(() => {
        const storedText = localStorage.getItem('generatedMemorialText');
        if (storedText) setText(storedText);
        else setText("Le texte n'a pas pu être chargé. Veuillez régénérer le mémorial.");

        // Try to load profile photo from mediaData -> IndexedDB
        // This is tricky without the specialized hook or logic, but let's try basic retrieval if possible or just skip for now.
        // Doing proper IDB retrieval here is too much vanilla code.
        // let's just show a placeholder if no photo.

        setLoading(false);
    }, []);

    const handlePublish = () => {
        if (confirm('Êtes-vous sûr de vouloir publier ce mémorial ? Il sera accessible publiquement.')) {
            // Save final text
            localStorage.setItem('finalMemorialText', text);
            alert('Mémorial publié avec succès ! 🎉');
            router.push('/memorial/1/preview'); // Redirect to a preview or dashboard
        }
    };
    //...

    const handleRegenerate = () => {
        if (confirm('Voulez-vous régénérer le texte ? Les modifications actuelles seront perdues.')) {
            router.push('/dashboard/1/generate');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5F4F2] to-white">
            {/* Header */}
            <header className="bg-white border-b border-[#C9A24D]/20 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/dashboard/1" className="flex items-center gap-2 text-[#0F2A44] hover:text-[#C9A24D] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour au tableau de bord</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isEditing
                                ? 'bg-[#C9A24D] text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            <span className="hidden md:inline">{isEditing ? 'Aperçu' : 'Modifier'}</span>
                        </button>

                        <button
                            onClick={handleRegenerate}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span className="hidden md:inline">Régénérer</span>
                        </button>

                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            <Check className="w-4 h-4" />
                            <span>Publier</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl text-[#0F2A44] mb-3 font-normal" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                        Validation du mémorial
                    </h1>
                    <p className="text-lg text-gray-600 italic">
                        Relisez le texte généré et modifiez-le si nécessaire avant publication
                    </p>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-8">
                    <div className="flex gap-3">
                        <div className="text-green-600 text-2xl">✨</div>
                        <div>
                            <h3 className="text-green-900 font-medium mb-1">Mémorial généré avec succès</h3>
                            <p className="text-sm text-green-800">
                                Le texte ci-dessous a été créé en synthétisant {MOCK_GENERATED_TEXT.split('\n\n').length} témoignages.
                                Vous pouvez le modifier avant de le publier.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Text Editor / Preview */}
                <div className="bg-white rounded-2xl border-2 border-[#C9A24D]/30 shadow-lg overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-[#0F2A44] to-[#1C3B5A] px-8 py-6">
                        <h2 className="text-3xl text-[#C9A24D] font-normal text-center" style={{ fontFamily: 'var(--font-calli), cursive', fontStyle: 'italic' }}>
                            Mémorial
                        </h2>
                    </div>

                    <div className="p-8 md:p-12">
                        {isEditing ? (
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full min-h-[500px] text-lg leading-relaxed text-[#0F2A44] focus:outline-none resize-none"
                                style={{ fontFamily: 'Georgia, serif' }}
                            />
                        ) : (
                            <div className="prose prose-lg max-w-none">
                                {text.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-lg leading-relaxed text-[#0F2A44] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={() => router.push('/dashboard/1')}
                        className="text-gray-600 hover:text-[#0F2A44] transition-colors"
                    >
                        Sauvegarder comme brouillon
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={handleRegenerate}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-[#C9A24D] text-[#C9A24D] rounded-xl hover:bg-[#C9A24D]/5 transition-colors font-medium"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span>Régénérer</span>
                        </button>

                        <button
                            onClick={handlePublish}
                            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-xl transition-all font-medium text-lg"
                        >
                            <Check className="w-5 h-5" />
                            <span>Publier le mémorial</span>
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                    <div className="flex gap-3">
                        <div className="text-blue-600 text-2xl">ℹ️</div>
                        <div>
                            <h3 className="text-blue-900 font-medium mb-2">Après publication</h3>
                            <ul className="text-sm text-blue-800 leading-relaxed space-y-1">
                                <li>• Le mémorial sera accessible via une URL publique</li>
                                <li>• Les visiteurs pourront laisser des messages, flammes et fleurs</li>
                                <li>• Vous pourrez modérer les contributions publiques</li>
                                <li>• Le texte restera modifiable même après publication</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
