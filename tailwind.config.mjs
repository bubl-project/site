/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a8fb66",
        "primary-variant": "#4da9d6",
        secondary: "#29617b",
        "secondary-variant": "#2fb2ab",
        thirdly: "#150c62",
        success: "#47cb66",
        warning: "#ffc107",
        error: "#dc3545",
        info: "#007bff",
        background: "#f3f7f7",
        label: "#6e6e6e",
        border: "#c0c0c0",
        inactive: "#dddddd",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
