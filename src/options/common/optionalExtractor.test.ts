import { optionalExtractor } from './optionalExtractor';

describe('extractors', () => {
  describe('optionalExtractor', () => {
    it('should return the extracted value when the extractor is defined and returns a value', async () => {
      const extractor = jest.fn().mockReturnValue(42);
      const context = {
        get value() {
          throw new Error('Should not be called');
        },
      };

      const result = optionalExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toBe(42);
    });

    it('should return the context value when the extractor is defined and returns undefined', async () => {
      const extractor = jest.fn().mockReturnValue(void 0);
      const context = { value: 'default' };

      const result = optionalExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toBe('default');
    });

    it('should return the extracted value when the extractor is defined and returns a promise', async () => {
      const extractor = jest.fn().mockResolvedValue(42);
      const context = {
        get value() {
          throw new Error('Should not be called');
        },
      };

      const result = optionalExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toBe(42);
    });

    it('should return the context value when the extractor is defined and returns a promise that resolves to undefined', async () => {
      const extractor = jest.fn().mockResolvedValue(void 0);
      const context = { value: 'default' };

      const result = optionalExtractor(extractor)!;
      const value = await result(context);

      expect(extractor).toHaveBeenCalledWith(context);
      expect(value).toBe('default');
    });

    it('should return the value when the extractor is a non-undefined value', async () => {
      const value = 42;
      const context = { value: undefined as never };

      const result = optionalExtractor(value)!;
      const extractedValue = await result(context);

      expect(extractedValue).toBe(42);
    });

    it('should return undefined when the extractor is undefined', async () => {
      const result = optionalExtractor(void 0);
      expect(result).toBeUndefined();
    });
  });
});
