import { Step } from 'jest-allure2-reporter/api';

const { describe, expect, test } = require('@jest/globals');

describe('Step', () => {
  class FactorialCalculator {
    @Step('Get the factorial of {{n}}', ['n'])
    static factorial(n: number): number {
      return n === 0 ? 1 : n * this.factorial(n - 1);
    }
  }

  /**
   * Verifies that the return value of the decorated method is not affected.
   * Besides, every invocation of the method is reported as a separate step.
   */
  test('should report steps via a decorator', () => {
    expect(FactorialCalculator.factorial(3)).toBe(6);
  });
});
