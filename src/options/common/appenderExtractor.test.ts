import { describe, expect, it, jest } from '@jest/globals';

import { appenderExtractor } from './appenderExtractor';

describe('extractors', () => {
  describe('appenderExtractor', () => {
    it('should return undefined when the extractor is undefined', () => {
      const result = appenderExtractor(void 0);
      expect(result).toBeUndefined();
    });

    it('should return undefined when the extractor is null', () => {
      const result = appenderExtractor(null);
      expect(result).toBeUndefined();
    });

    it('should allow the extractor to replace the context value (sync)', async () => {
      const extractor = jest.fn<any>().mockReturnValue([3, 4]);
      const context = { value: [1, 2] };

      const result = appenderExtractor(extractor)!;
      const value = result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toEqual([3, 4]);
    });

    it('should allow the extractor to replace the context value (async)', async () => {
      const extractor = jest.fn<any>().mockResolvedValue([3, 4]);
      const context = { value: Promise.resolve([1, 2]) };

      const result = appenderExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toEqual([3, 4]);
    });

    it('should turn undefined results from the extractor into empty arrays', async () => {
      const extractor = jest.fn<any>().mockReturnValue(void 0);
      const context = { value: [1, 2] };

      const result = appenderExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toEqual([]);
    });

    it('should append given values to the context value (sync)', async () => {
      const context = { value: [1, 2] };

      const result = appenderExtractor([3, 4])!;
      const value = result(context);

      expect(value).toEqual([1, 2, 3, 4]);
    });

    it('should append given values to the context value (async)', async () => {
      const context = { value: Promise.resolve([1, 2]) };

      const result = appenderExtractor([3, 4])!;
      const value = await result(context);

      expect(value).toEqual([1, 2, 3, 4]);
    });
  });
});
