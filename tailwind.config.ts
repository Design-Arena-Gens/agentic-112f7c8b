import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          925: '#0f172a'
        }
      },
      fontFamily: {
        display: ['var(--font-manrope)'],
        body: ['var(--font-inter)']
      }
    }
  },
  plugins: []
};

export default config;
