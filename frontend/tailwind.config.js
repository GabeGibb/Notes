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
        },
        boxShadow:{
          'custom': '0px 20px 20px 0px rgba(0, 0, 0, 0.09), 0px 5px 11px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 0px rgba(0, 0, 0, 0.10);'
        }
      },
    },
    plugins: [require("daisyui")],
  }