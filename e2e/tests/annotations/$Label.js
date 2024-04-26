$Label('testType', 'screenshotDiff');
describe('Screenshot tests', () => {
  test.failing('What the client explained', () => {
    // and what the programmer coded ¯\_(ツ)_/¯
    allure.fileAttachment('fixtures/screenshots/expected.png', 'expected');
    allure.fileAttachment('fixtures/screenshots/actual.png', 'actual');
    allure.fileAttachment('fixtures/screenshots/diff.png', 'diff');
  });

  test('This will fail with a timeout', (_done) => {});
});
