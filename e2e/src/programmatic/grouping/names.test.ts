/**
 * This suite checks how default and custom naming works for test files, test cases and test steps.
 *
 * ---
 *
 * @tag displayName
 * @tag fullName
 * @tag description
 */
import { allure, $Description, $DisplayName, $FullName, $Link } from 'jest-allure2-reporter/api';

describe('Names', () => {
  // Regular beforeAll
  beforeAll(() => {
  });
  /** Docblock beforeAll */
  beforeAll(() => {
  });
  $DisplayName('DSL beforeAll');
  beforeAll(() => {
  });
  beforeAll(() => {
    allure.displayName('Programmatic beforeAll');
  });

  // Regular afterEach
  afterEach(() => {
  });
  /** Docblock afterEach */
  afterEach(() => {
  });
  $DisplayName('DSL afterEach');
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
   * @url https://jestjs.io/docs/en/api#testname-fn-timeout Jest Docs
   */
  test('Docblock test', () => {
  });

  $DisplayName('DSL test (custom)');
  $FullName('Names - DSL test (custom)');
  $Description('Extra description (DSL)');
  $Link('https://jestjs.io/docs/en/api#testname-fn-timeout', '📖 Jest Docs');
  test('DSL test', () => {
  });

  test('Programmatic test', () => {
    allure.displayName('Programmatic test (custom)');
    allure.fullName('Names - Programmatic test (custom)');
    allure.description('Extra description (programmatic)');
    allure.description('Even more description (programmatic)');
  });

  test.each([
    ['First'],
    ['Second'],
    ['Third'],
  ])('Parametrized test: %s', (name) => {
    allure.displayName(`Parametrized test: ${name}`);
  });

  test.each`
    name
    ${'First'}
    ${'Second'}
    ${'Third'}
  `('Parametrized test 2: $name', ({ name }) => {
    allure.displayName(`Parametrized test: ${name}`);
  });
});
