const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ['./components/**/*.js', './pages/**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('@tailwindcss/ui')],
}
