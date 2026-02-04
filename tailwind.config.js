/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'memoir-bg': '#F5F4F2',   // Beige
        'memoir-blue': '#0F2A44', // Bleu Nuit (plus de violet)
        'memoir-gold': '#C9A24D', // Or
        'memoir-light': '#F5F4F2', // Alias pour le texte clair (Beige)
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        calli: ['var(--font-calli)'],
      },
    },
  },
  plugins: [],
}
