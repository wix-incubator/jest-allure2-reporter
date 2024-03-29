import { bunyamin, threadGroups } from 'bunyamin';

export const log = bunyamin.child({
  cat: 'jest-allure2-reporter',
  tid: 'jest-allure2-reporter',
});

threadGroups.add({
  id: 'jest-allure2-reporter',
  displayName: 'jest-allure2-reporter',
});
