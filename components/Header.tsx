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
        <header className="sticky top-0 z-50 w-full bg-memoir-blue/95 backdrop-blur-xl py-6 transition-all duration-300 shadow-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop Header Layout */}
                <div className="hidden md:flex items-center justify-between">

                    {/* Partie Gauche : Socials + Menu */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="relative block h-full w-auto hover:opacity-90 transition-opacity z-50">
                            <div className="absolute top-0 mt-[-1.25rem] left-0 w-32 h-32 md:w-40 md:h-40 bg-memoir-bg rounded-full p-1 shadow-[0_10px_25px_rgba(28,84,98,0.6)] border-4 border-white/10">
                                <Image
                                    src="/logo.png"
                                    alt="Commun Vivant"
                                    fill
                                    sizes="(max-width: 768px) 128px, 160px"
                                    priority
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </Link>
                        {/* Spacer for the logo since it's absolute now */}
                        <div className="w-32 hidden md:block"></div>

                        <nav className="flex gap-8 text-white/90 text-base font-light tracking-wide" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            <Link href="/" className="hover:text-memoir-gold transition-colors">Accueil</Link>
                            <Link href="/#comment-ca-marche" className="hover:text-memoir-gold transition-colors">Comment ça marche</Link>
                            <Link href="/supports-physiques" className="hover:text-memoir-gold transition-colors">Objets & supports</Link>
                            <Link href="/faq" className="hover:text-memoir-gold transition-colors">FAQ</Link>
                            <Link href="/a-propos" className="hover:text-memoir-gold transition-colors">À propos</Link>
                        </nav>
                    </div>

                    {/* Partie Droite : Actions */}
                    <div className="flex items-center gap-6">
                        {/* Socials discrets */}
                        <div className="flex gap-4 text-memoir-gold border-r border-white/10 pr-6">
                            <Instagram className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                            <Facebook className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href="/login"
                                className="text-white/70 hover:text-memoir-gold transition-colors text-sm font-medium px-4 flex items-center"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Espace Pro
                            </Link>
                            <button
                                onClick={() => router.push('/login')}
                                className="text-white hover:text-memoir-blue transition-all text-sm font-medium px-6 border border-white/20 rounded-full py-2 hover:bg-white"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Se connecter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Header Layout */}
                <div className="md:hidden flex items-center justify-between h-14 relative">
                    <Link href="/" className="relative z-50">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 mt-2 w-24 h-24 bg-memoir-bg rounded-full p-1 shadow-[0_5px_15px_rgba(28,84,98,0.5)] border-2 border-white/10">
                            <Image
                                src="/logo.png"
                                alt="Commun Vivant"
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="text-memoir-gold p-2 focus:outline-none relative z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-memoir-gold/20 shadow-xl px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-200 h-screen">
                    <nav className="flex flex-col items-center gap-6 text-memoir-blue text-xl font-light" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        <Link href="/" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Accueil</Link>
                        <Link href="/#comment-ca-marche" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Comment ça marche</Link>
                        <Link href="/supports-physiques" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">Objets & supports</Link>
                        <Link href="/faq" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">FAQ</Link>
                        <Link href="/a-propos" onClick={toggleMenu} className="hover:text-memoir-gold transition-colors">À propos</Link>
                    </nav>

                    <div className="h-px bg-memoir-gold/20 w-full my-4"></div>

                    <div className="flex flex-col gap-4 items-center w-full">
                        <Link
                            href="/login"
                            onClick={toggleMenu}
                            className="text-memoir-blue/70 hover:text-memoir-gold transition-colors text-lg font-medium"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                            Espace Pro
                        </Link>
                        <button
                            onClick={() => { router.push('/login'); toggleMenu(); }}
                            className="bg-memoir-blue text-white px-6 py-4 rounded-full hover:bg-memoir-blue/90 transition-colors text-lg font-medium w-full text-center"
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
