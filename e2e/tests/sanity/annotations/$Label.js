const { describe, expect, test } = require('@jest/globals');

$Label('testType', 'screenshotDiff');
describe('Screenshot tests', () => {
  test('What the client explained', () => {
    allure.fileAttachment('fixtures/screenshots/expected.png', 'expected');
    allure.fileAttachment('fixtures/screenshots/actual.png', 'actual');
    allure.fileAttachment('fixtures/screenshots/diff.png', 'diff');

    // and what the programmer coded ¯\_(ツ)_/¯
    expect('programmer').toHaveProperty('telepathy');
  });
});
