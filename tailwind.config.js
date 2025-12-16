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
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' },
                    '50%': { opacity: .7, boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)' },
                },
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, #0066FF 0%, #00F5FF 50%, #8B5CF6 100%)',
                'text-gradient': 'linear-gradient(90deg, #00F5FF, #8B5CF6)',
                'card-glow': 'radial-gradient(circle at center, rgba(0,245,255,0.08) 0%, transparent 70%)',
            }
        },
    },
    plugins: [],
}
