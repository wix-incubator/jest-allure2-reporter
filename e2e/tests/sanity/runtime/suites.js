test('Test outside of any suite', () => {
  // This test will be placed under:
  // Custom Parent Suite > Custom Suite > Custom Sub-Suite
  allure.parentSuite('Custom Parent Suite');
  allure.suite('Custom Suite');
  allure.subSuite('Custom Sub-Suite');
});
