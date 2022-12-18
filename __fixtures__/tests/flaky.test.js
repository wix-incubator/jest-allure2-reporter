jest.retryTimes(1);

describe('flaky test', () => {
  let firstRun = true;

  test('should pass on the second attempt', async () => {
    if (firstRun) {
      firstRun = false;
      throw new Error('Simulated error');
    }
  });
});
