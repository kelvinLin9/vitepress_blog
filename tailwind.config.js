/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{vue,js,ts,jsx,tsx,css,md,html,scss}",
    "./src/**/*.{vue,js,ts,jsx,tsx,css,md,html,scss}",
  ],
  options: {
    safelist: ["html", "body"],
  },
  theme: {
    screens: {
      xs: '360px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1440px',
    },
    extend: {
      //
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};