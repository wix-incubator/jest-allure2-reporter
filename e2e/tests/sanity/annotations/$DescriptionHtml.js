const { describe, expect, test } = require('@jest/globals');

$DescriptionHtml('<h3>Suite-level description</h3>')
describe('Test suite', () => {
  $DescriptionHtml('Demonstrates a <b>passing</b> test case')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $DescriptionHtml('Demonstrates a <b>failing</b> test case')
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
