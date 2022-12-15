# jest-allure2-reporter

[![npm version](https://badge.fury.io/js/jest-allure2-reporter.svg)](https://badge.fury.io/js/jest-allure2-reporter)
[![CI](https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml/badge.svg)](https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Example screenshot](docs/example.png)

## Installation

Before you start, make sure you have [Allure CLI](https://docs.qameta.io/allure/#_get_started) installed.

Your project should have [`jest`](https://jestjs.io) installed. The minimum supported version is `27.x`.

Run in your project:

```bash
npm install --save-dev jest-allure2-reporter
```

Edit your `jest.config.js`:

```diff
module.exports = {
  // ...
  reporters: [
    'default',
+   'jest-allure2-reporter',
  ],
};
```

## Customization

By default, the reporter will write the results to `allure-results` directory. You can change this by setting the `resultsDir` option:

```diff
module.exports = {
  // ...
  reporters: [
    'default',
    [
      'jest-allure2-reporter',
+     { resultsDir: 'my-results-dir' },
    ],
  ],
};
```

Below is a list of all the available options:

| Property      | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| `resultsDir`  | `string` | `<rootDir>/allure-results` | The directory where the results will be written to. |
| `packageName` | `string` | `require('./package.json').name` | The name of your package. |

## Usage

Run your tests with `jest` as usual and then view the results:

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

For more information, see the [Allure CLI documentation](https://docs.qameta.io/allure/#_get_started).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT License](LICENSE)
