/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/screensUser/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00AA55",
        secondary: "#FF6347",
        accent: "#FFD700",
        background: "#F5F5F5",
        textPrimary: "#333333",
        textSecondary: "#666666",
      },
    },
    fontFamily: {
      outfitLight: ["Outfit-Light", "sans-serif"],
      outfitRegular: ["Outfit-Regular", "sans-serif"],
      outfitMedium: ["Outfit-Medium", "sans-serif"],
      outfitSemiBold: ["Outfit-SemiBold", "sans-serif"],
      outfitBold: ["Outfit-Bold", "sans-serif"],
      outfitExtraBold: ["Outfit-ExtraBold", "sans-serif"],
      outfitBlack: ["Outfit-Black", "sans-serif"],
      outfitExtraBlack: ["Outfit-ExtraBlack", "sans-serif"],
    },
  },
  plugins: [],
};
