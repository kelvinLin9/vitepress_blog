/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.js",
    "./docs/**/*.vue",
    "./docs/**/*.css",
    "./docs/**/*.ts",
    "./docs/**/*.md",
    "./src/**/*.js",
    "./src/**/*.vue",
    "./src/**/*.css",
    "./src/**/*.ts",
    "./src/**/*.md",
  ],
  options: {
    safelist: ["html", "body"],
  },
};