import path from 'node:path';
import {
  allure,
  $Description,
  $Owner,
  $Severity,
  $Link,
} from 'jest-allure2-reporter';
import {LoginHelper} from "./utils/LoginHelper";

$Description('Sanity test for Allure reporter');
$Owner('Yaroslav Serhieiev <yaroslavs@wix.com>');
describe('Simple suite', () => {
  beforeAll(() => {
    console.log('beforeAll');
    allure.createFileAttachment(
      'Project Logo',
      path.resolve('../docs/img/logo.svg'),
      'image/svg+xml',
    );
  });

  $Link('https://github.com/wix-incubator/jest-allure2-reporter', 'GitHub');
  it('should pass', () => {
    expect(true).toBe(true);
    allure.parameter('Demo', 'true');
  });

  $Severity('critical');
  it.failing('should fail', () => {
    allure.step('Outer step', () => {
      allure.step('Inner step 1', () => {
        expect(true).toBe(true);
      });

      allure.step('Inner step 2', () => {
        const helper = new LoginHelper();
        expect(helper.typeEmail('allure@wix-incubator.com')).toBe('Entered: allure@wix-incubator.com');
      });
    });
  });

  it('should not fail but it will', () => {
    expect(true).toBe(false);
  });

  it.skip('should skip', () => {
    expect(true).toBe(true);
  });

  it.todo('should todo');

  afterEach(() => {
    console.log('afterEach');
  });

  afterAll(() => {
    console.log('afterAll');
  });
});
