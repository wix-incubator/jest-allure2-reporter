$ParentSuite('Custom Parent Suite')
$Suite('Custom Suite')
$SubSuite('Custom Sub-Suite')
test('Test outside of any suite', () => {
  // This test will be placed under:
  // Custom Parent Suite > Custom Suite > Custom Sub-Suite
});
