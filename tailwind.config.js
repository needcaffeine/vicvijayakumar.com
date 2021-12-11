const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './data/**/*.{md,mdx}',
    ],
    preserveHtmlElements: true,
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
    'tailwindCSS.includeLanguages': {
        plaintext: 'html',
    },
}
