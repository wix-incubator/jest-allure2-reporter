import type { QueryResults } from '../__utils__/runReporter';
import { runReporter } from '../__utils__/runReporter';

describe('environment.properties', () => {
  let query: QueryResults;

  describe('with default options', () => {
    beforeAll(async () => {
      query = await runReporter({});
      query = query.byFileName(/environment\.properties$/);
    });

    it('should produce environment.properties file', () => {
      expect(query.value).toHaveLength(1);
      expect(query.value[0].lines).toEqual(
        expect.arrayContaining([expect.stringContaining(' = ')]),
      );
      expect(query.value[0].lines.length).toBeGreaterThan(1);
    });
  });

  describe('with options.environmentInfo = (...)', () => {
    beforeAll(async () => {
      query = await runReporter({
        environment: () => ({
          CUSTOM_INFO: 'CUSTOM_VALUE',
        }),
      });
      query = query.byFileName(/environment\.properties$/);
    });

    it('should produce a custom environment.properties file', () => {
      expect(query.value).toEqual([
        expect.objectContaining({
          lines: ['CUSTOM_INFO = CUSTOM_VALUE'],
        }),
      ]);
    });
  });
});
