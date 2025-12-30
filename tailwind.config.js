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
        'memoir-bg': '#F5F5F5',
        'memoir-blue': '#243b55',
        'memoir-gold': '#C9A961',
        'memoir-light': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
