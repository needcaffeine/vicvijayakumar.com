const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('@tailwindcss/ui')],
}
