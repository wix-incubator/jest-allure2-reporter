---
sidebar_position: 1
---

# Overview

`jest-allure2-reporter` is a comprehensive tool for generating Allure test reports from your Jest tests. It offers broad support for an array of features that allow you to group and classify test cases, analyze your test environment, evaluate test history trends, and much more.

## Test Cases

### Labels

Any, or most of the labels can be attached both to test suites and test cases. Practically, this means a cascade-like inheritance of labels from the test suite to the test case level.

#### Severity

Determine the severity of each test case at both the individual and suite levels. The default severity is `normal`.

##### Test suite

The severity can be defined programmatically using the `$Severity` annotation function:

```js
import { $Severity } from 'jest-allure2-reporter/annotations';

$Severity('critical')
describe('Sanity: Login flow', () => {
    /* ... */
});
```

Alternatively, you can define the severity using JSDoc comments:

```js
describe('Sanity: Login flow', () => {
    /**
     * @severity critical
     */

    /* ... */
});
```

##### Test case

Same as for test suites, the severity can be defined programmatically using the `$Severity` annotation function for each test case:

```js
$Severity('critical')
it('should login with valid credentials', () => {
    /* ... */
});
```

Alternatively, you can define the severity using JSDoc comments:

```js
it('should login with valid credentials', () => {
    /**
     * @severity critical
     */

    /* ... test code ... */
});
```

### Labels

Attach various labels to your tests such as 'flaky', custom tags (value), custom labels (key=value), maintainer, lead, JIRA, TMS, or any other custom labels to provide additional context and detail.

### Descriptions and Links

Add rich context to your tests by providing descriptive texts and links, thereby making your test reports more informative and user-friendly.


#### Parameters

Utilize parameterized testing to avoid code duplication and reduce your maintenance costs:

```js
import {allure} from 'jest-allure2-reporter';

test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('sum(a, b) = (a + b)', (a, b, expected) => {
  allure.parameters({a, b, expected});
});
```

`jest-allure2-reporter` also supports attaching individual parameters, where you can also customize their `options`, e.g.:

```js
allure.parameter('expected', expected, { mode: 'hidden' });
```

The `options` parameter is an object of [type `Parameter`](https://github.com/allure-framework/allure-js/blob/224e6ce4b51c80e62961c4b2ba44408042d79930/packages/allure-js-commons/src/model.ts#L48-L53):

```typescript
export interface Parameter {
  name: string;
  value: string;
  excluded?: boolean;
  mode?: "hidden" | "masked" | "default";
}
```

The options allow you to fine-tune the way your parameters are displayed in the report:

* `excluded: true` - exclude the parameter from the report
* `mode: "hidden"` - hide the parameter value, e.g. when it is too long yet still useful for debugging
* `mode: "masked"` - mask the parameter value, e.g. when it contains sensitive information

The `allure.parameter` API can be used also on the top level, e.g.:

```typescript
import {allure} from 'jest-allure2-reporter';

describe('Login Screen (New)', () => {
  allure.parameter('featureToggles', { 'com.ShowNewLogin': 'true' });

  // ...
});

describe('Login Screen (Legacy)', () => {
  allure.parameter('featureToggles', { 'com.ShowNewLogin': 'false' });

  // ...
});
```

### Environment

**Environment and Execution**: Capture the details of your test environment and track every stage of test execution, including setup, test body, tear down, and inner steps. This feature also supports attachments (image, image diff, video, log) and displays test results with their corresponding errors.

### Execution

**Environment and Execution**: Capture the details of your test environment and track every stage of test execution, including setup, test body, tear down, and inner steps. This feature also supports attachments (image, image diff, video, log) and displays test results with their corresponding errors.

### Edge cases

**Execution Issues**: This feature helps you identify common issues that can interfere with test execution, such as duplicate names within the same suite, broken 'beforeAll' and 'afterAll' hooks, and problems arising from a failed test environment setup.

## Test Tree

**Grouping by Suite**: Group your test results according to Package, Parent suite, Suite, Subsuite, and Test case. This feature makes it easier to navigate through your test results and gain insights quickly.

**Grouping by Story**: Group your test results based on the narrative structure of Epic, Feature, and Story tags. This makes your test results more readable and easier to understand.

**Grouping by Package**: Jest Allure 2 Reporter allows you to group test results by "packages - test classes - test methods" offering a tree-like structure of test results for better visibility.

## Report-Scoped Features

**Environment**: Jest Allure 2 Reporter can capture a complete or a filtered view of your test environment (`process.env`). The filtered view can be adjusted based on `include`, `exclude` lists or callback functions.

**Executor (Build Agent)**: The tool captures and displays what build agent executed the test run, providing additional context for the report.

## Test Run History

**Duration**: Jest Allure 2 Reporter tracks the total duration of your test run, providing valuable information about your tests' performance over time.

**Trends**: Analyze trends in test execution with the History Trend feature. This feature includes trends on test duration, retries, and categories to provide a comprehensive overview of your test history.
