test('should be linked to a TMS ticket', () => {
  allure.tms('TMS-1234');
  expect(1 + 1).toBe(2);
});
