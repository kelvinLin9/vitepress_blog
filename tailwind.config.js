/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.vue",
    "./docs/**/*.css",
    "./docs/**/*.ts",
    "./docs/**/*.md",
  ],
  // options: {
  //   safelist: ["html", "body"],
  // },
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};