/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#121720',
        'dark-studio': '#121720',
        'slate-navy': '#161D27',
        'slate-nav': '#1B222C',
        'slate-card': '#212A38',
        'slate-card-hover': '#283344',
        'slate-light': '#F8FAFC',
        'slate-border': 'rgba(255, 255, 255, 0.1)',
        'surface-card': '#1E2633',
        'surface-card-hover': '#263040',
        crimson: '#8B182B',
        'crimson-light': '#A61C33',
        'crimson-dark': '#6B1121',
        'matte-orange': '#8B182B',
        'burnt-orange': '#8B182B',
        'coral-orange': '#8B182B',
        'coral-bright': '#A61C33',
        'silver-text': '#E2E8F0',
        'muted-gray': '#94A3B8',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Exo 2"', 'Orbitron', 'sans-serif'],
        racing: ['"Exo 2"', 'Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'matte-glow': '0 4px 20px rgba(139, 24, 43, 0.4)',
        'coral-glow': '0 4px 20px rgba(139, 24, 43, 0.4)',
        'crimson-glow': '0 4px 20px rgba(139, 24, 43, 0.4)',
        'crimson-lg': '0 8px 30px rgba(139, 24, 43, 0.5)',
        'dark-card': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
        'light-card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
