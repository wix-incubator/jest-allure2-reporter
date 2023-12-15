$Tag('server');
$Epic('Authentication');
$Feature('Restore account');
describe('POST /reset-password', () => {
  $Story('Validation');
  it('should return 401 for invalid or expired token', () => {
    // ...
  });

  $Story('Happy path');
  it('should return 200 if password is reset successfully', () => {
    // ...
  });

  $Story('Error handling');
  it('should handle server errors gracefully', () => {
    // ...
  });
});
