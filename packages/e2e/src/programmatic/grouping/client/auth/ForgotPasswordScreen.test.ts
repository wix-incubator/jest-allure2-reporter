import { $Epic, $Feature, $Story, $Tag } from 'jest-allure2-reporter';

$Tag('client');
$Epic('Authentication');
$Feature('Restore account');
describe('Forgot password screen', () => {
  $Story('Happy path');
  describe('Rendering', () => {
    it('should render the forgot password form', () => {
      // ...
    });
  });

  describe('Form Submission', () => {
    $Story('Validation');
    it('should show error on invalid e-mail format', () => {
      // ...
    });

    $Story('Happy path');
    it('should send forgot password request on valid e-mail', () => {
      // ...
    });
  });
});
