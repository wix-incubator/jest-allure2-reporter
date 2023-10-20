import realm from './realms';
import type { IAllureRuntime } from './runtime';

export { JestAllure2Reporter } from './reporter/JestAllure2Reporter';
export { JestAllure2Reporter as default } from './reporter/JestAllure2Reporter';
export { ReporterOptions } from './options/ReporterOptions';
export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as IAllureRuntime;
