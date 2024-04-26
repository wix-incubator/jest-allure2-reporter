test('should be able to set custom status details', () => {
  allure.statusDetails({
    message: 'This information may be useful',
    trace: 'More details to expand and explain the status',
  })
});
