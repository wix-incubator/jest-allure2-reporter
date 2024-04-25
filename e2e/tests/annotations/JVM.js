$Package('jest-allure2-reporter.e2e.annotations')
describe('My service', () => {
  $TestMethod('JVM: My service should log a message')
  test('should log a message', () => {
    // 1) Instantiate com.example.MyService
    // 2) Make RPC call to its logMessage(...)
    // 3) verify that the message was logged
  });
});
