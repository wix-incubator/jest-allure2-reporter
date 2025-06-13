const path = require('node:path');

const { describe, expect, test } = require('@jest/globals');

test('should wrap a function with automatic attachment by returned file path', async () => {
  const attachSource = (filename) => path.join(__dirname, filename);
  const wrapped = allure.createFileAttachment(attachSource, {
    name: '{{0}}',
    mimeType: 'text/plain',
  });

  expect(wrapped('createFileAttachment.js')).toBe(__filename);
});
