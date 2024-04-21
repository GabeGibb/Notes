export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      colors:{
        'light-green': '#8EB567',
        'white': "#EEEEEE",
      },
      extend: {
        fontFamily:{
          'Poppins': ['Poppins', 'sans-serif']
        }
      },
    },
    plugins: [require("daisyui")],
  }