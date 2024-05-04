import { bunyamin, type BunyaminLogRecordFields, isDebug, threadGroups } from 'bunyamin';

export const log = bunyamin.child({
  cat: 'jest-allure2-reporter',
  tid: 'jest-allure2-reporter',
});

const nofields: BunyaminLogRecordFields = {};
const noop = () => nofields;

export const optimizeForTracing = isDebug('jest-allure2-reporter')
  ? <T extends (...arguments_: any[]) => BunyaminLogRecordFields>(function_: T): T => function_
  : () => noop;

threadGroups.add({
  id: 'jest-allure2-reporter',
  displayName: 'jest-allure2-reporter',
});
