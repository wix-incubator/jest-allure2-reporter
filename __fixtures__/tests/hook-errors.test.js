const sleep = (ms) => new Promise(r => setTimeout(r, ms));

describe('hook errors', () => {
  describe.each([
    ['beforeAll'],
    ['beforeEach'],
    ['afterEach'],
    ['afterAll'],
  ])('%s', (hook) => {
    global[hook](async () => {
      await sleep(50);

      throw new Error(`Simulated error in ${hook}(...)`);
    });

    test('Test #1', async () => {
      // some test
    });

    test('Test #2', async () => {
      // some test
    });
  });
});
