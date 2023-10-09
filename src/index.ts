import realm from './realms';

export { JestAllure2Reporter } from './reporter/JestAllure2Reporter';
export { JestAllure2Reporter as default } from './reporter/JestAllure2Reporter';
export { ReporterOptions } from './options/ReporterOptions';
export * from './annotations';

export const allure = realm.runtime;
