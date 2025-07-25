/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        buttonBgColor:"#0067FF", // Corrected the spelling here
        yellowColor:"#FEB60D",
        purpleColor:"#9771FF",
        irisBlueColor:"#01B5C5",
        textColor:"#4E545F"
      },
      boxShadow:{
        panelShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
}
