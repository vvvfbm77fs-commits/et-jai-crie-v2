import type { Metadata } from 'next';
import { Inter, Crimson_Text, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const crimson = Crimson_Text({ 
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-calli',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Et j\'ai crié - Mémoire',
  description: 'Questionnaire de transmission de mémoire avec dignité et humanité',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${crimson.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
