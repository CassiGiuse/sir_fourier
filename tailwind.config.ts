import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
};
export default config;
