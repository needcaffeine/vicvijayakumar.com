---
title: Prettier and ESLint with the Airbnb JavaScript Style Guide in VS Code
description: Set up Prettier and ESLint with the Airbnb JavaScript Style Guide for React in Visual Studio Code
date: '2020-05-22T17:00:00-04:00'
---

## Show me the code!

If you want to get straight to the code for this post, you can [download it from GitHub](https://github.com/needcaffeine/eslint-prettier-react-example).

## Why

Code **linting** is a type of analysis that is frequently used to find problematic patterns that can introduce bugs, or code that doesn’t adhere to certain style guidelines.

Code **formatting** is a way to ensure that all your code looks the same; across your team, across your project. You spend far more time reading code than writing it, so be kind to your future self.

By using a linter and code formatter together you can stop spending time worrying about unimportant things like how many spaces there should be between a function name and the parentheses. Additionally, if you are part of a team, adopting a linter and formatter saves you valuable code review time because you won’t spend time bikeshedding about how wide your lines of code can be or whether to use spaces or tabs, etc.

## What

[ESLint](https://eslint.org/) is a linter for JavaScript that lets you plug in different rulesets that can keep your entire codebase consistent. Airbnb maintains a [style guide for JavaScript](https://github.com/airbnb/javascript) on Github that **comes with an ESLint plugin**. There are [many](https://google.github.io/styleguide/jsguide.html) [others](https://github.com/rwaldron/idiomatic.js/) [like](https://contribute.jquery.org/style-guide/js/) [it](https://github.com/standard/standard) but this is just the one I use.

If you’re confused about which one to pick, honestly don’t spend too much time having decision paralysis. The answer is that ANY style guide is better than none. The ability to reformat your entire codebase automatically means that picking the "wrong" style guide today has very little consequence next week.

[Prettier](https://prettier.io/) is an opinionated code formatter. There are very few options to argue over, and it removes a massive cognitive load for you and your team. Press save and your code is automatically formatted. <span role="img" aria-label="mind blown">🤯</span>

## How

Let’s get started.

First, I’m assuming that your project is JavaScript and you use React, and that the directory you are in right now has a package.json file used by the npm or yarn dependency managers. Adjust the commands below if you are an advanced user who uses yarn workspaces.

You will be using the terminal to run all these commands, whether that is your terminal inside Visual Studio Code, or a separate terminal application.

I'm providing commands for npm. If you use yarn, just switch all instances of `npm install --save-dev` with `yarn add --dev`.

### 1. Install npm

See instructions on [github.com/npm/cli](https://github.com/npm/cli)

### 2. Install npx

    npm install -g npx

### 3. Install eslint and Prettier

    npm install --save-dev eslint prettier

### 4. Install the Airbnb style config for ESLint, and all dependencies

    npx install-peerdeps --dev eslint-config-airbnb-base

The npx utility automatically detects if you are using yarn or npm to manage your codebase, and runs the appropriate commands. If you do not have npx, you will need to manually install the [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) package and all peer dependencies.

### 5. Display Prettier suggestions as ESLint rules

    npm install --save-dev eslint-plugin-prettier

### 6. Turn off all unnecessary ESLint rules that conflict with Prettier

    npm install --save-dev eslint-config-prettier

### 7. Install the ESLint and Prettier extensions for VS Code

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 8. Set up ESLint and Prettier configuration

For this, your project needs .eslintrc and a .prettierrc file. This is the most basic configuration you can provide:

**.eslintrc:**

    {
        "extends": ["airbnb", "prettier"],
        "plugins": ["prettier"],
        "rules": {
        "prettier/prettier": ["error"]
        }
    }

**.prettierrc:**

    {
        "printWidth": 100,
        "semi": false,
        "singleQuote": true,
        "tabWidth": 4,
        "trailingComma": "es5"
    }

### 9. Set up VS Code to format your code automatically on save

Open your user settings in VS Code (on a Mac, this is Cmd-Shift-P) and click `Preferences: Open Settings (JSON)`. You will need to add this section:

    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    }

### 10. Quit and reopen VS Code and watch the magic happen!

[![VS Code format on save magic!](/static/img/blog/eslint-airbnb-style-guide-prettier/format-on-save.gif)](/static/img/blog/eslint-airbnb-style-guide-prettier/format-on-save.gif)


In an upcoming second part, we are going to explore setting up accessibility plugins in ESLint so that you don't ignore the needs of disabled users.


As a reminder, you can [download the code for this post](https://github.com/needcaffeine/eslint-prettier-react-example) from GitHub.
