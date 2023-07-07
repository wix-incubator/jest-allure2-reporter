---
sidebar_position: 4
---

# Contributing

We welcome issues and pull requests from the community. :purple_heart:

## Issues

Open an issue on the [issue tracker](https://github.com/wix-incubator/jest-allure2-reporter/issues).

Please include the following information:

* Operating system
* Node.js version
* Jest version
* `jest-allure2-reporter` version
* Reproduction repository
* Steps to reproduce

## Pull requests

### Setup

This is a standard Node.js project. You'll need to have Node.js installed.

Fork this repository, clone and install dependencies:

```bash
npm install
```

### Running tests

Generate fixtures:

```bash
npm run record
```

> If you want to check compatiblity with a specific Jest version, you can use the `JEST_VERSION` environment variable:

```bash
JEST_VERSION=27 npm run record
```

Run tests:

```bash
npm test
```

To view the test results, regenerate the full version of the fixtures:

```bash
npm run start
```

> If you want to check compatiblity with a specific Jest version, you can use the `JEST_VERSION` environment variable:

```bash
JEST_VERSION=27 npm run start
```

To re-run the Allure CLI server, run:

```bash
npm run serve
```

### Checking your code

Before committing, run the linter and tests:

```bash
npm run lint
npm test
```

To create a commit, use [Commitizen](https://github.com/commitizen/cz-cli):

```bash
npx cz
```

and follow the instructions. We adhere to Angular's [commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

Thanks in advance for your contribution!
