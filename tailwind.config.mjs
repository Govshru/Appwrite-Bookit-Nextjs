/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-brown': '#AC8968',
        
        'custom-darkpink':'#9A1750',
        'custom-lightpink':'#E3AFBC',
        'custom-lightblue':'#E3E2DF',
        


      },
    },
  },
  plugins: [],
};
