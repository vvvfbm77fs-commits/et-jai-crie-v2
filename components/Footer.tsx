import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-memoir-blue text-white/60 py-8 px-4 text-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-medium text-white/80 mb-1">Et j'ai crié</p>
            <p className="text-xs">Marque sensible et éclairée</p>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/mentions-legales"
              className="hover:text-memoir-gold transition-colors"
            >
              Mentions légales
            </Link>
            <Link 
              href="/confidentialite"
              className="hover:text-memoir-gold transition-colors"
            >
              Confidentialité
            </Link>
            <Link 
              href="/droit-oubli"
              className="hover:text-memoir-gold transition-colors"
            >
              Droit à l'oubli
            </Link>
            <a 
              href="mailto:contact@etjaicrie.fr"
              className="hover:text-memoir-gold transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-white/10 text-xs">
          <p>© {new Date().getFullYear()} Et j'ai crié • Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
