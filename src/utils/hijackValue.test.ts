import { hijackValue } from './hijackValue';

describe('hijackValue', () => {
  // Test: Direct Value
  it('should call the callback with a direct value', () => {
    const callback = jest.fn();
    const result = hijackValue(5, callback);

    expect(callback).toHaveBeenCalledWith(5);
    expect(result).toBe(5);
  });

  // Test: Promise
  it('should call the callback with a resolved promise', async () => {
    const callback = jest.fn();
    const promise = Promise.resolve(10);
    const result = hijackValue(promise, callback);

    await expect(result).resolves.toBe(10);
    expect(callback).toHaveBeenCalledWith(10);
  });

  // Test: Synchronous Function
  it('should call the callback with the value returned from a synchronous function', () => {
    const callback = jest.fn();
    const function_ = () => 15;
    const wrapper = hijackValue(function_, callback);

    expect(wrapper()).toBe(15);
    expect(callback).toHaveBeenCalledWith(15);
  });

  // Test: Asynchronous Function
  it('should call the callback with the value resolved from an asynchronous function', async () => {
    const callback = jest.fn();
    const asyncFunction = async () => 20;
    const wrapper = hijackValue(asyncFunction, callback);

    await expect(wrapper()).resolves.toBe(20);
    expect(callback).toHaveBeenCalledWith(20);
  });

  // Test: Ensuring `this` and arguments are preserved in function hijack
  it('should preserve `this` context and arguments in hijacked function', () => {
    const function_ = function (
      this: { multiplier: number },
      a: number,
      b: number,
    ) {
      return (a + b) * this.multiplier;
    };
    const wrapper = hijackValue(function_, (x) => x).bind({ multiplier: 3 });

    expect(wrapper(10, 20)).toBe(90); // (10 + 20) * 3
  });

  // Test: Proper handling of rejected promises
  it('should propagate rejection in promises', async () => {
    const callback = jest.fn();
    const promise = Promise.reject('Error Message');
    const result = hijackValue(promise, callback);

    await expect(result).rejects.toBe('Error Message');
    expect(callback).not.toHaveBeenCalled();
  });

  // Test: Function toString() Overriding
  it('should preserve the toString representation of the original function', () => {
    const callback = jest.fn();
    const function_ = function add(a: number, b: number) {
      return a + b;
    };
    const originalToString = function_.toString();
    const wrapper = hijackValue(function_, callback);

    expect(wrapper.toString()).toBe(originalToString);
  });
});
