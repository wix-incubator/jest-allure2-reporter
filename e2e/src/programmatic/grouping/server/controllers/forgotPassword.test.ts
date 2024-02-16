import { $Tag, $Epic, $Feature, $Story } from 'jest-allure2-reporter/api';

$Tag('server');
$Epic('Authentication');
$Feature('Restore account');
describe('POST /forgot-password', () => {
  $Story('Validation');
  it('should return 401 if user is not found', () => {
    expect({ code: 401, seed: Math.random() }).toMatchSnapshot();
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
