/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.vue",
    "./docs/**/*.css",
    "./docs/**/*.ts",
    "./docs/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};