/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hhs-blue': '#38B5FF',
        'hhs-blue-dark': '#2A8FCC',
        'hhs-blue-light': '#5CC5FF',
      },
    },
  },
  plugins: [],
}
