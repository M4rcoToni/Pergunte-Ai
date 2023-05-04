/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/*.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.tsx",
    "./src/routes/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'trans': {
          100: '#ffffff25'
        },
        'gray': {
          500: '#2d2835', // card
          600: '#2f273c', //
          back: '#262130' //background
        },
        'purple': {
          mid: '#7732c4',
        },
        'grad': 'linear-gradient(90deg, #9572FC 0%, #00d4ff 50.52%, #e700ff 100%)',
      },
      fontFamily: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold'
      },
      backgroundColor: {
        grad: 'linear-gradient(90deg, #453534 , rgba(9,98,121,1) , rgba(231,0,255,1))'
      }
    },
    plugins: [],
  }
}
