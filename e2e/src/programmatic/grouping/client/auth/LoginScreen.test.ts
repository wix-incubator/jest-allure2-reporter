import { $Epic, $Feature, $Story, $Tag } from 'jest-allure2-reporter';

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
    it('should show error on invalid e-mail format', () => {
      // ...
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
