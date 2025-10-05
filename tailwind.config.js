/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        romantic: ["'Dancing Script'", "cursive"],
      },
      colors: {
        romanticPink: "#ffb6c1",
        romanticBg: "#fff0f5",
      },
    },
  },
  plugins: [],
};
