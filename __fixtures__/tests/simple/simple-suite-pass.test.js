const sleep = (ms) => new Promise(r => setTimeout(r, ms));

describe('Suite', () => {
  test('launch app', async () => {
    await sleep(1000);
  });
});
