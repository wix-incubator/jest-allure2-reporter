const { describe, expect, test } = require('@jest/globals');

test.each`
  a    | b    | expected
  ${1} | ${2} | ${3}
  ${2} | ${3} | ${5}
  ${3} | ${4} | ${7}
`('sum test ($expected)', ({ a, b, expected }) => {
  // Report a single parameter
  allure.parameter('a', a);
  // This parameter will be reported, but not shown in the report
  allure.parameter('expected', expected, { excluded: true });
  // Shorthand for allure.parameter('b', b);
  allure.parameters({ b });

  expect(a + b).toBe(expected);
});
