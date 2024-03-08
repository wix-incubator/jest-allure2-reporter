/**
 * This suite checks how default and custom naming works for test files, test cases and test steps.
 *
 * @tag displayName
 * @tag fullName
 * @tag description
 */

import { allure } from 'jest-allure2-reporter/api';

describe('Names', () => {
  /* Regular beforeAll */
  beforeAll(() => {
  });
  /** Docblock beforeAll */
  beforeAll(() => {
  });

  beforeAll(() => {
    allure.displayName('Programmatic beforeAll');
  });

  /* Regular afterEach */
  afterEach(() => {
  });
  /** Docblock afterEach */
  afterEach(() => {
  });
  afterEach(() => {
    allure.displayName('Programmatic afterEach');
  });

  /**
   * Extra description (docblock)
   * @displayName Docblock test (custom)
   * @fullName Names - Docblock test (custom)
   * @description Even more description (docblock)
   */
  test('Docblock test', () => {
  });

  test('Programmatic test', () => {
    allure.displayName('Programmatic test (custom)');
    allure.fullName('Names - Programmatic test (custom)');
    allure.description('Extra description (programmatic)');
    allure.description('Even more description (programmatic)');
  });
});
