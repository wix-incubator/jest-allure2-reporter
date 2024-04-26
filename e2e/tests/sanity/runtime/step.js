test('should be able to report nested steps', async () => {
  const result = allure.step('Step 1', async () => {
    const step1 = allure.step('Step 1.1', () => 1);
    const step2a = allure.step('Step 1.2', async () => 2);
    expect(step1).toBe(1);
    await expect(step2a).resolves.toBe(2);
    return step1 + await step2a;
  });

  await expect(result).resolves.toBe(3);
});
