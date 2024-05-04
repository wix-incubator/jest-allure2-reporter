test('should be able to set a custom status', () => {
  allure.status('skipped', {
    message: 'Cannot run this test at the moment',
    trace: '¯\_(ツ)_/¯',
  })
});
