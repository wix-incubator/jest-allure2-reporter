# API Reference

:::caution

This website version refers to the unreleased version of `jest-allure2-reporter`, partially available as `2.0.0-alpha.*` release.
Please use GitHub docs for the latest stable version, `1.x.x`.

:::


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

| Property                   | Type                     | Default                          | Description                                                                                                                                                                                                                                |
|----------------------------|--------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `errorsAsFailedAssertions` | `boolean`                | `false`                          | Treat thrown errors as failed assertions. By default, the reporter distinguishes between failed assertions and thrown errors. The former are reported as FAILED tests, the latter as BROKEN tests.                                         |
| `getEnvironmentInfo`       | `function` or `boolean`  | `true`                           | Can be customized with an async function to extract environment information from the test environment. By default, the environment information is extracted from the `process.env` object. Use `false` to disable environment information. |
| `overwriteResultsDir`      | `boolean`                | `true`                           | Whether the reporter should delete the results directory before running tests.                                                                                                                                                             |
| `packageName`              | `string`                 | `require('./package.json').name` | Add an extra label to each test case with the package name. Helpful when running tests from multiple packages in a monorepo.                                                                                                               |
| `resultsDir`               | `string`                 | `<rootDir>/allure-results`       | Path to the directory where the report will be generated.                                                                                                                                                                                  |
