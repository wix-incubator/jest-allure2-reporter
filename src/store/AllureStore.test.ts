import { AllureStore } from './AllureStore';
import type { AllureReader } from './AllureReader';
import type { AllureWriter } from './AllureWriter';
import type { AllureContainer, AllureResult, AllureStep } from './types';

type TestStep = Partial<AllureStep>;
type TestResult = Partial<AllureResult>;
type TestContainer = Partial<AllureContainer>;

describe('AllureStore (Reading)', () => {
  let reader: TestReader;
  let store: AllureStore;

  // For reading tests, we don't need the writer, but since the constructor requires it,
  // we'll provide a simple mock that won't be used.
  const mockWriter: AllureWriter = {
    writeCategories: jest.fn(),
    writeEnvironmentInfo: jest.fn(),
    writeExecutorInfo: jest.fn(),
    writeContainer: jest.fn(),
    writeResult: jest.fn(),
  };

  beforeEach(() => {
    reader = new TestReader();
    store = new AllureStore({ reader, writer: mockWriter });
  });

  describe('all()', () => {
    it('returns empty array if no results and no containers', async () => {
      const results = await store.getAllResults();
      expect(results).toEqual([]);
    });

    it('returns single result with no ancestors', async () => {
      const fakeResult: TestResult = {
        uuid: 'result-1',
        historyId: 'hist-1',
        steps: [],
        stop: 123,
        name: 'test',
        fullName: 'test',
        start: 0,
        stage: 'finished',
        status: 'passed',
      };
      reader.addResult(fakeResult);

      const results = await store.getAllResults();
      expect(results).toEqual([fakeResult]);
    });

    it('merges ancestor container steps into the result', async () => {
      // Container hierarchy:
      // container-top -> container-mid -> result-1
      const topBeforeStep: TestStep = {
        name: 'topBefore',
        start: 1,
        stop: 2,
        stage: 'finished',
        status: 'passed',
      };
      const topAfterStep: TestStep = {
        name: 'topAfter',
        start: 10,
        stop: 11,
        stage: 'finished',
        status: 'passed',
      };
      const midBeforeStep: TestStep = {
        name: 'midBefore',
        start: 3,
        stop: 4,
        stage: 'finished',
        status: 'passed',
      };
      const midAfterStep: TestStep = {
        name: 'midAfter',
        start: 8,
        stop: 9,
        stage: 'finished',
        status: 'passed',
      };
      const resultStep: TestStep = {
        name: 'resultStep',
        start: 5,
        stop: 6,
        stage: 'finished',
        status: 'passed',
      };

      const containerTop: TestContainer = {
        uuid: 'container-top',
        children: ['container-mid'],
        befores: [topBeforeStep as AllureStep],
        afters: [topAfterStep as AllureStep],
      };

      const containerMid: TestContainer = {
        uuid: 'container-mid',
        children: ['result-1'],
        befores: [midBeforeStep as AllureStep],
        afters: [midAfterStep as AllureStep],
      };

      const result1: TestResult = {
        uuid: 'result-1',
        historyId: 'hist-1',
        steps: [resultStep as AllureStep],
        stop: 200,
        name: 'test',
        fullName: 'test',
        start: 0,
        stage: 'finished',
        status: 'passed',
      };

      reader.addContainer(containerTop);
      reader.addContainer(containerMid);
      reader.addResult(result1);

      const results = await store.getAllResults();
      expect(results).toHaveLength(1);
      const merged = results[0];
      expect(merged.steps).toEqual([
        topBeforeStep,
        midBeforeStep,
        resultStep,
        midAfterStep,
        topAfterStep,
      ]);
    });

    it('handles missing containers gracefully (failed reads)', async () => {
      const existingContainer: TestContainer = { uuid: 'container-1', children: [] };
      reader.addContainer(existingContainer);

      const fakeResult: TestResult = {
        uuid: 'result-1',
        historyId: 'hist-1',
        steps: [],
        stop: 100,
        name: 'test',
        fullName: 'test',
        start: 0,
        stage: 'finished',
        status: 'passed',
      };
      reader.addResult(fakeResult);

      // container is never added, so reading it will fail.
      reader.addContainer(null);

      const results = await store.getAllResults();
      // container fails silently, just no steps merged
      expect(results).toEqual([fakeResult]);
    });

    it('handles missing results gracefully (failed reads)', async () => {
      const fakeResult1: TestResult = {
        uuid: 'result-1',
        historyId: 'h1',
        steps: [],
        stop: 10,
        name: 'test',
        fullName: 'test',
        start: 0,
        stage: 'finished',
        status: 'passed',
      };
      reader.addResult(fakeResult1);

      // result is never added, so reading it will fail.
      reader.addResult(null);

      const results = await store.getAllResults();
      // missing result is ignored since it can't be read.
      expect(results).toEqual([fakeResult1]);
    });
  });

  describe('latest()', () => {
    it('returns only the most recent results per historyId', async () => {
      reader.addResult({
        uuid: 'res-1',
        historyId: 'hist-1',
        steps: [],
        stop: 100,
        name: 't',
        fullName: 't',
        start: 0,
        stage: 'finished',
        status: 'passed',
      });
      reader.addResult({
        uuid: 'res-2',
        historyId: 'hist-1',
        steps: [],
        stop: 200,
        name: 't',
        fullName: 't',
        start: 0,
        stage: 'finished',
        status: 'passed',
      });
      reader.addResult({
        uuid: 'res-3',
        historyId: 'hist-1',
        steps: [],
        stop: 150,
        name: 't',
        fullName: 't',
        start: 0,
        stage: 'finished',
        status: 'passed',
      });
      reader.addResult({
        uuid: 'res-4',
        historyId: 'hist-2',
        steps: [],
        stop: 50,
        name: 't',
        fullName: 't',
        start: 0,
        stage: 'finished',
        status: 'passed',
      });

      const latest = await store.getLatestResults();

      // For hist-1, the latest is res-2 (stop=200)
      // For hist-2, the only one is res-4
      expect(latest).toHaveLength(2);
      expect(latest).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ uuid: 'res-2', historyId: 'hist-1', stop: 200 }),
          expect.objectContaining({ uuid: 'res-4', historyId: 'hist-2', stop: 50 }),
        ]),
      );
    });
  });
});

// New block for writer tests
describe('AllureStore (Writing)', () => {
  let reader: TestReader;
  let writer: jest.Mocked<AllureWriter>;
  let store: AllureStore;

  beforeEach(() => {
    reader = new TestReader();
    writer = {
      writeCategories: jest.fn(),
      writeEnvironmentInfo: jest.fn(),
      writeExecutorInfo: jest.fn(),
      writeContainer: jest.fn(),
      writeResult: jest.fn(),
    };
    store = new AllureStore({ reader, writer });
  });

  it('calls writer.writeCategories()', async () => {
    const categories = [{ name: 'Product defects', matchedStatuses: ['failed' as const] }];
    await store.writeCategories(categories);
    expect(writer.writeCategories).toHaveBeenCalledTimes(1);
    expect(writer.writeCategories).toHaveBeenCalledWith(categories);
  });

  it('calls writer.writeEnvironmentInfo()', async () => {
    const environmentInfo = { NODE_ENV: 'test', version: '1.0.0' };
    await store.writeEnvironmentInfo(environmentInfo);
    expect(writer.writeEnvironmentInfo).toHaveBeenCalledTimes(1);
    expect(writer.writeEnvironmentInfo).toHaveBeenCalledWith(environmentInfo);
  });

  it('calls writer.writeExecutorInfo()', async () => {
    const executorInfo = { name: 'GitHub Actions', type: 'CI' };
    await store.writeExecutorInfo(executorInfo);
    expect(writer.writeExecutorInfo).toHaveBeenCalledTimes(1);
    expect(writer.writeExecutorInfo).toHaveBeenCalledWith(executorInfo);
  });

  it('calls writer.writeContainer()', async () => {
    const container = {
      uuid: 'container-uuid',
      children: [],
    } as AllureContainer;
    await store.writeContainer(container);
    expect(writer.writeContainer).toHaveBeenCalledTimes(1);
    expect(writer.writeContainer).toHaveBeenCalledWith(container);
  });

  it('calls writer.writeResult()', async () => {
    const result = {
      uuid: 'result-uuid',
      historyId: 'hist-id',
      name: 'Test result',
      fullName: 'Test result full',
      start: 0,
      stop: 10,
      stage: 'finished',
      status: 'passed',
    } as AllureResult;
    await store.writeResult(result);
    expect(writer.writeResult).toHaveBeenCalledTimes(1);
    expect(writer.writeResult).toHaveBeenCalledWith(result);
  });
});

// TestReader implementation remains the same as in the original code
class TestReader implements AllureReader {
  readonly #containerIds: string[] = [];
  readonly #containerMap = new Map<string, TestContainer>();
  readonly #resultIds: string[] = [];
  readonly #resultMap = new Map<string, TestResult>();

  async getContainerIds() {
    return this.#containerIds;
  }

  async getResultIds() {
    return this.#resultIds;
  }

  async readContainer(uuid: string): Promise<AllureContainer> {
    return this.#containerMap.get(uuid)! as AllureContainer;
  }

  async readResult(uuid: string): Promise<AllureResult> {
    return this.#resultMap.get(uuid)! as AllureResult;
  }

  async readCategories() {
    return null;
  }

  async readEnvironmentInfo() {
    return null;
  }

  async readExecutorInfo() {
    return null;
  }

  // Helpers to configure the test double
  addResult(result?: TestResult | null) {
    const uuid = result?.uuid || '00000000-0000-0000-0000-000000000000';
    this.#resultIds.push(uuid);
    result && this.#resultMap.set(uuid, result);
  }

  addContainer(container?: TestContainer | null) {
    const uuid = container?.uuid || '00000000-0000-0000-0000-000000000000';
    this.#containerIds.push(uuid);
    container && this.#containerMap.set(uuid, container);
  }
}
