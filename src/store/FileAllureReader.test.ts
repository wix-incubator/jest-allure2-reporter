import path from 'node:path';

import { FileAllureReader } from './FileAllureReader';

describe('FileAllureReader', () => {
  const KNOWN_RESULT_ID = 'f92017ea-2180-52b3-951f-2e1050c9030d';
  const KNOWN_CONTAINER_ID = '1c01faf0-15cb-5439-9cf6-adcd8bc3c089';

  const EXISTING_RESULTS_PATH = path.resolve(__dirname, '__fixtures__', 'allure-results');
  const NON_EXISTING_RESULTS_PATH = path.resolve(__dirname, '__fixtures__', 'non-existing-results'); // directory does not exist or is empty

  let reader: FileAllureReader;
  let emptyReader: FileAllureReader;

  beforeAll(() => {
    reader = new FileAllureReader(EXISTING_RESULTS_PATH);
    emptyReader = new FileAllureReader(NON_EXISTING_RESULTS_PATH);
  });

  describe('with existing results directory', () => {
    it('should list known container IDs', async () => {
      const containers = await reader.getContainerIds();
      expect(containers).toContain(KNOWN_CONTAINER_ID);
    });

    it('should list known result IDs', async () => {
      const results = await reader.getResultIds();
      expect(results).toContain(KNOWN_RESULT_ID);
    });

    it('should read a known result file by ID', async () => {
      const result = await reader.readResult(KNOWN_RESULT_ID);
      expect(result).not.toBeNull();
      expect(result?.name).toBe('Product list loads successfully');
    });

    it('should return null for a non-existent result ID', async () => {
      const result = await reader.readResult('invalid-result-id');
      expect(result).toBeNull();
    });

    it('should read a known container file by ID', async () => {
      const container = await reader.readContainer(KNOWN_CONTAINER_ID);
      expect(container).not.toBeNull();
      expect(container?.name).toContain('Product list loads successfully');
    });

    it('should return null for a non-existent container ID', async () => {
      const container = await reader.readContainer('invalid-container-id');
      expect(container).toBeNull();
    });

    it('should read categories', async () => {
      const categories = await reader.readCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories?.length).toBeGreaterThan(0);
    });

    it('should read environment info', async () => {
      const environmentInfo = await reader.readEnvironmentInfo();
      expect(environmentInfo).toBeDefined();
      expect(environmentInfo?.['version.node']).toBe('v20.18.0');
    });

    it('should return null for a non-existent executor.json', async () => {
      const executorInfo = await reader.readExecutorInfo();
      expect(executorInfo).toBeNull();
    });
  });

  describe('with a non-existing (or empty) results directory', () => {
    it('should return empty arrays for container IDs', async () => {
      const containers = await emptyReader.getContainerIds();
      expect(containers).toEqual([]);
    });

    it('should return empty arrays for result IDs', async () => {
      const results = await emptyReader.getResultIds();
      expect(results).toEqual([]);
    });

    it('should return null for reading any non-existent result', async () => {
      const result = await emptyReader.readResult('any-id');
      expect(result).toBeNull();
    });

    it('should return null for reading any non-existent container', async () => {
      const container = await emptyReader.readContainer('any-id');
      expect(container).toBeNull();
    });

    it('should return null for categories if they do not exist', async () => {
      const categories = await emptyReader.readCategories();
      expect(categories).toBeNull();
    });

    it('should return empty object for environment if no file exists', async () => {
      const environmentInfo = await emptyReader.readEnvironmentInfo();
      expect(environmentInfo).toEqual({});
    });

    it('should return null for executor info if no file exists', async () => {
      const executorInfo = await emptyReader.readExecutorInfo();
      expect(executorInfo).toBeNull();
    });
  });
});
