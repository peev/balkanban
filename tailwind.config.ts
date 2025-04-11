import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'board-bg': '#026AA7',
        'list-bg': '#101204',
        'card-bg': '#22272B',
        'card-hover': '#2C343A',
      },
    },
  },
  plugins: [],
}
export default config 