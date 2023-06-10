# Getting Started

Before you start, make sure you have [Allure CLI](https://docs.qameta.io/allure/#_get_started) installed.

Your project should have [`jest`](https://jestjs.io) installed. The minimum supported version is `27.x`.

Run in your project:

```bash
npm install --save-dev jest-allure2-reporter
```

Edit your Jest configuration file, e.g.:

```diff title="jest.config.js"
 /** @type {import('@jest/types').Config.InitialOptions} */
 module.exports = {
 // ...
+   testEnvironment: 'jest-allure2-reporter/environment-node',
+   reporters: [
+     'default',
+     'jest-allure2-reporter',
+   ],
 };
```

## Usage

Run your tests with `jest` as usual, e.g.:

```bash
npm test
```

and then view the results:

```bash
allure serve
```

If you use a custom `resultsDir`, you should specify it in the `allure serve` command, e.g.:

```bash
allure serve your-results-dir # if you use a custom `resultsDir`
```

If you want to generate a static report, e.g., for CI, run:

```bash
allure generate
```

For more information on `allure` CLI, see the documentation on the [official website](https://docs.qameta.io/allure/#_get_started) of Qameta.
