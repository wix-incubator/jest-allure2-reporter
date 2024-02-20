/**
 * This suite checks how default and custom naming works for test files, test cases and test steps.
 *
 * @tag title
 * @tag fullName
 * @tag description
 */

import { allure } from 'jest-allure2-reporter/api';

describe('Names', () => {
  beforeAll(() => {
    /* Regular beforeAll */
  });
  beforeAll(() => {
    /** Docblock beforeAll */
  });
  beforeAll(() => {
    allure.title('Programmatic beforeAll');
  });

  afterEach(() => {
    /* Regular afterEach */
  });
  afterEach(() => {
    /** Docblock afterEach */
  });
  afterEach(() => {
    allure.title('Programmatic afterEach');
  });

  test('Docblock test', () => {
    /**
     * Extra description (docblock)
     * @title Docblock test (custom)
     * @fullName Names - Docblock test (custom)
     * @description Even more description (docblock)
     */
  });

  test('Programmatic test', () => {
    allure.title('Programmatic test (custom)');
    allure.fullName('Names - Programmatic test (custom)');
    allure.description('Extra description (programmatic)');
    allure.description('Even more description (programmatic)');
  });
});
