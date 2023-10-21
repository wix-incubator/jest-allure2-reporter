/// <reference path="../index.d.ts" />

import type { IAllureRuntime } from 'jest-allure2-reporter';

import realm from './realms';

export { JestAllure2Reporter } from './reporter/JestAllure2Reporter';
export { JestAllure2Reporter as default } from './reporter/JestAllure2Reporter';
export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as IAllureRuntime;
