/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    black: '#0A0A0F',
                    dark: '#12121A',
                    cyan: '#00F5FF',
                    blue: '#0066FF',
                    violet: '#8B5CF6',
                    gray: '#A0A0B0',
                }
            },
            fontFamily: {
                display: ['"Suisse Intl"', 'sans-serif'],
                body: ['"Suisse Intl"', 'sans-serif'],
                sans: ['"Suisse Intl"', 'sans-serif'],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'scroll': 'scroll 40s linear infinite',
                'grid-move': 'grid-move 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'grid-move': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(40px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #0066FF 0%, #00F5FF 50%, #8B5CF6 100%)',
            }
        },
    },
    plugins: [],
}
