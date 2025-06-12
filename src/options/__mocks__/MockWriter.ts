import { jest } from '@jest/globals';
import type { AllureWriter } from 'allure-store';
import type { ReporterOptions } from 'jest-allure2-reporter';

export default class MockWriter implements AllureWriter {
  constructor(
    public readonly config: ReporterOptions,
    public readonly options: unknown,
  ) {}

  writeCategories = jest.fn<any>();
  writeEnvironmentInfo = jest.fn<any>();
  writeExecutorInfo = jest.fn<any>();
  writeContainer = jest.fn<any>();
  writeResult = jest.fn<any>();

  static instantiate = jest.fn<any>((config: ReporterOptions, options: unknown) => {
    return new MockWriter(config, options);
  });

  static instantiateAsync = jest.fn<any>(async (config: ReporterOptions, options: unknown) => {
    await new Promise((resolve) => setTimeout(resolve, 0)); // Simulate async work
    return new MockWriter(config, options);
  });
}
