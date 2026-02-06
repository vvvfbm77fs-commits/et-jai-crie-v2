'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Flower2, BookOpen, Armchair, Quote, Share2, MapPin, Calendar, Music, Video, Heart } from 'lucide-react';

export default function ExamplePage() {
    return (
        <div className="min-h-screen bg-memoir-bg font-sans selection:bg-memoir-neon selection:text-white">
            <Header />

            <main className="pt-24 pb-20">
                {/* Intro */}
                <div className="text-center max-w-4xl mx-auto px-6 mb-24 space-y-6">
                    <span className="inline-block px-4 py-1 bg-memoir-blue/5 text-memoir-blue text-xs font-bold tracking-widest uppercase rounded-full">
                        Démonstration
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-memoir-blue">
                        Trois histoires, <br /><span className="text-memoir-neon">trois mémoires.</span>
                    </h1>
                    <p className="text-xl text-memoir-blue/60 font-light max-w-2xl mx-auto">
                        Découvrez comment un même espace peut s'adapter à chaque nature de souvenir.
                        Funéraire, vivant ou objet : à chaque récit sa couleur et sa forme.
                    </p>
                </div>

                {/* 1. HOMMAGE FUNÉRAIRE */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="relative rounded-[40px] overflow-hidden bg-[#1a1a2e] text-white shadow-2xl">
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '30px 30px' }}>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12">
                            {/* Left Content */}
                            <div className="lg:col-span-5 p-12 lg:p-16 flex flex-col justify-center relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                                        <Flower2 className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-bold tracking-widest uppercase text-white/50">L'Hommage</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">
                                    Pour honorer <br /><span className="text-blue-200">une vie passée</span>
                                </h2>

                                <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                                    Une mise en page sobre et solennelle. Le fond sombre invite au recueillement.
                                    La biographie est centrale, entourée des témoignages (Livre d'Or) et des lieux de mémoire.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full">
                                        <MapPin className="w-4 h-4" /> Cimetière du Père Lachaise
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full">
                                        <Calendar className="w-4 h-4" /> 1954 - 2024
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link href="/exemple/funeraire" className="inline-flex bg-white/10 text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-sm">
                                        Voir en entier
                                    </Link>
                                </div>
                            </div>

                            {/* Right Mockup */}
                            <div className="lg:col-span-7 relative min-h-[500px] bg-[#16213e] lg:rounded-bl-[80px] overflow-hidden">
                                <div className="absolute inset-0">
                                    <Image src="/image-site1.png" alt="Exemple Funéraire" fill className="object-cover opacity-80 mix-blend-overlay" />
                                </div>

                                {/* Fake UI Elements */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-[#16213e] via-transparent to-transparent">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-lg mx-auto lg:mx-0 transform translate-y-4 shadow-xl">
                                        <Quote className="w-8 h-8 text-blue-200 mb-4 opacity-50" />
                                        <p className="text-xl font-serif italic text-white mb-4">
                                            "Il aimait la mer, le silence et les livres. C'est ici que nous gardons la trace de ses mots et de son sourire."
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-200/20" />
                                            <span className="text-sm font-medium text-white/80">Marie, sa fille</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. RÉCIT VIVANT */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="relative rounded-[40px] overflow-hidden bg-white border border-memoir-gold/20 shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                            {/* Visual Side (Left) */}
                            <div className="lg:col-span-6 relative min-h-[500px] bg-[#FDFCFB]">
                                <div className="absolute inset-4 rounded-3xl overflow-hidden">
                                    <Image src="/image-site4.png" alt="Exemple Vivant" fill className="object-cover" />
                                </div>
                                {/* Overlay Badge */}
                                <div className="absolute bottom-12 right-12 bg-white/90 backdrop-blur shadow-lg p-6 rounded-2xl max-w-xs rotate-2">
                                    <h3 className="font-serif italic text-memoir-blue text-lg mb-2">Les Chapitres d'une vie</h3>
                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-memoir-gold/20 rounded-full overflow-hidden">
                                            <div className="h-full w-3/4 bg-memoir-gold" />
                                        </div>
                                        <p className="text-xs text-memoir-blue/50 uppercase tracking-widest">En cours d'écriture...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side (Right) */}
                            <div className="lg:col-span-6 p-12 lg:p-20 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-memoir-gold/10 rounded-full">
                                        <BookOpen className="w-6 h-6 text-memoir-gold" />
                                    </div>
                                    <span className="text-sm font-bold tracking-widest uppercase text-memoir-gold">Le Récit Vivant</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-serif italic text-memoir-blue mb-6 leading-tight">
                                    Pour transmettre <br /><span className="text-memoir-gold">au présent</span>
                                </h2>

                                <p className="text-memoir-blue/70 text-lg font-light leading-relaxed mb-8">
                                    Une page lumineuse, structurée comme un livre.
                                    Teintes chaudes en beige et or. Idéal pour une biographie, un mariage, ou une naissance.
                                    L'accent est mis sur la chronologie et les albums photos.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-memoir-bg rounded-2xl text-center">
                                        <Music className="w-6 h-6 text-memoir-blue mx-auto mb-2" />
                                        <span className="text-sm text-memoir-blue/60 font-medium">Playlist de vie</span>
                                    </div>
                                    <div className="p-4 bg-memoir-bg rounded-2xl text-center">
                                        <Video className="w-6 h-6 text-memoir-blue mx-auto mb-2" />
                                        <span className="text-sm text-memoir-blue/60 font-medium">Interviews</span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link href="/exemple/vivant" className="inline-flex bg-memoir-gold text-white px-8 py-3 rounded-full font-bold hover:bg-memoir-gold/80 transition-all">
                                        Voir en entier
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 3. MÉMOIRE D'OBJET */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            {/* Center Content / Split */}
                            <div className="lg:col-span-12 relative min-h-[600px] flex items-center justify-center">
                                {/* Background Object Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image src="/image-site5.png" alt="Exemple Objet" fill className="object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>

                                <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-memoir-neon/20 rounded-full border border-memoir-neon/30">
                                                <Armchair className="w-6 h-6 text-memoir-neon" />
                                            </div>
                                            <span className="text-sm font-bold tracking-widest uppercase text-memoir-neon">L'Objet & le Lieu</span>
                                        </div>

                                        <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                                            L'âme <br /><span className="text-memoir-neon">des choses</span>
                                        </h2>

                                        <p className="text-white/80 text-lg font-light leading-relaxed">
                                            Un design percutant, format "carte" ou "musée".
                                            L'image de l'objet est héroïque. Parfait pour une provenance, une histoire de fabrication, ou l'histoire d'une maison de famille.
                                            Le QR code est la clé d'entrée.
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <Link href="/exemple/objet" className="bg-memoir-neon text-white px-8 py-3 rounded-full font-bold hover:bg-memoir-neon/80 transition-all shadow-lg shadow-memoir-neon/20">
                                                Voir en entier
                                            </Link>
                                            <button className="flex items-center gap-2 text-white border-b border-memoir-neon pb-1 hover:text-memoir-neon transition-colors">
                                                <Share2 className="w-4 h-4" /> Fiche technique
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        {/* Floating Card Mockup */}
                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-[0_0_50px_rgba(238,19,93,0.3)]">
                                            <div className="flex justify-between items-start mb-6">
                                                <h4 className="text-xl font-serif italic">Le Fauteuil Voltaire</h4>
                                                <span className="bg-memoir-neon text-white text-xs font-bold px-2 py-1 rounded">1890</span>
                                            </div>
                                            <div className="h-40 bg-black/20 rounded-xl mb-6 relative overflow-hidden group">
                                                <Image src="/image-site3.png" alt="Detail" fill className="object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <p className="text-sm text-white/70 leading-relaxed mb-4">
                                                "Ce fauteuil a traversé trois générations. Il a vu grandir Paul, puis ses enfants..."
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-memoir-neon animate-pulse" />
                                                <span className="text-xs uppercase tracking-widest text-memoir-neon">Scannez pour écouter</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Footer */}
                <div className="text-center mt-32 space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-memoir-blue">
                        Prêt à écrire votre <span className="text-memoir-gold">propre histoire ?</span>
                    </h2>
                    <Link href="/create/selection" className="inline-block bg-memoir-blue text-white px-10 py-5 rounded-full font-medium hover:bg-memoir-blue/90 shadow-xl hover:scale-105 transition-all">
                        Commencer maintenant
                    </Link>
                </div>
            </main>
        </div>
    );
}
