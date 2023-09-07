# VicVijayakumar.com

This is the repository powering [vicvijayakumar.com](https://vicvijayakumar.com).

## Contributing

We would like you to follow [the standard commit format](/CONTRIBUTING.md).

## Code formatting guidelines

This project uses [Prettier](https://prettier.io) for very opinionated code *formatting*, and the Airbnb [JavaScript style guide](https://github.com/airbnb/javascript) for code *quality*. If you use Visual Studio Code, we request that you install the ESLint (`dbaeumer.vscode-eslint`) and Prettier - Code formatter (`esbenp.prettier-vscode`) extensions.

### Configuring your automatic code formatter in VSCode

To open settings.json, type Cmd-Shift-P on a Mac and click `Preferences: Open Settings (JSON)`. Here's an example recommended settings.json file:

    {
        "editor.formatOnSave": false,
        "files.insertFinalNewline": true,
        "files.trimTrailingWhitespace": true,
        "[markdown]": {
            "files.trimTrailingWhitespace": false
        },
        "[javascript]": {
            "editor.formatOnSave": true,
            "editor.defaultFormatter": "esbenp.prettier-vscode",
        }
    }

## Acknowledgment

This site uses a modified version of [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus).
