---
slug: /
hide_table_of_contents: true
---

# Getting Started

:::caution

This website version refers to the unreleased version of `jest-allure2-reporter` and is not yet available
anywhere. Please use GitHub docs for the latest stable version.

:::

Before you start, make sure you have [Allure CLI](https://docs.qameta.io/allure/#_get_started) installed globally:

```bash
$ allure --version
2.22.1
```

To use `jest-allure2-reporter` in your project, you have to be using
[`jest`](https://jestjs.io) as your test runner. The minimum supported version is `27.x`.

:::tip

Use Jest's default `jest-circus` runner for the full reporting functionality. Reports generated with any other runners like `jest-jasmine` will be incomplete and contain only the most essential information.

:::

## Installation

Run in your project:

```bash
npm install --save-dev jest-allure2-reporter
```

Edit your Jest configuration file, e.g.:

```js title="jest.config.js"
 /** @type {import('@jest/types').Config.InitialOptions} */
 module.exports = {
    // …
// highlight-start
    testEnvironment: 'jest-allure2-reporter/environment-node',
    reporters: [
      'default',
      'jest-allure2-reporter',
    ],
// highlight-end
   // …
 };
```

## Usage

Run your tests with `jest` as usual, e.g.:

```bash
npm test
# jest ...
# PASS  ./my.test.js
```

and then browse the results stored in the `allure-results` directory via:

```bash
allure serve
```

If you want to generate a static report, e.g., for CI, run:

```bash
allure generate
```

:::tip

For more information on `allure` CLI itself, see the documentation on its [official website](https://docs.qameta.io/allure/#_get_started).

:::
