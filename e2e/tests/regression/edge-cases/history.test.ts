import { describe, it } from '@jest/globals';

import { allure } from 'jest-allure2-reporter/api';

describe('History', () => {
  it.each([
    [1],
    [2],
    [3],
  ])('should be differentiated, even with the same name', (a) => {
    allure.historyId(`${a}`);
  });
});
