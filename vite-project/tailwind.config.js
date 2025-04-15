import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Adjust based on your project structure
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [
        forms,
        typography,
    ],
};