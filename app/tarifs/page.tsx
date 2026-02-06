'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { Check, Info, ArrowRight } from 'lucide-react';

export default function TarifsPage() {
    return (
        <div className="min-h-screen bg-memoir-bg flex flex-col font-sans">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">

                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif italic text-memoir-blue">Tarifs Transparents</h1>
                    <p className="text-xl text-memoir-blue/60 font-light max-w-2xl mx-auto">
                        Un paiement unique, aucun abonnement caché.<br />
                        Vous payez une fois, votre espace reste accessible pendant 5 ans.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20">

                    {/* Objet */}
                    <div className="bg-white rounded-[32px] p-8 border border-memoir-blue/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-memoir-neon/5 rounded-full blur-[40px] group-hover:bg-memoir-neon/10 transition-colors" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif text-memoir-blue italic mb-2">Mémoire d'Objet</h2>
                            <div className="flex items-baseline gap-1 my-6">
                                <span className="text-5xl font-bold text-memoir-blue">15€</span>
                                <span className="text-memoir-blue/40">/ objet</span>
                            </div>
                            <p className="text-memoir-blue/60 text-sm mb-8 border-b border-memoir-blue/5 pb-8">
                                Pour transmettre l'histoire d'un meuble, d'un lieu ou d'un bijou.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    <span>Puce NFC incluse</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    <span>Hébergement 5 ans</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    <span>Questionnaire "Objet" simplifié</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-neon flex-shrink-0" />
                                    <span>Livre d'or</span>
                                </li>
                            </ul>

                            <Link href="/create?context=object_memory" className="block w-full py-4 rounded-full border border-memoir-neon text-memoir-neon font-bold text-center hover:bg-memoir-neon hover:text-white transition-all">
                                Créer une mémoire
                            </Link>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-memoir-blue/40 font-bold uppercase tracking-widest mb-2">Tarif Dégressif</p>
                                <p className="text-xs text-memoir-blue/60">3 objets : 35€ • 5 objets : 50€ • 10 objets : 80€</p>
                            </div>
                        </div>
                    </div>

                    {/* Personne (Mise en avant) */}
                    <div className="bg-memoir-blue rounded-[32px] p-8 border border-white/10 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div className="relative z-10 text-white">
                            <div className="absolute top-0 right-0 bg-memoir-gold text-memoir-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                                Le plus populaire
                            </div>

                            <h2 className="text-2xl font-serif italic mb-2">Mémoire de Personne</h2>
                            <div className="flex items-baseline gap-1 my-6">
                                <span className="text-5xl font-bold text-white">79€</span>
                                <span className="text-white/40">/ unique</span>
                            </div>
                            <p className="text-white/60 text-sm mb-8 border-b border-white/10 pb-8">
                                Funéraire ou Vivant. Un espace complet et digne pour célébrer une vie.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-white/90">
                                    <Check className="w-5 h-5 text-memoir-gold flex-shrink-0" />
                                    <span>Plaque QR élégante incluse</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white/90">
                                    <Check className="w-5 h-5 text-memoir-gold flex-shrink-0" />
                                    <span>Hébergement 5 ans</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white/90">
                                    <Check className="w-5 h-5 text-memoir-gold flex-shrink-0" />
                                    <span>Génération IA (3 styles)</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white/90">
                                    <Check className="w-5 h-5 text-memoir-gold flex-shrink-0" />
                                    <span>Musique & Galerie photos (15)</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white/90">
                                    <Check className="w-5 h-5 text-memoir-gold flex-shrink-0" />
                                    <span>Contributions illimitées (Livre d'or)</span>
                                </li>
                            </ul>

                            <Link href="/create?context=funeral" className="block w-full py-4 rounded-full bg-memoir-gold text-memoir-blue font-bold text-center hover:bg-white transition-all shadow-lg">
                                Créer un hommage
                            </Link>

                            <div className="mt-4 text-center">
                                <Link href="/create?context=living_story" className="text-white/40 text-xs hover:text-white underline decoration-white/20">
                                    Ou démarrer un récit de vie (Vivant)
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Pack Transmission */}
                    <div className="bg-white rounded-[32px] p-8 border border-memoir-blue/5 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-memoir-gold/5 rounded-full blur-[40px] group-hover:bg-memoir-gold/10 transition-colors" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-serif text-memoir-blue italic mb-2">Pack Transmission</h2>
                            <div className="flex items-baseline gap-1 my-6">
                                <span className="text-5xl font-bold text-memoir-blue">109€</span>
                                <span className="text-memoir-blue/40">/ pack</span>
                            </div>
                            <p className="text-memoir-blue/60 text-sm mb-8 border-b border-memoir-blue/5 pb-8">
                                Racontez l'histoire d'une personne ET de ses objets précieux.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-blue flex-shrink-0" />
                                    <span>1 Mémoire de Personne complète</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-blue flex-shrink-0" />
                                    <span>5 Mémoires d'Objets liées</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-blue flex-shrink-0" />
                                    <span>Plaque QR + 5 Puces NFC incluses</span>
                                </li>
                                <li className="flex gap-3 text-sm text-memoir-blue/80">
                                    <Check className="w-5 h-5 text-memoir-blue flex-shrink-0" />
                                    <span>Navigation fluide entre les récits</span>
                                </li>
                            </ul>

                            <Link href="/create?context=transmission" className="block w-full py-4 rounded-full border border-memoir-blue text-memoir-blue font-bold text-center hover:bg-memoir-blue hover:text-white transition-all">
                                Choisir le Pack
                            </Link>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-memoir-blue/60">Existe aussi en version "Étendu" (10 objets) à <span className="font-bold">139€</span></p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-serif text-memoir-blue mb-8 text-center italic">Options & Extensions</h3>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-memoir-blue/5 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-memoir-blue/5">
                                    <th className="pb-4 pl-4 font-serif italic text-memoir-blue text-lg">Option</th>
                                    <th className="pb-4 pr-4 text-right font-serif italic text-memoir-blue text-lg">Prix</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-memoir-blue/5">
                                {[
                                    { name: "Galerie étendue (photos illimitées)", price: "+15€" },
                                    { name: "Vidéo intégrée (jusqu'à 5 min)", price: "+20€" },
                                    { name: "Message audio (jusqu'à 3 min)", price: "+10€" },
                                    { name: "Thème premium personnalisé", price: "+25€" },
                                    { name: "Plaque QR supplémentaire", price: "+5€ / unité" },
                                    { name: "Puce NFC supplémentaire", price: "+5€ / unité" },
                                    { name: "Export PDF du mémorial", price: "+15€" },
                                    { name: "Extension hébergement +5 ans", price: "+25€" },
                                    { name: "Extension hébergement à vie (30 ans)", price: "+90€" },
                                ].map((opt, i) => (
                                    <tr key={i} className="hover:bg-memoir-bg/50 transition-colors">
                                        <td className="py-4 pl-4 text-memoir-blue/80">{opt.name}</td>
                                        <td className="py-4 pr-4 text-right font-bold text-memoir-blue">{opt.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="mt-16 bg-memoir-blue/5 rounded-3xl p-8 text-center border border-memoir-blue/10">
                    <h3 className="text-xl font-serif italic text-memoir-blue mb-2">Du sur mesure</h3>
                    <p className="text-memoir-blue/60 mb-6 max-w-xl mx-auto">
                        Besoin d’une offre sur mesure ?<br />
                        Contactez-nous pour ajuster au plus près de vos besoins et de vos envies.
                    </p>
                    <Link href="mailto:contact@etjaicrie.fr" className="inline-block bg-white text-memoir-blue px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all border border-memoir-blue/10">
                        Nous contacter
                    </Link>
                </div>


            </main>
        </div>
    );
}
