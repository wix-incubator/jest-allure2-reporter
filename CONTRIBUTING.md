# CONTRIBUTING

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
npm run fixtures:results
```

Run tests:

```bash
npm test
```

To view the test results, generate the Allure report:

```bash
npm run fixtures:allure
```

Start the Allure server:

```bash
npm start
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