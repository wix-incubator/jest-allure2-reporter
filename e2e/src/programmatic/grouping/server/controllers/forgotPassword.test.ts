import { $Epic, $Feature, $Story, $Tag } from 'jest-allure2-reporter';

$Tag('server');
$Epic('Authentication');
$Feature('Restore account');
describe('POST /forgot-password', () => {
  $Story('Validation');
  it('should return 401 if user is not found', () => {
    // ...
  });

  $Story('Happy path');
  it('should return 200 if reset link is sent successfully', () => {
    // ...
  });

  $Story('Error handling');
  it('should handle server errors gracefully', () => {
    // ...
  });
});
