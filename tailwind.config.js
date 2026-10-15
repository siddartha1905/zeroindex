/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5', // Warm Alabaster Cream primary background
          200: '#F5EFE6',
          300: '#EFE6DA',
        },
        sage: {
          50: '#F7FAF8',
          100: '#F2F7F4', // Pastel Sage Tint
          200: '#E2ECE5',
          600: '#3D8C55',
          700: '#2E6F40', // Muted Sage Green primary accent
          800: '#235732',
        },
        indigo: {
          accent: '#4F46E5', // Soft Indigo secondary accent
          subtle: '#EEF2FF',
        },
        amber: {
          badge: '#D97706',
          tint: '#FEF3C7',
        },
        slate: {
          technical: '#1E293B', // High-Contrast Technical Slate
          codebg: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        handwritten: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 111, 64, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'sketch': '2px 3px 0px 0px rgba(30, 41, 59, 0.1)',
        'sketch-hover': '3px 5px 0px 0px rgba(46, 111, 64, 0.2)',
      }
    },
  },
  plugins: [],
}
