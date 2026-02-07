'use client';

import { useRouter } from 'next/navigation';

export default function PacksPage() {
    const router = useRouter();

    const packs = [
        {
            id: 'pack_essentiel',
            title: 'PACK ESSENTIEL',
            price: 109,
            originalPrice: 128,
            savings: 19,
            features: ['1 Mémoire de Personne', '3 Mémoires d\'Objets', 'Plaque QR + 3 Puces NFC', 'Navigation fluide', 'Hébergement 5 ans'],
            badge: null,
            badgeColor: '',
        },
        {
            id: 'pack_transmission',
            title: 'PACK TRANSMISSION',
            price: 149,
            originalPrice: 199,
            savings: 50,
            features: ['1 Mémoire de Personne', '5 Mémoires d\'Objets', 'Plaque QR + 5 Puces NFC', 'Navigation fluide', 'Hébergement 5 ans'],
            badge: 'LE PLUS POPULAIRE',
            badgeColor: 'bg-[#D4AF37]',
        },
        {
            id: 'pack_etendu',
            title: 'PACK TRANSMISSION ÉTENDU',
            price: 199,
            originalPrice: 278,
            savings: 79,
            features: ['1 Mémoire de Personne', '10 Mémoires d\'Objets', 'Plaque QR + 10 Puces NFC', 'Navigation fluide', 'Hébergement 5 ans'],
            badge: 'MEILLEURE VALEUR',
            badgeColor: 'bg-[#1A1A2E]',
        },
    ];

    const handleSelectPack = (packId: string) => {
        // Logic to save pack selection and redirect to payment
        router.push(`/create/pay?pack=${packId}`);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A2E] mb-4">Packs Transmission</h1>
                    <p className="text-xl text-[#D4AF37] font-light">Racontez plusieurs histoires et économisez</p>
                </div>

                {/* Introduction */}
                <div className="max-w-3xl mx-auto text-center mb-16 bg-white p-8 rounded-2xl shadow-sm border border-[#D4AF37]/10">
                    <p className="text-lg text-[#1A1A2E]/80 leading-relaxed">
                        Racontez l'histoire d'une personne <span className="font-bold text-[#1A1A2E]">ET</span> de ses objets précieux.<br />
                        Économisez jusqu'à <span className="font-bold text-[#D4AF37]">30%</span> en choisissant un pack.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 items-start">
                    {packs.map((pack) => (
                        <div
                            key={pack.id}
                            className={`relative bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col ${pack.badge ? 'ring-2 ring-[#D4AF37]/20 z-10 scale-105 md:scale-105' : ''}`}
                        >
                            {pack.badge && (
                                <div className={`absolute top-0 right-0 ${pack.badgeColor} text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl shadow-sm tracking-widest`}>
                                    {pack.badge}
                                </div>
                            )}

                            <div className="p-8 text-center border-b border-stone-100 flex-grow-0">
                                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 tracking-wide uppercase">{pack.title}</h3>
                                <div className="flex justify-center items-baseline gap-2 mb-2">
                                    <span className="text-4xl font-serif font-bold text-[#1A1A2E]">{pack.price}€</span>
                                    <span className="text-sm text-stone-400 line-through decoration-stone-400 decoration-1">{pack.originalPrice}€</span>
                                </div>
                                <div className="inline-block bg-[#D4AF37]/10 text-[#8A7018] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Économisez {pack.savings}€
                                </div>
                            </div>

                            <div className="p-8 bg-stone-50/50 flex-grow">
                                <ul className="space-y-4">
                                    {pack.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[#1A1A2E]/80">
                                            <span className="text-[#D4AF37] font-bold">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 bg-white border-t border-stone-100">
                                <button
                                    onClick={() => handleSelectPack(pack.id)}
                                    className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-md active:scale-95 ${pack.badge ? 'bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90' : 'bg-white text-[#1A1A2E] border-2 border-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white'}`}
                                >
                                    Choisir ce pack
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* How it works */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h3 className="text-center font-bold text-[#1A1A2E] mb-8 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-[#1A1A2E]/20"></span>
                        Comment ça marche ?
                        <span className="w-8 h-px bg-[#1A1A2E]/20"></span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] font-bold mx-auto mb-4">1</div>
                            <p className="text-sm font-medium text-[#1A1A2E]">Vous créez la première mémoire maintenant</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] font-bold mx-auto mb-4">2</div>
                            <p className="text-sm font-medium text-[#1A1A2E]">Les crédits restants sont ajoutés à votre compte</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] font-bold mx-auto mb-4">3</div>
                            <p className="text-sm font-medium text-[#1A1A2E]">Vous créez les autres mémoires à votre rythme</p>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center">
                    <button onClick={() => router.back()} className="text-sm text-[#1A1A2E]/50 hover:text-[#1A1A2E] underline transition-colors">
                        ← Revenir à la formule unique
                    </button>
                </div>

            </div>
        </div>
    );
}
