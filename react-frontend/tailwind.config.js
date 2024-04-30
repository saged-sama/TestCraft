/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "landing": ['Merriweather']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "lemonade", "wireframe", "dracula", "cmyk", "corporate", "business",
      {
        newtheme: {

          "primary": "#22c55e",

          "secondary": "#34d399",

          "accent": "#f59e0b",

          "neutral": "#d1d5db",

          "base-100": "#f5f5f4",

          "info": "#6366f1",

          "success": "#00ff00",

          "warning": "#f59e0b",

          "error": "#f87171",
        },
      },],
  },
}

