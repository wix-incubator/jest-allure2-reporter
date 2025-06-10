import { describe, expect, it, jest } from '@jest/globals';

import { thruMaybePromise } from './thruMaybePromise';

describe('thruMaybePromise', () => {
  // Test: Direct Value
  it('should call the callback with a direct value', async () => {
    const callback = jest.fn(async (x: number) => ++x);
    const result = thruMaybePromise(5, callback);

    expect(callback).toHaveBeenCalledWith(5);
    await expect(result).resolves.toBe(6);
  });

  // Test: Promise
  it('should call the callback with a resolved promise', async () => {
    const callback = jest.fn(async (x: number) => ++x);
    const promise = Promise.resolve(10);
    const result = thruMaybePromise(promise, callback);

    expect(callback).not.toHaveBeenCalledWith(10);
    await expect(result).resolves.toBe(11);
    expect(callback).toHaveBeenCalledWith(10);
  });

  // Test: Proper handling of rejected promises
  it('should propagate rejection in promises', async () => {
    const callback = jest.fn();
    const promise = Promise.reject('Error Message');
    const result = thruMaybePromise(promise, callback);

    await expect(result).rejects.toBe('Error Message');
    expect(callback).not.toHaveBeenCalled();
  });
});
