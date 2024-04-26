const os = require('node:os');

test('should wrap a function with automatic attachment of its result', async () => {
  const diagnostics = () => JSON.stringify({ available_memory: os.freemem() });
  const wrapped = allure.createAttachment(diagnostics, 'diagnostics-{{0}}.json');

  // Creates 'diagnostics-before.json' attachment
  expect(wrapped('before')).toMatch(/{"available_memory":\d+}/);
  // Consume some memory
  expect(Array.from({ length: 100000 }, () => Math.random())).toHaveLength(100000);
  // Creates 'diagnostics-after.json' attachment; the returned value is not changed by the wrapper
  expect(wrapped('after')).toMatch(/{"available_memory":\d+}/);
});
