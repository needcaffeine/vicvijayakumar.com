# Commit style guidelines

## Why?
- automatic generating of the changelog (@TODO)
- simple navigation through git history (e.g. ignoring style changes)

## Format of the commit message:
```bash
<type>(<scope>): <subject>

<body>
```

## Example commit message:

```bash
fix(backend): make badge presigned links last longer than default

Set expiration time on the badge presigned links to 1 hour instead of 5 minutes to allow for easier downloads.

Fixes #5
```

## Message subject (first line)
The first line cannot be longer than 80 characters, the second line is always blank and
other lines should be wrapped at 120 characters. The type and scope should
always be lowercase as shown below.

### Allowed `<type>` values:

* **new** (new feature for the user, not a new feature for build script)
* **fix** (bug fix for the user, not a fix to a build script)
* **docs** (changes to the documentation)
* **style** (formatting, missing semi colons, etc; no production code change)
* **refac** (refactoring production code, eg. renaming a variable)
* **test** (adding missing tests, refactoring tests; no production code change)
* **build** (updating grunt tasks etc; no production code change)

### Example `<scope>` values:

* backend
* domain
* frontend
* docker
* config
* anything else (whatever you like, but keep it short)

The `<scope>` can be empty (e.g. if the change is a global or difficult
to assign to a single component), in which case the parentheses are
omitted.


## Message body
* uses the imperative, present tense: “change” not “changed” nor “changes”
* includes motivation for the change and contrasts with previous behavior

For more info about message body, see:

* http://365git.tumblr.com/post/3308646748/writing-git-commit-messages
* http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

---

This document is based on [Karma test runner's commit message convention]. See their
[commit history] for examples of properly-formatted commit messages.

[Karma test runner's commit message convention]: https://github.com/karma-runner/karma/blob/master/docs/dev/06-git-commit-msg.md
[commit history]: https://github.com/karma-runner/karma/commits/master
