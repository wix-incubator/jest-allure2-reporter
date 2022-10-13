const sleep = (ms) => new Promise(r => setTimeout(r, ms));

test('launch app', async () => {
  await sleep(1000);
});
