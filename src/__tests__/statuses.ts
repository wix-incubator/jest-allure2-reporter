import { runReporter, QueryResults } from '../__utils__/runReporter';

describe('statuses.test.js', () => {
  let query: QueryResults;

  describe('with default options', () => {
    beforeAll(async () => {
      query = await runReporter({});
      query = query.bySuite(/statuses/).sortBy('start');
    });

    it('should have 2 broken tests', () =>
      expect(query.byStatus('broken').value).toEqual([
        expect.objectContaining({
          name: 'root broken test',
          fullName: 'root broken test',
          status: 'broken',
          statusDetails: expect.objectContaining({
            message: 'Error: Simulated error',
          }),
        }),
        expect.objectContaining({
          name: 'inner broken test',
          fullName: 'Suite inner broken test',
          status: 'broken',
          statusDetails: expect.objectContaining({
            message: 'Error: Simulated error',
          }),
        }),
      ]));

    it('should have 2 failed tests', () =>
      expect(query.byStatus('failed').value).toEqual([
        expect.objectContaining({
          name: 'root failed test',
          fullName: 'root failed test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: expect.any(String),
          }),
        }),
        expect.objectContaining({
          name: 'inner failed test',
          fullName: 'Suite inner failed test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: expect.any(String),
          }),
        }),
      ]));

    it('should have 2 skipped tests', () =>
      expect(query.byStatus('skipped').sortBy('name').value).toEqual([
        expect.objectContaining({
          name: 'inner skipped test',
          fullName: 'Suite inner skipped test',
          status: 'skipped',
        }),
        expect.objectContaining({
          name: 'root skipped test',
          fullName: 'root skipped test',
          status: 'skipped',
        }),
      ]));

    it('should have 2 passed tests', () =>
      expect(query.byStatus('passed').value).toEqual([
        expect.objectContaining({
          name: 'root passed test (600ms)',
          fullName: 'root passed test (600ms)',
          status: 'passed',
        }),
        expect.objectContaining({
          name: 'inner passed test (600ms)',
          fullName: 'Suite inner passed test (600ms)',
          status: 'passed',
        }),
      ]));

    it('should have correct test durations', () => {
      const results = query.byName(/600ms/).value;
      const durations = results.map((r) => r.stop - r.start);

      expect(Math.min(...durations)).toBeGreaterThanOrEqual(600);
    });

    it('should have package label taken from package.json', () => {
      const expected = Array.from({ length: 8 }, () => 'jest-allure2-reporter');
      expect(query.labels('package').value.map((label) => label.value)).toEqual(expected);
    });
  });

  describe('with options.errorsAsFailedAssertions = true', () => {
    beforeAll(async () => {
      query = await runReporter({
        errorsAsFailedAssertions: true,
      });
      query = query.bySuite(/statuses/).sortBy('start');
    });

    it('should have 0 broken tests', () => {
      expect(query.byStatus('broken').value).toEqual([]);
    });

    it('should have 4 failed tests', () =>
      expect(query.byStatus('failed').value).toEqual([
        expect.objectContaining({
          name: 'root broken test',
          fullName: 'root broken test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: 'Error: Simulated error',
          }),
        }),
        expect.objectContaining({
          name: 'root failed test',
          fullName: 'root failed test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: expect.any(String),
          }),
        }),
        expect.objectContaining({
          name: 'inner broken test',
          fullName: 'Suite inner broken test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: 'Error: Simulated error',
          }),
        }),
        expect.objectContaining({
          name: 'inner failed test',
          fullName: 'Suite inner failed test',
          status: 'failed',
          statusDetails: expect.objectContaining({
            message: expect.any(String),
          }),
        }),
      ]));
  });

  describe('with options.packageName = "custom"', () => {
    beforeAll(async () => {
      query = await runReporter({
        packageName: 'custom',
      });
      query = query.bySuite(/statuses/);
    });

    it('should have package label taken from package.json', () => {
      const expected = Array.from({ length: 8 }, () => 'custom');
      expect(query.labels('package').value.map((label) => label.value)).toEqual(expected);
    });
  });
});
