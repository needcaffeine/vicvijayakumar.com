/** @type {import("@types/prettier").Options} */
module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 4,
  useTabs: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss" /* Must come last */],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
