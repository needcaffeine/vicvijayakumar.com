const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
    purge: {
        content: [
            './components/**/*.{js,ts,jsx,tsx}',
            './pages/**/*.{js,ts,jsx,tsx}',
            './_content/**/*.{md,mdx}',
        ],
        preserveHtmlElements: true,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('@tailwindcss/ui')],
    'tailwindCSS.includeLanguages': {
        plaintext: 'html',
    },
}
