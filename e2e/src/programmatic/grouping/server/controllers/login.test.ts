import { $Epic, $Feature, $Story, $Tag } from 'jest-allure2-reporter';

$Tag('server');
$Epic('Authentication');
$Feature('Login');
describe('POST /login', () => {
  $Story('Validation');
  it('should return 401 if user is not found', () => {
    // ...
  });

  $Story('Validation');
  it('should return 401 if password is incorrect', () => {
    // ...
  });

  $Story('Happy path');
  it('should return 200 and user details if login is successful', () => {
    // ...
  });
});
