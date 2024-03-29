---
title: Prettier, ESLint, & the Airbnb Style Guide in VS Code
description: We spend far more time reading code than writing it. Set up a linter and code formatter so you don't spend time worrying about how your code should look, and automatically fix a lot of common errors.
publishDate: '2020-05-22T17:00:00-04:00'
updatedDate: '2021-12-05T12:00:00-04:00'
---

Code **linting** is a type of analysis that is frequently used to find problematic patterns that can introduce bugs, or code that doesn’t adhere to certain style guidelines. ESLint does not enforce any strict standards on you. You choose the rules that you want to enable, and ESLint then ensures that you follow those rules.

Code **formatting** is a way to ensure that all your code looks the same; across your team, across your project. You spend far more time reading code than writing it, so be kind to your future self. Prettier will ensure that your entire project follows a consistent coding style.

![VS Code format on save magic!](./format-on-save.gif)

## Why should you use a linter and code formatter together

By using a linter and code formatter together you will reduce the number of non-obvious bugs in your code, spend considerably less time worrying about aesthetics, and focus instead on the business value your code adds. You can avoid discussions like "should I be using tabs or spaces?" and "does the curly brace go at the end of the line or on the next line?".

Additionally, if you are part of a team, adopting a linter and formatter saves your team valuable code review time because you won’t spend time bikeshedding about how wide the lines of code can be, or whether to use nested ternary operators, or any of many other different things.

Adopt a linter and code formatter, make it part of the CI process, and free up your team's bandwidth for real problems.

## What is ESLint? What is Prettier?

[ESLint](https://eslint.org/) is a linter for JavaScript that lets you plug in different rulesets that can keep your entire codebase consistent. Airbnb maintains a [style guide for JavaScript](https://github.com/airbnb/javascript) on Github that **comes with an ESLint plugin**. There are [many](https://google.github.io/styleguide/jsguide.html) [others](https://github.com/rwaldron/idiomatic.js/) [like](https://contribute.jquery.org/style-guide/js/) [it](https://github.com/standard/standard) but this is just the one I use.

If you’re confused about which one to pick, honestly don’t spend too much time having decision paralysis. The answer is that ANY style guide is better than none. The ability to reformat your entire codebase automatically means that picking the "wrong" style guide today has very little consequence next week.

[Prettier](https://prettier.io/) is an opinionated code formatter. There are very few options to argue over, and it removes a massive cognitive load for you and your team. Press save and your code is automatically formatted. <span role="img" aria-label="mind blown">🤯</span>

## How to get ESLint and Prettier working together

Let’s get started.

First, I’m assuming that your project is JavaScript / TypeScript and you use React, and that the directory you are in right now has a package.json file used by the npm or yarn dependency managers. Adjust the commands below if you are an advanced user who uses yarn workspaces.

You will be using the terminal to run all these commands, whether that is your terminal inside Visual Studio Code, or a separate terminal application.

I'm providing commands for npm. If you use yarn, just switch all instances of `npm install --save-dev` with `yarn add --dev`.

### 1. Install npm

How to install npm isn't really in the scope of this article. See instructions on [github.com/npm/cli](https://github.com/npm/cli) for how to install it for your specific OS.

### 2. Install npx globally

npx is a tool intended to make it really easy to use CLI tools and other executables hosted on the npm registry.

```bash
npm install -g npx
```

### 3. Install ESLint and Prettier

```bash
npm install --save-dev eslint prettier
```

### 4. Install the Airbnb style config for ESLint, and all dependencies

```bash
npm install --save-dev eslint-config-airbnb
npx install-peerdeps --dev eslint-config-airbnb-base
```

The npx utility automatically detects if you are using yarn or npm to manage your codebase, and runs the appropriate commands. If you do not have npx, you will need to manually install the [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) package and all peer dependencies.

### 5. Display Prettier suggestions as ESLint rules

```bash
npm install --save-dev eslint-plugin-prettier
```

### 6. Turn off all unnecessary ESLint rules that conflict with Prettier

```bash
npm install --save-dev eslint-config-prettier
```

### 7. Set up React-specific linting rules

```bash
npm install --save-dev eslint-plugin-react
```

The configuration below enables all recommended options, but if you want any custom configuration see [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react).

### 8. Enforce the Rules of Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

```bash
npm install --save-dev eslint-plugin-react-hooks
```

If you want to add custom configuration, see [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks).

### 9. Identify accessibility issues in your work

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

For custom configuration, see [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

### 10. Install the ESLint and Prettier extensions for VS Code

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 11. Install the TypeScript ESLint Parser (optional)

This is an ESLint parser which allows ESLint to lint TypeScript code. This will also work for you if you have a codebase that is a mix of TS and JS files.

```bash
npm install --save-dev typescript @typescript-eslint/parser
```

If you decide not to install this parser, be sure to remove this parser line from the top of the .eslintrc line below.

### 12. Set up ESLint and Prettier configuration

For this, your project needs .eslintrc and a .prettierrc file. This is the most basic configuration you can provide:

```js:.eslintrc
{
    "parser": "@typescript-eslint/parser",
    "extends": [
        "airbnb",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "plugins": [
        "prettier",
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "prettier/prettier": ["error"],
        "react-hooks/exhaustive-deps":          "warn",
        "react-hooks/rules-of-hooks":           "error",
        "react/jsx-filename-extension":         [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-indent-props":               [2, 4],
        "react/jsx-indent":                     [2, 4],
        "react/jsx-one-expression-per-line":    [0],
        "react/prefer-stateless-function":      [1],
        "react/static-property-placement":      [1, "property assignment"]
    }
}
```

```js:.prettierrc
{
    "printWidth": 100,
    "semi": false,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "es5"
}
```

### 13. Set up VS Code to format your code automatically on save

Open your user settings in VS Code (on a Mac, this is Cmd-Shift-P) and click `Preferences: Open Settings (JSON)`. You will need to add this section:

```js
"[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
},
"[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

Restart VS Code and watch the magic happen!

## Show me the code

I originally made an [example project](https://github.com/needcaffeine/eslint-prettier-react-example) for this post, but it quickly got out of date in terms of dependency versions. So instead, you can also look at the source for this very site, which uses [Prettier, ESLint, the Airbnb Style Guide, TypeScript, and Next.js](https://github.com/needcaffeine/vicvijayakumar.com).
