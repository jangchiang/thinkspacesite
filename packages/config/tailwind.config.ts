import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Think Space brand colors — teal-green (logo) accent
        brand: {
          50: '#ecfdf8',
          100: '#d0f9ee',
          200: '#a3f1dd',
          300: '#6ee5c9',
          400: '#38d2af',
          500: '#16c79a',
          600: '#11a88a',
          700: '#0f8870',
          800: '#116b5a',
          900: '#12574b',
          950: '#04322b',
        },
        // Deep corporate navy — headings, dark surfaces
        navy: {
          50: '#eef2f8',
          100: '#d6e0ef',
          200: '#aec2dd',
          300: '#7e9cc4',
          400: '#4f72a4',
          500: '#2f5183',
          600: '#1f3c66',
          700: '#163052',
          800: '#0f2342',
          900: '#0b2447',
          950: '#06152c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        thinkspace: {
          // Primary - Teal-green (logo accent: actions, links)
          'primary': '#16c79a',
          'primary-content': '#052e26',

          // Secondary - Deep navy (primary buttons, dark surfaces)
          'secondary': '#171717',
          'secondary-content': '#ffffff',

          // Accent - Deeper teal (hover)
          'accent': '#0f8870',
          'accent-content': '#ffffff',

          // Neutral - Slate
          'neutral': '#1a2433',
          'neutral-content': '#ffffff',

          // Base colors - clean white canvas + cool gray
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
          'base-300': '#e5e5e5',
          'base-content': '#1a2433',

          // State colors
          'info': '#2563eb',
          'info-content': '#ffffff',
          'success': '#16c79a',
          'success-content': '#052e26',
          'warning': '#d9a21b',
          'warning-content': '#1a2433',
          'error': '#e5484d',
          'error-content': '#ffffff',

          // Component styling - sharper, formal
          '--rounded-box': '0.375rem',
          '--rounded-btn': '0.25rem',
          '--rounded-badge': '0.25rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.375rem',
        },
        thinkspaceDark: {
          // Primary - Brighter teal for dark surfaces
          'primary': '#2dd4b0',
          'primary-content': '#04221c',

          // Secondary - Deep navy surface (kept dark in BOTH themes so bg-secondary
          // panels — hero, CTAs, Logix band — never invert. Headings use base-content.)
          'secondary': '#171717',
          'secondary-content': '#ffffff',

          // Accent - Light teal
          'accent': '#5eead4',
          'accent-content': '#04221c',

          // Neutral
          'neutral': '#a3a3a3',
          'neutral-content': '#171717',

          // Base colors - neutral near-black (matches previous/live dark theme background)
          'base-100': '#171717',
          'base-200': '#262626',
          'base-300': '#404040',
          'base-content': '#f5f5f5',

          // State colors
          'info': '#3b82f6',
          'info-content': '#ffffff',
          'success': '#2dd4b0',
          'success-content': '#04221c',
          'warning': '#eab308',
          'warning-content': '#0b1a2e',
          'error': '#f87171',
          'error-content': '#0b1a2e',

          // Component styling
          '--rounded-box': '0.375rem',
          '--rounded-btn': '0.25rem',
          '--rounded-badge': '0.25rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.98',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.375rem',
        },
      },
    ],
    darkTheme: 'thinkspaceDark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
  },
}

export default config
