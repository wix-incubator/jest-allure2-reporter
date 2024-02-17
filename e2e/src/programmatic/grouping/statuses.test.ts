import { allure } from 'jest-allure2-reporter/api';

const dummyTest = () => expect(true).toBe(true);
const passingAssertion = () => expect(2 + 2).toBe(4);
const failingAssertion = () => expect(2 + 2).toBe(5);
const failingSnapshot = () => expect({ seed: Math.random() }).toMatchSnapshot();
const brokenAssertion = () => { throw new Error('This assertion is broken'); };

type Fn = () => any;

describe('Status tests', () => {
  describe('Simple', () => {
    test('passed', passingAssertion);
    test('failed assertion', failingAssertion);
    test('failed snapshot', failingSnapshot);
    test('broken', brokenAssertion);
    test.skip('skipped', passingAssertion);
    test.todo('todo');
  });

  describe.each([
    ['passing', passingAssertion],
    ['failed assertion in a ', failingAssertion],
    ['failed snapshot in a ', failingSnapshot],
    ['broken', brokenAssertion],
  ])('Status override in a %s', (_parentSuite, callback) => {
    describe.each([
      ['test', (callback: Fn) => (test('', callback), void 0)],
      ['test step', (callback: Fn) => (test('', () => allure.step('a step', callback)), void 0)],
      ['beforeAll hook', (callback: Fn) => (beforeAll(callback), test('', dummyTest), void 0)],
      ['beforeEach hook', (callback: Fn) => (beforeEach(callback), test('', dummyTest), void 0)],
      ['afterEach hook', (callback: Fn) => (afterEach(callback), test('', dummyTest), void 0)],
      ['afterAll hook', (callback: Fn) => (afterAll(callback), test('', dummyTest), void 0)],
    ])('%s', (_suite, hook) => {
      hook(function () {
        allure.status('unknown', { message: 'Custom message', trace: 'Custom trace' });
        callback();
      });
    });
  });
});
