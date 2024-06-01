import tailwindReactAriaComponents from 'tailwindcss-react-aria-components';
import type { Config } from 'tailwindcss';

import { colors, textColors } from './app/styles/colors';

const tailwindConfig = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // extend: {
    // },
    colors,
    textColor: textColors,
    screens: {
      xs: '320px',
      sm: '640px',
      md: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [tailwindReactAriaComponents({ prefix: 'rac' })],
} satisfies Config;

export default tailwindConfig;
