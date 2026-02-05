'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, CreditCard, Lock, Check } from 'lucide-react';
import Image from 'next/image';
import ValidationModal from '@/components/ValidationModal';

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const context = searchParams.get('context') || 'funeral';

    const [step, setStep] = useState(1); // 1: Recap, 2: Payment, 3: Success
    const [showValidation, setShowValidation] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const getProductDetails = () => {
        switch (context) {
            case 'living_story':
                return {
                    name: "Histoire de vie",
                    price: 89,
                    features: ["Conservation 5 ans", "Mémorial privé", "20 photos + 5 audios", "Téléchargement PDF", "Modifications illimitées"]
                };
            case 'object_memory':
                return {
                    name: "Mémoire d'objet",
                    price: 49,
                    features: ["Conservation 5 ans", "Mémorial privé", "10 photos + 2 audios", "QR code numérique", "Modifications illimitées"]
                };
            default:
                return {
                    name: "Mémorial funéraire",
                    price: 69,
                    features: ["Conservation 5 ans", "Mémorial privé", "10 photos + 3 audios", "QR code numérique", "Modifications illimitées"]
                };
        }
    };

    const product = getProductDetails();

    const handlePayment = () => {
        // Mock Stripe Payment Success
        // Instead of going directly to success, show validation modal
        setShowValidation(true);
    };

    const handlePublishConfirm = async () => {
        setIsPublishing(true);

        // Simulate API call to save acceptance and publish
        // In real app: await fetch('/api/publish', { method: 'POST', body: JSON.stringify({ ... }) })

        setTimeout(() => {
            setIsPublishing(false);
            setShowValidation(false);
            setStep(3); // Success Screen

            // Redirect after delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F5F4F2]">
            <ValidationModal
                isOpen={showValidation}
                onClose={() => setShowValidation(false)}
                onConfirm={handlePublishConfirm}
                isProcessing={isPublishing}
            />

            <header className="bg-white border-b border-[#C9A24D]/20 py-4 px-6 fixed w-full z-10 top-0">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-[#0F2A44]">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Retour</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Paiement sécurisé</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto pt-24 pb-12 px-6">

                {step === 3 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg max-w-xl mx-auto">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-serif text-[#0F2A44] mb-4">Paiement réussi !</h1>
                        <p className="text-gray-600 mb-8">Votre Commun est maintenant actif. Vous allez être redirigé vers votre tableau de bord.</p>
                        <div className="animate-pulse text-[#C9A24D] text-sm font-medium">Redirection en cours...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-serif text-[#0F2A44] mb-2">Récapitulatif</h1>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#C9A24D]/10">
                                <div className="h-32 bg-[#0F2A44] relative">
                                    <div className="absolute inset-0 bg-[#C9A24D]/10"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-xs opacity-70 uppercase tracking-widest mb-1">Commun Vivant</p>
                                        <h3 className="text-xl font-serif">{product.name}</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3 mb-6">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                        <span className="font-medium text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-[#C9A24D]">{product.price}€</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                                <div className="min-w-[20px]">ℹ️</div>
                                <p>Ceci est un paiement unique pour 5 ans de conservation. Aucun prélèvement automatique ne sera effectué.</p>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif text-[#0F2A44] mb-2">Paiement</h2>
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-[#C9A24D]/10">
                                <div className="flex gap-4 mb-6">
                                    <button className="flex-1 py-3 border-2 border-[#C9A24D] bg-[#C9A24D]/5 text-[#0F2A44] rounded-lg font-medium flex items-center justify-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        Carte Bancaire
                                    </button>
                                    <button className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                        <span className="font-bold italic">PayPal</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" placeholder="Jean Dupont" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                                        <div className="relative">
                                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24D] focus:outline-none pl-12" placeholder="0000 0000 0000 0000" />
                                            <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" placeholder="MM/AA" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24D] focus:outline-none" placeholder="123" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button onClick={handlePayment} className="w-full bg-[#C9A24D] text-[#0F2A44] py-4 rounded-xl font-medium text-lg hover:bg-[#E1C97A] transition-colors shadow-lg">
                                        Payer {product.price}€
                                    </button>
                                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                        <Lock className="w-3 h-3" /> Paiement chiffré SSL 256-bits
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement du paiement...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
