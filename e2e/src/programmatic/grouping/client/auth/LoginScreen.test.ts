import { $Epic, $Feature, $Story, $Tag } from 'jest-allure2-reporter';
import LoginHelper from '../../../../utils/LoginHelper';

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
      await LoginHelper.typeEmail('someone#example.com');
      expect(LoginHelper.getValidationSummary()).toBe('fixtures/invalid-email.xml');
    });

    it('should show error on short or invalid password format', () => {
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
