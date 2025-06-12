import { describe, expect, it, jest } from '@jest/globals';
import { FileAllureWriter } from 'allure-store';
import type { AllureWriter } from 'allure-store';

import type { ReporterConfig } from './types';
import { resolveWriter } from './resolveWriter';
import MockWriter from './__mocks__/MockWriter';
import mockWriterFactory from './__mocks__/mockWriterFactory';

describe('resolveWriter', () => {
  const mockConfig = {
    resultsDir: 'test-results',
    overwrite: true,
    injectGlobals: true,
    writer: FileAllureWriter,
  } as ReporterConfig;

  it('should create default FileAllureWriter when no writer is specified', async () => {
    const writer = await resolveWriter(__dirname, mockConfig);
    expect(writer).toBeInstanceOf(FileAllureWriter);
  });

  it('should return writer instance if it is already an AllureWriter', async () => {
    const mockWriter: AllureWriter = {
      writeCategories: jest.fn<any>(),
      writeEnvironmentInfo: jest.fn<any>(),
      writeExecutorInfo: jest.fn<any>(),
      writeContainer: jest.fn<any>(),
      writeResult: jest.fn<any>(),
    };

    const writer = await resolveWriter(__dirname, { ...mockConfig, writer: mockWriter });
    expect(writer).toBe(mockWriter);
  });

  it('should import writer from string path', async () => {
    const writer = await resolveWriter(__dirname, {
      ...mockConfig,
      writer: './__mocks__/MockWriter',
    });
    expect(writer).toBeInstanceOf(MockWriter);
  });

  it('should instantiate writer class (via constructor) with config and options', async () => {
    const options = { customOption: 'value' };
    const config = { ...mockConfig, writer: [MockWriter, options] };
    const writer = (await resolveWriter(__dirname, config)) as MockWriter;

    expect(writer).toBeInstanceOf(MockWriter);
    expect(writer.config).toEqual(config);
    expect(writer.options).toEqual(options);
    expect(MockWriter.instantiate).not.toHaveBeenCalled();
  });

  it('should instantiate writer class (via function) with config and options', async () => {
    const options = { customOption: 'value' };
    const config = { ...mockConfig, writer: [MockWriter.instantiate, options] };
    const writer = (await resolveWriter(__dirname, config)) as MockWriter;

    expect(writer).toBeInstanceOf(MockWriter);
    expect(writer.config).toEqual(config);
    expect(writer.options).toEqual(options);
    expect(MockWriter.instantiate).toHaveBeenCalledWith(config, options);
  });

  it('should instantiate writer class (via async function) with config and options', async () => {
    const options = { customOption: 'value' };
    const config = { ...mockConfig, writer: [MockWriter.instantiateAsync, options] };
    const writer = (await resolveWriter(__dirname, config)) as MockWriter;

    expect(writer).toBeInstanceOf(MockWriter);
    expect(writer.config).toEqual(config);
    expect(writer.options).toEqual(options);
    expect(MockWriter.instantiateAsync).toHaveBeenCalledWith(config, options);
  });

  it('should try factory function if constructor fails', async () => {
    const writer = await resolveWriter(__dirname, { ...mockConfig, writer: mockWriterFactory });
    expect(mockWriterFactory).toHaveBeenCalledWith(expect.any(Object), {});
    expect(writer).toBeInstanceOf(MockWriter);
  });

  it('should throw error if both constructor and factory fail', async () => {
    const failingWriter = jest.fn().mockImplementation(() => {
      throw new Error('Constructor failed');
    });

    await expect(
      resolveWriter(__dirname, { ...mockConfig, writer: failingWriter }),
    ).rejects.toThrow('Failed to instantiate AllureWriter');
  });

  describe('Unhappy paths', () => {
    it('should throw error for invalid string path', async () => {
      await expect(
        resolveWriter(__dirname, { ...mockConfig, writer: './non-existent-writer' }),
      ).rejects.toThrow();
    });

    it('should throw error for invalid array pattern', async () => {
      await expect(
        resolveWriter(__dirname, { ...mockConfig, writer: [null, {}] }),
      ).rejects.toThrow();
    });

    it('should throw error for invalid writer type', async () => {
      await expect(
        resolveWriter(__dirname, { ...mockConfig, writer: 42 as any }),
      ).rejects.toThrow();
    });

    it('should throw error for invalid writer factory (primitive)', async () => {
      await expect(resolveWriter(__dirname, { ...mockConfig, writer: () => 42 })).rejects.toThrow(
        'AllureWriter implementation must be a class or function, but got: 42',
      );
    });

    it('should throw error for invalid writer factory (object)', async () => {
      await expect(resolveWriter(__dirname, { ...mockConfig, writer: () => ({}) })).rejects.toThrow(
        'AllureWriter implementation is missing required methods: writeCategories, writeEnvironmentInfo, writeExecutorInfo, writeContainer, writeResult',
      );
    });
  });
});
