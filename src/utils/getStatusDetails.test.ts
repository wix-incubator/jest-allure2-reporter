import { getStatusDetails } from './getStatusDetails';

describe('getStatusDetails', () => {
  it('should return undefined for falsy input', () => {
    expect(getStatusDetails(null)).toBeUndefined();
    expect(getStatusDetails(void 0)).toBeUndefined();
    expect(getStatusDetails('')).toBeUndefined();
    expect(getStatusDetails(0)).toBeUndefined();
    expect(getStatusDetails(false)).toBeUndefined();
  });

  it('should handle string input', () => {
    const input = 'Test error message';
    expect(getStatusDetails(input)).toEqual({ message: input });
  });

  it('should handle Error object with a non-string properties', () => {
    class StringLike {
      _value: string;

      constructor(value: string) {
        this._value = value;
      }

      toString() {
        return this._value;
      }
    }

    const error = Object.assign(new Error('error'), {
      message: new StringLike('pseudo-message'),
      name: new StringLike('pseudo-name'),
      stack: new StringLike('pseudo-stack'),
    });

    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain('pseudo-stack');
    expect(result).not.toHaveProperty('trace');
  });

  it('should handle Error object with stack trace', () => {
    const error = new Error('Test error');
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain('Test error');
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should not duplicate error message if it starts with empty line', () => {
    const error = new Error('  \nERROR:\nExpected: 5\nActual: 4');
    const message = getStatusDetails(error)!.message!;
    expect(message.indexOf('Expected: 5')).toBeGreaterThan(0);
    expect(message.lastIndexOf('Expected: 5')).toBe(message.indexOf('Expected: 5'));
  });

  it('should handle Error object without stack trace', () => {
    const error = new Error('Test error');
    Object.defineProperty(error, 'stack', { value: undefined });
    const result = getStatusDetails(error);
    expect(result).toEqual({ message: 'Error: Test error' });
  });

  it('should handle custom error objects', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }
    const error = new CustomError('Custom error message');
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain('Custom error message');
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should handle non-Error objects', () => {
    const input = { message: 'Custom error object' };
    const result = getStatusDetails(input);
    expect(result).toEqual({ message: 'Custom error object' });
  });

  it('should handle Error with empty message', () => {
    // eslint-disable-next-line unicorn/error-message
    const error = new Error();
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toBeTruthy();
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should handle Error with multiline message', () => {
    const error = new Error('Line 1\nLine 2\nLine 3');
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain('Line 1\nLine 2\nLine 3');
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should handle Error with very long message', () => {
    const longMessage = 'a'.repeat(10_000);
    const error = new Error(longMessage);
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain(longMessage);
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should handle Error with non-string properties', () => {
    const error: any = new Error('Test error');
    error.code = 404;
    error.details = { foo: 'bar' };
    const result = getStatusDetails(error);
    expect(result).toHaveProperty('message');
    expect(result?.message).toContain('Test error');
    expect(result).toHaveProperty('trace');
    expect(result?.trace).toContain('at ');
  });

  it('should handle thrown string', () => {
    let result;
    try {
      throw 'Thrown string';
    } catch (error) {
      result = getStatusDetails(error);
    }
    expect(result).toEqual({ message: 'Thrown string' });
  });

  it('should handle thrown number', () => {
    let result;
    try {
      throw 404;
    } catch (error) {
      result = getStatusDetails(error);
    }
    expect(result).toEqual({ message: '404' });
  });

  it('should handle thrown object', () => {
    let result;
    try {
      throw { code: 'NETWORK_ERROR', details: 'Connection refused' };
    } catch (error) {
      result = getStatusDetails(error);
    }
    expect(result).toEqual({ message: '{"code":"NETWORK_ERROR","details":"Connection refused"}' });
  });
});
