---
id: "environment_node.AllureNodeJestEnvironment"
title: "Class: AllureNodeJestEnvironment"
sidebar_label: "AllureNodeJestEnvironment"
custom_edit_url: null
---

[environment-node](../modules/environment_node.md).AllureNodeJestEnvironment

## Hierarchy

- `TestEnvironment`

  ↳ **`AllureNodeJestEnvironment`**

## Constructors

### constructor

• **new AllureNodeJestEnvironment**(`config`, `context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |
| `context` | `any` |

#### Overrides

TestEnvironment.constructor

#### Defined in

[packages/library/src/environment-node.ts:6](https://github.com/wix-incubator/jest-allure2-reporter/blob/039baf3/packages/library/src/environment-node.ts#L6)

## Properties

### testEvents

• `Readonly` **testEvents**: `ReadonlyAsyncEmitter`<`ForwardedCircusEvent`, ``"*"`` \| `ForwardedCircusEventType`\>

#### Inherited from

TestEnvironment.testEvents

#### Defined in

node_modules/jest-metadata/dist/environment-decorator.d.ts:8

## Methods

### #attachCode

▸ `Private` **#attachCode**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ForwardedCircusEvent` |

#### Returns

`void`

#### Defined in

[packages/library/src/environment-node.ts:19](https://github.com/wix-incubator/jest-allure2-reporter/blob/039baf3/packages/library/src/environment-node.ts#L19)

___

### handleTestEvent

▸ **handleTestEvent**(`event`, `state`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `unknown` |
| `state` | `unknown` |

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

TestEnvironment.handleTestEvent

#### Defined in

node_modules/jest-metadata/dist/environment-decorator.d.ts:4

___

### setup

▸ **setup**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

TestEnvironment.setup

#### Defined in

node_modules/jest-metadata/dist/environment-decorator.d.ts:3

___

### teardown

▸ **teardown**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

TestEnvironment.teardown

#### Defined in

node_modules/jest-metadata/dist/environment-decorator.d.ts:5
