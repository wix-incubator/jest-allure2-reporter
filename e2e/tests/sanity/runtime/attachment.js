const fs = require('node:fs/promises');

test('should attach a file', async () => {
  /** Location of the attached file */
  const filePath = await allure.attachment('File 1', '<h1>Example</h1>', 'text/html');
  // The file should be created and contain the expected content
  await expect(fs.readFile(filePath, 'utf-8')).resolves.toBe('<h1>Example</h1>');
});
