import { processMaybePromise } from './processMaybePromise';

describe('processMaybePromise', () => {
  // Test: Direct Value
  it('should call the callback with a direct value', () => {
    const callback = jest.fn();
    const result = processMaybePromise(5, callback);

    expect(callback).toHaveBeenCalledWith(5);
    expect(result).toBe(5);
  });

  // Test: Promise
  it('should call the callback with a resolved promise', async () => {
    const callback = jest.fn();
    const promise = Promise.resolve(10);
    const result = processMaybePromise(promise, callback);

    await expect(result).resolves.toBe(10);
    expect(callback).toHaveBeenCalledWith(10);
  });

  // Test: Proper handling of rejected promises
  it('should propagate rejection in promises', async () => {
    const callback = jest.fn();
    const promise = Promise.reject('Error Message');
    const result = processMaybePromise(promise, callback);

    await expect(result).rejects.toBe('Error Message');
    expect(callback).not.toHaveBeenCalled();
  });
});
