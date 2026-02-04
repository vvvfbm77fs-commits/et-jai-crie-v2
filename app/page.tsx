'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Flower2, BookOpen, Armchair, ArrowRight, Smartphone, PenTool, Share2, Box } from 'lucide-react';

export default function HomePage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Helper function for card styles
  const getCardStyle = (id: string) => {
    const isActive = activeCard === id;
    const baseStyle = "flex flex-col p-8 rounded-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer";

    if (isActive) {
      if (id === 'funeral') return `${baseStyle} bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-[0_0_30px_rgba(100,100,255,0.2)] scale-105 border-white/20`;
      if (id === 'living') return `${baseStyle} bg-gradient-to-br from-[#C9A24D] to-[#E1C97A] text-memoir-blue shadow-[0_0_30px_rgba(201,162,77,0.4)] scale-105 border-white/20`;
      if (id === 'object') return `${baseStyle} bg-gradient-to-br from-[#5D4037] to-[#8D6E63] shadow-[0_0_30px_rgba(141,110,99,0.4)] scale-105 border-white/20`;
    }

    // Default Glassmorphism
    return `${baseStyle} bg-white/5 backdrop-blur-sm border border-white/10 hover:border-memoir-gold/30 hover:bg-white/10`;
  };

  return (
    <div className="min-h-screen bg-memoir-blue flex flex-col font-sans">

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] h-[70vh] flex items-center justify-center overflow-hidden bg-memoir-blue">
        {/* Animated Background - Photo Vivante */}
        <div className="absolute inset-0 z-0 animate-alive overflow-hidden">
          <Image
            src="/image-site4.png"
            alt="Fleurs au soleil"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          {/* Effet de lumière "Vivant" - Dégradé chaud */}
          <div className="absolute inset-0 bg-gradient-to-t from-memoir-blue via-transparent to-orange-100/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-memoir-blue/80 via-transparent to-memoir-blue/80" />
        </div>

        <div className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
          <h1 className="text-white text-7xl md:text-9xl font-serif italic font-semibold leading-tight drop-shadow-lg animate-fade-in -rotate-2">
            Commun Vivant
          </h1>

          <div className="flex flex-col gap-3 animate-slide-up">
            <p className="text-memoir-gold/90 text-xl md:text-3xl font-serif italic tracking-wide font-medium drop-shadow-md">
              Comme un souvenir. Comme une transmission. Comme un lien.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* Question Centrale avec Aura */}
      <section className="relative bg-memoir-blue py-20 px-6 text-center overflow-hidden">
        {/* Aura d'arrière plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-memoir-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-white text-3xl md:text-4xl font-serif italic mb-6">Pourquoi êtes-vous ici ?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-memoir-gold to-transparent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Les 3 Cartes Usages */}
      <section className="relative bg-memoir-blue pb-32 px-6 -mt-10" id="usages">
        {/* Formes organiques en arrière-plan */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Carte 1 : Funéraire */}
          <div
            className={getCardStyle('funeral')}
            onMouseEnter={() => setActiveCard('funeral')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 'funeral' ? 'opacity-100' : ''}`} />

            <div className="relative z-10">
              <div className={`w-16 h-16 mb-6 flex items-center justify-center rounded-full transition-all duration-500 ${activeCard === 'funeral' ? 'bg-white/10 text-white' : 'bg-memoir-blue/40 border border-white/10 text-memoir-gold'}`}>
                <Flower2 className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-serif italic mb-3 transition-colors ${activeCard === 'funeral' ? 'text-white' : 'text-white group-hover:text-memoir-gold'}`}>
                Quelqu'un est parti
              </h3>
              <p className={`text-sm mb-8 leading-relaxed transition-colors ${activeCard === 'funeral' ? 'text-white/80' : 'text-blue-100/70'}`}>
                Créer un espace de mémoire partagé, accessible par tous pour honorer sa mémoire.
              </p>
              <Link
                href="/dashboard/new?context=funeral"
                className={`w-full py-3 px-6 rounded-xl border transition-all text-center text-sm font-medium flex items-center justify-center gap-2 ${activeCard === 'funeral' ? 'bg-white text-[#1a1a2e] border-white hover:bg-white/90' : 'border-white/20 text-white/90 hover:bg-memoir-gold hover:border-memoir-gold hover:text-memoir-blue bg-transparent'}`}
              >
                Créer un mémorial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carte 2 : Vivant (Mise en avant) */}
          <div
            className={getCardStyle('living')}
            onMouseEnter={() => setActiveCard('living')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-memoir-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 'living' ? 'opacity-100' : ''}`} />

            <div className="relative z-10">
              <div className={`w-16 h-16 mb-6 flex items-center justify-center rounded-full transition-all duration-500 ${activeCard === 'living' ? 'bg-memoir-blue/10 text-memoir-blue' : 'bg-memoir-gold/10 border border-memoir-gold/30 text-memoir-gold'}`}>
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-serif italic mb-3 transition-colors ${activeCard === 'living' ? 'text-memoir-blue' : 'text-white group-hover:text-memoir-gold'}`}>
                Quelqu'un est vivant
              </h3>
              <p className={`text-sm mb-8 leading-relaxed transition-colors ${activeCard === 'living' ? 'text-memoir-blue/80' : 'text-blue-100/70'}`}>
                Célébrer sa vie, maintenant. Raconter son histoire et partager ses souvenirs précieux.
              </p>
              <Link
                href="/dashboard/new?context=living_story"
                className={`w-full py-3 px-6 rounded-xl transition-all text-center text-sm font-bold flex items-center justify-center gap-2 shadow-lg ${activeCard === 'living' ? 'bg-memoir-blue text-white hover:bg-memoir-blue/90' : 'bg-memoir-gold text-memoir-blue hover:bg-white'}`}
              >
                Créer une histoire <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carte 3 : Objet */}
          <div
            className={getCardStyle('object')}
            onMouseEnter={() => setActiveCard('object')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${activeCard === 'object' ? 'opacity-100' : ''}`} />

            <div className="relative z-10">
              <div className={`w-16 h-16 mb-6 flex items-center justify-center rounded-full transition-all duration-500 ${activeCard === 'object' ? 'bg-white/10 text-white' : 'bg-memoir-blue/40 border border-white/10 text-memoir-gold'}`}>
                <Armchair className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-serif italic mb-3 transition-colors ${activeCard === 'object' ? 'text-white' : 'text-white group-hover:text-memoir-gold'}`}>
                Cet objet a une âme
              </h3>
              <p className={`text-sm mb-8 leading-relaxed transition-colors ${activeCard === 'object' ? 'text-white/80' : 'text-blue-100/70'}`}>
                Révéler son histoire cachée, la garder précieusement et la transmettre.
              </p>
              <Link
                href="/dashboard/new?context=object_memory"
                className={`w-full py-3 px-6 rounded-xl border transition-all text-center text-sm font-medium flex items-center justify-center gap-2 ${activeCard === 'object' ? 'bg-white text-[#5D4037] border-white hover:bg-white/90' : 'border-white/20 text-white/90 hover:bg-memoir-gold hover:border-memoir-gold hover:text-memoir-blue bg-transparent'}`}
              >
                Créer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <div className="h-px bg-memoir-gold/30 w-full"></div>

      {/* Comment ça marche */}
      <section className="bg-memoir-bg py-20 px-6" id="comment-ca-marche">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-memoir-blue text-3xl md:text-5xl text-center mb-16 font-serif italic">
            Comment ça marche
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-memoir-gold shadow-sm group-hover:scale-110 transition-transform">
                <span className="font-serif text-2xl font-bold">1</span>
              </div>
              <h3 className="text-memoir-blue font-bold mb-2">Choisissez votre point de départ</h3>
              <p className="text-memoir-blue/60 text-sm">Funéraire, vivant ou objet : commencez là où vous êtes.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-memoir-gold shadow-sm group-hover:scale-110 transition-transform">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-memoir-blue font-bold mb-2">Créez avec Alma ou en autonomie</h3>
              <p className="text-memoir-blue/60 text-sm">Une IA bienveillante vous guide, ou répondez librement à un questionnaire.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-memoir-gold shadow-sm group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-memoir-blue font-bold mb-2">Partagez et enrichissez</h3>
              <p className="text-memoir-blue/60 text-sm">Invitez des proches à contribuer. Modifiez à tout moment.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-memoir-gold shadow-sm group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-memoir-blue font-bold mb-2">Matérialisez (optionnel)</h3>
              <p className="text-memoir-blue/60 text-sm">QR code ou NFC sur une plaque, un médaillon, une étiquette. La mémoire devient physique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-memoir-blue text-3xl md:text-5xl font-serif italic mb-4">Combien ça coûte ?</h2>
            <p className="text-memoir-blue/60 text-lg">Simple, transparent, adapté à chaque situation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Carte Funéraire */}
            <div className="border border-memoir-gold/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex justify-center mb-6">
                <div className="bg-memoir-blue/5 p-4 rounded-full">
                  <Flower2 className="w-8 h-8 text-memoir-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-memoir-blue text-center mb-2">Mémorial funéraire</h3>
              <div className="text-center mb-6">
                <span className="text-sm text-memoir-blue/60">À partir de</span>
                <div className="text-4xl font-bold text-memoir-gold">69€</div>
              </div>
              <ul className="space-y-3 text-memoir-blue/80 mb-8 border-t border-b border-memoir-gold/10 py-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Conservation 5 ans</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Mémorial privé ou public</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Photos, audios, vidéos</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>QR code numérique inclus</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Options: contributeurs, livre d'or</li>
              </ul>
              <Link href="/dashboard/new?context=funeral" className="block w-full text-center bg-memoir-blue text-white py-3 rounded hover:bg-memoir-blue/90 transition-colors">
                Créer un mémorial
              </Link>
            </div>

            {/* Carte Vivant */}
            <div className="border border-memoir-gold/20 rounded-2xl p-8 hover:shadow-xl transition-all relative overflow-hidden bg-memoir-gold/5">
              <div className="absolute top-0 right-0 bg-memoir-gold text-white text-xs px-3 py-1 font-medium rounded-bl-lg">NOUVEAU</div>
              <div className="flex justify-center mb-6">
                <div className="bg-memoir-blue/5 p-4 rounded-full">
                  <BookOpen className="w-8 h-8 text-memoir-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-memoir-blue text-center mb-2">Histoire de vie</h3>
              <div className="text-center mb-6">
                <span className="text-sm text-memoir-blue/60">À partir de</span>
                <div className="text-4xl font-bold text-memoir-gold">89€</div>
              </div>
              <ul className="space-y-3 text-memoir-blue/80 mb-8 border-t border-b border-memoir-gold/10 py-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Conservation 5 ans</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Transmission familiale</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Livre audio généré par IA</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Téléchargement PDF</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Options: contributeurs multiples</li>
              </ul>
              <Link href="/dashboard/new?context=living_story" className="block w-full text-center bg-memoir-gold text-memoir-blue py-3 rounded hover:bg-memoir-gold/80 transition-colors font-medium">
                Créer une histoire
              </Link>
            </div>

            {/* Carte Objet */}
            <div className="border border-memoir-gold/20 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex justify-center mb-6">
                <div className="bg-memoir-blue/5 p-4 rounded-full">
                  <Armchair className="w-8 h-8 text-memoir-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-memoir-blue text-center mb-2">Mémoire d'objet</h3>
              <div className="text-center mb-6">
                <span className="text-sm text-memoir-blue/60">À partir de</span>
                <div className="text-4xl font-bold text-memoir-gold">49€</div>
              </div>
              <ul className="space-y-3 text-memoir-blue/80 mb-8 border-t border-b border-memoir-gold/10 py-6">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Conservation 5 ans</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Mémorial privé ou public</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Certificat d'authenticité</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>QR code pour l'objet</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-memoir-gold"></div>Options: contributeurs</li>
              </ul>
              <Link href="/dashboard/new?context=object_memory" className="block w-full text-center bg-memoir-blue text-white py-3 rounded hover:bg-memoir-blue/90 transition-colors">
                Créer
              </Link>
            </div>
          </div>

          <div className="mt-16 bg-memoir-blue rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-memoir-gold text-2xl font-serif italic mb-4">Vous êtes professionnel du funéraire ou assureur ?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Découvrez nos offres partenaires dédiées : abonnement annuel, commissions sur les upsells et les supports physiques, outils de gestion simplifiés.
            </p>
            <Link href="/partner" className="inline-block border border-memoir-gold text-memoir-gold px-8 py-3 rounded hover:bg-memoir-gold hover:text-memoir-blue transition-colors">
              Devenir partenaire
            </Link>
          </div>
        </div>
      </section>

      {/* Section Modèles */}
      {/* Section Objets & Supports */}
      <section className="bg-memoir-blue py-16 md:py-24 px-6" id="objets">
        <h2 className="text-memoir-gold text-4xl md:text-5xl text-center mb-6 font-normal font-serif italic">
          Du numérique au physique
        </h2>
        <p className="text-memoir-light/80 text-center mb-16 italic text-base md:text-lg px-4 max-w-3xl mx-auto">
          Après avoir créé votre Commun, vous pouvez commander un support gravé : plaque funéraire, médaillon, étiquette pour meuble. Un QR code ou une puce NFC donne accès à la mémoire complète, d'un simple geste.
        </p>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-[350px_350px_1fr] gap-12 items-center lg:items-center">
            {/* Image 1 */}
            <div className="flex items-center justify-center w-full max-w-[350px]">
              <div className="relative w-full h-[300px] md:h-[450px]">
                <Image
                  src="/image-site1.png"
                  alt="Mémorial numérique"
                  fill
                  className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Image 2 */}
            <div className="flex items-center justify-center w-full max-w-[350px]">
              <div className="relative w-full h-[300px] md:h-[450px]">
                <Image
                  src="/image-site5.png"
                  alt="Plaque commémorative"
                  fill
                  className="object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Texte */}
            <div className="flex flex-col justify-center px-4 lg:px-8 text-center lg:text-left h-full py-8 lg:py-0">
              <h3 className="text-memoir-gold text-2xl md:text-3xl mb-6 font-light font-sans">
                L'émotion à portée de main
              </h3>
              <p className="text-memoir-light/80 text-lg italic mb-10 leading-relaxed">
                Plaque funéraire avec QR, médaillon avec NFC, étiquette pour meuble... Choisissez le support qui vous convient.
              </p>
              <div className="flex justify-center lg:justify-start">
                <button
                  className="bg-memoir-gold text-memoir-blue py-3 md:py-4 px-10 rounded-lg text-lg font-medium hover:bg-memoir-gold/80 transition-colors w-fit shadow-lg font-sans"
                >
                  Voir les supports
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-memoir-gold/30 py-12 px-6 bg-memoir-blue mt-auto" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="text-center md:text-left">
              <p className="font-medium text-memoir-gold text-xl mb-1 font-sans">
                Et j'ai crié
              </p>
              <p className="text-memoir-light/60 text-sm">Marque sensible et éclairée</p>
            </div>

            <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <a href="/mentions-legales" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Mentions légales
              </a>
              <a href="/confidentialite" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Confidentialité
              </a>
              <a href="/droit-oubli" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Droit à l'oubli
              </a>
              <a href="mailto:contact@etjaicrie.fr" className="text-memoir-light/60 hover:text-memoir-gold transition-colors text-base">
                Contact
              </a>
            </nav>
          </div>

          <div className="text-center pt-6 border-t border-memoir-gold/20 text-memoir-light/50 text-xs">
            <p>© 2026 Commun Vivant • Une marque sensible et éclairée</p>
          </div>
        </div>
      </footer>
    </div>
  );
}