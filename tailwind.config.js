/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBgColor: "#7FBA76",
                primaryTextColor: "#7FBA76",
                secondBgColor: "#1AA873",
                secondTextColor: "#1AA873",
            },
        },
    },
    plugins: [require("daisyui"), require("tailwindcss-animated")],
};
