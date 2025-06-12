/**
 * @parentSuite Custom Parent Suite
 * @suite Custom Suite
 * @subSuite Custom Sub-Suite
 */

const { describe, expect, test } = require('@jest/globals');

test('Test outside of any suite', () => {
  // This test will be placed under:
  // Custom Parent Suite > Custom Suite > Custom Sub-Suite
});
