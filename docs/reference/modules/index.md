---
id: "index"
title: "Module: index"
sidebar_label: "index"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [JestAllure2Reporter](../classes/.JestAllure2Reporter)

## References

### default

Renames and re-exports [JestAllure2Reporter](../classes/.JestAllure2Reporter)

## Type Aliases

### JestAllure2ReporterOptions

Ƭ **JestAllure2ReporterOptions**: `Object`

Options to use with jest-allure2-reporter package in Jest config

**`Example`**

```ts
{
 *   // ...
 *   reporters: [
 *     'default',
 *     [
 *     'jest-allure2-reporter',
 *     {
 *       resultsDir: 'allure-results',
 *       packageName: 'my-package',
 *       errorsAsFailedAssertions: true,
 *     },
 * }
```

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `environmentInfo` | `boolean` \| `JestAllure2Reporter$EnvironmentInfoCustomizer` | Getter function to extract environment information from the test environment. By default, the environment information is extracted from the `process.env` object. Use boolean `false` to disable environment information. **`Default`** ```ts true ``` |
| `errorsAsFailedAssertions` | `boolean` | Treat thrown errors as failed assertions. By default, the reporter distinguishes between failed assertions and thrown errors. The former are reported as FAILED tests, the latter as BROKEN tests. **`Default`** ```ts false ``` |
| `executorInfo` | `JestAllure2Reporter$TestCaseExtractor`<`Allure$ExecutorInfo`\> | Getter function to extract executor information from the test environment. The executor is the build agent or any other system that initiates the test run. |
| `overwriteResultsDir` | `boolean` | Whether the reporter should delete the results directory before running tests. **`Default`** ```ts true ``` |
| `resultsDir` | `string` | Path to the directory where the report will be generated. **`Default`** ```ts <rootDir>/allure-results ``` |
| `testInfo` | `Partial`<`JestAllure2Reporter$TestInfoCustomizer`\> | - |

#### Defined in

[packages/library/src/JestAllure2ReporterOptions.ts:19](https://github.com/wix-incubator/jest-allure2-reporter/blob/1921ba4/packages/library/src/JestAllure2ReporterOptions.ts#L19)
