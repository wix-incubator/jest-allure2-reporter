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
});
