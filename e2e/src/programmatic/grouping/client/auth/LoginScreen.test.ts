/**
 * Client tests for login screen
 * @owner Security Team
 * @severity Critical
 * @tag regression,auth
 * @tag smoke
 */

import LoginHelper from '../../../../utils/LoginHelper';
import {$Tag, $Epic, $Feature, $Story, allure} from 'jest-allure2-reporter/api';

$Tag('client');
$Epic('Authentication');
$Feature('Login');
describe('Login screen', () => {
  $Story('Happy path');
  describe('Rendering', () => {
    it('should render the login form by default', () => {
      // ...
    });
  });

  $Story('Validation');
  describe('Form Submission', () => {
    it('should show error on invalid e-mail format', async () => {
      /**
       * @owner Samantha Jones
       * @issue IDEA-235211
       */

      await LoginHelper.typeEmail('someone#example.com');
      await LoginHelper.typePassword('123456');
      await allure.step('Hello', () => {
        expect(LoginHelper.snapshotForm()).toContain('someone#example.com');
        expect(LoginHelper.getValidationSummary()).toBe('fixtures/invalid-email.xml');
        allure.status('passed', { message: 'All is good' });
      });
    });

    it('should show error on short or invalid password format', () => {
      allure.status('failed', { message: 'The password is too short' });
      // ...
    });
  });

  describe('Navigation', () => {
    $Feature('Restore account');
    $Story('Happy path');
    it('should navigate to forgot password screen on "forgot password" click', () => {
      // ...
    });
  });
});
