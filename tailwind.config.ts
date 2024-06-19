import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
       'desktopBg': "url('/pattern-bg-desktop.png')",
       'mobileBg': "url('/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
export default config;
