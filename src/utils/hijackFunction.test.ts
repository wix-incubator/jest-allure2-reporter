import { describe, expect, it, jest } from '@jest/globals';

import { hijackFunction } from './hijackFunction';

describe('hijackFunction', () => {
  // Test: Synchronous Function
  it('should call the callback with the value returned from a synchronous function', () => {
    const callback = jest.fn();
    const function_ = () => 15;
    const wrapper = hijackFunction(function_, callback);

    expect(wrapper()).toBe(15);
    expect(callback).toHaveBeenCalledWith(15, []);
  });

  // Test: Asynchronous Function
  it('should call the callback with the value resolved from an asynchronous function', async () => {
    const callback = jest.fn();
    const asyncFunction = async () => 20;
    const wrapper = hijackFunction(asyncFunction, callback);

    await expect(wrapper()).resolves.toBe(20);
    expect(callback).toHaveBeenCalledWith(20, []);
  });

  // Test: Ensuring `this` and arguments are preserved in function hijack
  it('should preserve `this` context and arguments in hijacked function', () => {
    const function_ = function (this: { multiplier: number }, a: number, b: number) {
      return (a + b) * this.multiplier;
    };
    const wrapper = hijackFunction(function_, (x) => x).bind({ multiplier: 3 });

    expect(wrapper(10, 20)).toBe(90); // (10 + 20) * 3
  });

  // Test: Transparent override check
  it("should preserve original function's name and toString() method", () => {
    function add(a: number, b: number) {
      return a + b;
    }

    const callback = jest.fn();
    const wrapper = hijackFunction(add, callback);

    expect(wrapper.toString()).toBe(add.toString());
    expect(wrapper.name).toBe('add');
  });

  it('should wait for async callback to complete before returning', async () => {
    let callbackCompleted = false;

    const callback = async (_value: number) => {
      // Simulate async work in callback
      await new Promise((resolve) => setTimeout(resolve, 100));
      callbackCompleted = true;
    };

    const function_ = () => 42;
    const wrapper = hijackFunction(function_, callback);

    const startTime = Date.now();
    const result = await wrapper();
    const endTime = Date.now();

    // The function should return the original result
    expect(result).toBe(42);

    // The callback should have completed before function returns
    expect(callbackCompleted).toBe(true);

    // Total time should include callback time (~100ms)
    expect(endTime - startTime).toBeGreaterThanOrEqual(90);
  });

  it('should wait for async callback when original function returns Promise', async () => {
    let callbackCompleted = false;

    const callback = async (_value: number) => {
      // Simulate async work in callback
      await new Promise((resolve) => setTimeout(resolve, 50));
      callbackCompleted = true;
    };

    const asyncFunction = async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 100;
    };

    const wrapper = hijackFunction(asyncFunction, callback);

    const startTime = Date.now();
    const result = await wrapper();
    const endTime = Date.now();

    // The function should return the original result
    expect(result).toBe(100);

    // The callback should have completed before function returns
    expect(callbackCompleted).toBe(true);

    // Total time should include both function and callback time
    expect(endTime - startTime).toBeGreaterThanOrEqual(50);
  });

  // Test: Sync function with async callback - CURRENTLY FAILING
  it('should wait for async callback when original function is synchronous', async () => {
    let callbackCompleted = false;

    const callback = async (_value: string) => {
      // Simulate async work in callback
      await new Promise((resolve) => setTimeout(resolve, 75));
      callbackCompleted = true;
    };

    const syncFunction = () => 'immediate';
    const wrapper = hijackFunction(syncFunction, callback);

    const startTime = Date.now();
    const result = await wrapper();
    const endTime = Date.now();

    // The function should return the original result
    expect(result).toBe('immediate');

    // The callback should have completed before function returns
    expect(callbackCompleted).toBe(true);

    // Total time should include callback time (~75ms)
    expect(endTime - startTime).toBeGreaterThanOrEqual(70);
  });
});
