/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global Brand Colors (Part 4)
        brand: {
          bg: '#F7F5EF',          // Main background
          surface: '#FFFFFF',     // Primary surface
          surface2: '#F0F1EB',    // Secondary surface
          ink: '#25352D',         // Primary ink
          textSecondary: '#5F6C64', // Secondary text
          textSubtle: '#69766D',  // Subtle text
          green: '#245B4B',       // Primary brand green
          interactive: '#28755E', // Interactive green
          border: '#DDE2DA',      // Border
          warm: '#B77B59',        // Warm accent
          divider: '#E6E8E1',     // Soft divider
        },
        // Individual Pillar Accents (Part 4)
        pillar: {
          workbench: {
            dark: '#346C53',
            soft: '#E0EBDF',
          },
          atlas: {
            dark: '#496D91',
            soft: '#E1EAF2',
          },
          bridge: {
            dark: '#956A43',
            soft: '#F1E5D9',
          },
          readout: {
            dark: '#765C90',
            soft: '#EBE5F0',
          },
          folio: {
            dark: '#935F5D',
            soft: '#F2E5E1',
          },
        },
        // Preserved tokens for DLD components compatibility
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5EFE6',
          300: '#EFE6DA',
        },
        sage: {
          50: '#F7FAF8',
          100: '#F2F7F4',
          200: '#E2ECE5',
          600: '#3D8C55',
          700: '#2E6F40',
          800: '#235732',
        },
        indigo: {
          accent: '#4F46E5',
          subtle: '#EEF2FF',
        },
        amber: {
          badge: '#D97706',
          tint: '#FEF3C7',
        },
        slate: {
          technical: '#1E293B',
          codebg: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
        handwritten: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 91, 75, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'paper': '0 1px 3px 0 rgba(37, 53, 45, 0.04), 0 1px 2px -1px rgba(37, 53, 45, 0.02)',
        'lift': '0 10px 25px -5px rgba(37, 53, 45, 0.08), 0 8px 10px -6px rgba(37, 53, 45, 0.04)',
      }
    },
  },
  plugins: [],
}
