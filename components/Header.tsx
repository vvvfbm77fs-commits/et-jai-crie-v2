'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Menu, X } from 'lucide-react';

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full bg-memoir-blue/95 backdrop-blur-md py-4 transition-all duration-300 shadow-lg border-b border-memoir-gold/10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Header Layout */}
                <div className="hidden md:flex items-center justify-between">

                    {/* Partie Gauche : Socials + Menu */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="cursor-pointer hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo.jpg"
                                alt="Et j'ai crié"
                                width={100}
                                height={100}
                                className="w-20 h-20 rounded-full shadow-lg border border-memoir-gold/20"
                            />
                        </Link>

                        <nav className="flex gap-8 text-memoir-light text-base font-light tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            <a href="/" className="hover:text-memoir-gold transition-colors">Accueil</a>
                            <a href="/#usages" className="hover:text-memoir-gold transition-colors">Usages</a>
                            <a href="/#comment-ca-marche" className="hover:text-memoir-gold transition-colors">Comment ça marche</a>
                            <a href="/#supports" className="hover:text-memoir-gold transition-colors">Objets & supports</a>
                            <a href="/a-propos" className="hover:text-memoir-gold transition-colors">À propos</a>
                        </nav>
                    </div>

                    {/* Partie Droite : Actions */}
                    <div className="flex items-center gap-6">
                        {/* Socials discrets */}
                        <div className="flex gap-4 text-memoir-gold/80 border-r border-memoir-gold/20 pr-6">
                            <Instagram className="w-4 h-4 hover:text-memoir-gold transition-colors cursor-pointer" />
                            <Facebook className="w-4 h-4 hover:text-memoir-gold transition-colors cursor-pointer" />
                        </div>

                        <div className="flex gap-3">
                            <a
                                href="/login"
                                className="text-memoir-light/70 hover:text-memoir-gold transition-colors text-sm font-medium px-4 flex items-center"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Espace Pro
                            </a>
                            <button
                                onClick={() => router.push('/login')}
                                className="text-memoir-light hover:text-memoir-gold transition-colors text-sm font-medium px-4 border border-memoir-gold/30 rounded py-2 hover:bg-memoir-gold/10"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Se connecter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Header Layout */}
                <div className="md:hidden flex items-center justify-between py-2">
                    <Link href="/" className="relative w-12 h-12 cursor-pointer hover:opacity-90 transition-opacity">
                        <Image
                            src="/logo.jpg"
                            alt="Et j'ai crié"
                            fill
                            className="object-cover rounded-full border border-memoir-gold/20 shadow-sm"
                        />
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="text-memoir-gold p-2 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-memoir-blue border-t border-memoir-gold/20 shadow-xl px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-200 h-screen">
                    <nav className="flex flex-col items-center gap-6 text-memoir-light text-xl font-light" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <a href="/" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Accueil</a>
                        <a href="/#usages" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Usages</a>
                        <a href="/#comment-ca-marche" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Comment ça marche</a>
                        <a href="/#supports" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Objets & supports</a>
                        <a href="/a-propos" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">À propos</a>
                    </nav>

                    <div className="h-px bg-memoir-gold/20 w-full my-4"></div>

                    <div className="flex flex-col gap-4 items-center w-full">
                        <a
                            href="/login"
                            onClick={toggleMenu}
                            className="text-memoir-light/70 hover:text-memoir-gold transition-colors text-lg font-medium"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                            Espace Pro
                        </a>
                        <button
                            onClick={() => { router.push('/login'); toggleMenu(); }}
                            className="bg-memoir-gold text-memoir-blue px-6 py-3 rounded hover:bg-[#E1C97A] transition-colors text-lg font-medium w-full text-center"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
