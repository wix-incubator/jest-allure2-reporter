import { AllureContainer, AllureStore, AllureReader, AllureWriter, fromConfig, fromDirectory } from 'jest-allure2-reporter/store';

declare function assertType<T>(value: T): T;

assertType<AllureContainer>({
  uuid: 'fake-uuid',
  name: 'fake-name',
  children: [],
});

assertType<typeof AllureStore>(AllureStore);
assertType<(options: { reader: AllureReader; writer: AllureWriter }) => Promise<AllureStore>>(fromConfig);
assertType<(options: { resultsDir: string; overwrite: boolean }) => Promise<AllureStore>>(fromDirectory);

// Optional: You can perform a minimal runtime check if you have proper mocks/stubs.
(async () => {
  const fakeReaderWriter = { reader: {}, writer: {} } as any;
  const store = await fromConfig(fakeReaderWriter);
  assertType<AllureStore>(store);

  const store2 = await fromDirectory({ resultsDir: 'fake/resultsDir' } as any);
  assertType<AllureStore>(store2);
})();
