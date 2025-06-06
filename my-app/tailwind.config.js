/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'dark-primary': '#121212',
                'dark-secondary': '#181818',
                'dark-tertiary': '#282828',
                'spotify-green': '#1DB954',
                'spotify-green-hover': '#1ed760',
            },
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
            },
            height: {
                "1/10": "10%",
                "9/10": "90%",
            },
            backgroundColor: {
                "app-black": "#121212",
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};