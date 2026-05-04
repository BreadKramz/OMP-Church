/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#2c3e50',
        accent: '#34495e',
        brown: '#8B4513',
        'blue-gray': '#2c3e50',
        'dark-blue': '#34495e',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}