const { describe, expect, test } = require('@jest/globals');

test('should attach a given file to the report', async () => {
  const copiedFilePath = await allure.fileAttachment(__filename, {
    name: 'fileAttachment.js',
    mimeType: 'text/plain',
    handler: 'copy',
  });

  expect(copiedFilePath).toMatch(/\.js$/);
});
