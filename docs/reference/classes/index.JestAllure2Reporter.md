---
id: "index.JestAllure2Reporter"
title: "Class: JestAllure2Reporter"
sidebar_label: "JestAllure2Reporter"
custom_edit_url: null
---

[index](../modules/).JestAllure2Reporter

## Hierarchy

- `JestMetadataReporter`

  ↳ **`JestAllure2Reporter`**

## Constructors

### constructor

• **new JestAllure2Reporter**(`globalConfig`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalConfig` | `GlobalConfig` |
| `options` | `Partial`<[`JestAllure2ReporterOptions`](../modules/#jestallure2reporteroptions)\> |

#### Overrides

JestMetadataReporter.constructor

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:28](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L28)

## Properties

### #private

• `Private` **#private**: `any`

#### Inherited from

JestMetadataReporter.#private

#### Defined in

node_modules/jest-metadata/dist/reporter.d.ts:7

___

### \_emitter

• `Private` `Readonly` **\_emitter**: `ReporterEmitter`

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:24](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L24)

___

### \_options

• `Private` `Readonly` **\_options**: `Partial`<[`JestAllure2ReporterOptions`](../modules/#jestallure2reporteroptions)\>

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:25](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L25)

___

### \_testRunContext

• `Private` `Readonly` **\_testRunContext**: `TestRunContext`

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:26](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L26)

## Methods

### getLastError

▸ **getLastError**(): `void` \| `Error`

#### Returns

`void` \| `Error`

#### Overrides

JestMetadataReporter.getLastError

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:105](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L105)

___

### onRunComplete

▸ **onRunComplete**(`testContexts`, `aggregatedResult`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `testContexts` | `Set`<`TestContext`\> |
| `aggregatedResult` | `AggregatedResult` |

#### Returns

`Promise`<`void`\>

#### Overrides

JestMetadataReporter.onRunComplete

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:97](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L97)

___

### onRunStart

▸ **onRunStart**(`aggregatedResult`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `aggregatedResult` | `AggregatedResult` |
| `options` | `ReporterOnStartOptions` |

#### Returns

`Promise`<`void`\>

#### Overrides

JestMetadataReporter.onRunStart

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:56](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L56)

___

### onTestCaseResult

▸ **onTestCaseResult**(`test`, `testCaseResult`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `Test` |
| `testCaseResult` | `AssertionResult` |

#### Returns

`void`

#### Overrides

JestMetadataReporter.onTestCaseResult

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:73](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L73)

___

### onTestFileResult

▸ **onTestFileResult**(`test`, `testResult`, `aggregatedResult`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `Test` |
| `testResult` | `TestResult` |
| `aggregatedResult` | `AggregatedResult` |

#### Returns

`void` \| `Promise`<`void`\>

#### Overrides

JestMetadataReporter.onTestFileResult

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:81](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L81)

___

### onTestFileStart

▸ **onTestFileStart**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `Test` |

#### Returns

`void`

#### Overrides

JestMetadataReporter.onTestFileStart

#### Defined in

[packages/library/src/JestAllure2Reporter.ts:66](https://github.com/wix-incubator/jest-allure2-reporter/blob/14ca9ce/packages/library/src/JestAllure2Reporter.ts#L66)

___

### onTestResult

▸ **onTestResult**(`_test`, `_testResult`, `_aggregatedResult`): `void`

**`Deprecated`**

**`See`**

 - 
 - 
 - 

#### Parameters

| Name | Type |
| :------ | :------ |
| `_test` | `unknown` |
| `_testResult` | `unknown` |
| `_aggregatedResult` | `unknown` |

#### Returns

`void`

#### Inherited from

JestMetadataReporter.onTestResult

#### Defined in

node_modules/jest-metadata/dist/reporter.d.ts:35

___

### onTestStart

▸ **onTestStart**(`_test`): `void`

**`Deprecated`**

**`See`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `_test` | `unknown` |

#### Returns

`void`

#### Inherited from

JestMetadataReporter.onTestStart

#### Defined in

node_modules/jest-metadata/dist/reporter.d.ts:19
