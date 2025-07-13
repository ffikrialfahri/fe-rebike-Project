/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "brand-primary": "#0d9488", // teal-600
                "brand-secondary": "#ccfbf1", // teal-100
                "background-light": "#f8fafc", // slate-50
                "text-dark": "#1e293b", // slate-800
                "text-light": "#64748b", // slate-500
                "panel-bg": "#f1f5f9", // slate-100
                "card-bg": "#ffffff",
                "border-color": "#e2e8f0", // slate-200
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            keyframes: {
                'fade-in': {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-right': {
                '0%': { opacity: '0', transform: 'translateX(-20px)' },
                '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-in-right': 'fade-in-right 0.5s ease-out',
            },
        },
    },
    plugins: [],
};