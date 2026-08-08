/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', '"Spectral"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['"Inter"', '-apple-system', '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', '"SF Mono"', 'Consolas', 'monospace'],
      },
      colors: {
        // All semantic colors are CSS custom properties in src/styles/tokens.css
        // Tailwind is configured for utilities and @apply compatibility
      },
    },
  },
  plugins: [],
};
