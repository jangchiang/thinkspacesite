import type { Config } from 'tailwindcss'
import baseConfig from '@thinkspace/config/tailwind'

const config: Config = {
  ...baseConfig,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      fontFamily: {
        sans: ['var(--font-kanit)', 'system-ui', 'sans-serif'],
        kanit: ['var(--font-kanit)', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
