/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyan-dark": "#4793AF",
        bluee: "#59D5E0",
        "orange-dark": "#FAA300",
        "orange-light": "#FFC470",
        yelloww: "F5DD61",
        redd: "#DD5746",
        pinkk: "#F4538A",
        brownn: "8B322C",
      },
    },
  },
  plugins: [],
};
