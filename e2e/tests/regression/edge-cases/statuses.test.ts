import { allure } from '../../../../dist/api';

const dummyTest = () => expect(true).toBe(true);
const timeoutTest = (_done: Fn) => {
  expect({ seed: Math.random() }).toMatchSnapshot();
  // _done() is never called
};
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
    test('failed timeout', timeoutTest, 100);
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
      ['beforeEach hook', (callback: Fn) => (beforeEach(callback), test('', dummyTest), void 0)],
      ['afterEach hook', (callback: Fn) => (afterEach(callback), test('', dummyTest), void 0)],
      ...(callback === passingAssertion ? [
        ['beforeAll hook', (callback: Fn) => (beforeAll(callback), test('', dummyTest), void 0)],
        ['afterAll hook', (callback: Fn) => (afterAll(callback), test('', dummyTest), void 0)],
      ] as [string, (callback: Fn) => void][] : []),
    ])('%s', (_suite: string, hook: (callback: Fn) => void) => {
      hook(function () {
        allure.status('unknown', { message: 'Custom message', trace: 'Custom trace' });
        callback();
      });
    });
  });

  describe('Status override while timing out', () => {
    test('test', (done) => {
      timeoutTest(done);
      allure.status('unknown', {message: 'Custom message', trace: 'Custom trace'});
    }, 100);

    describe.each([
      ['beforeAll hook', beforeAll],
      ['beforeEach hook', beforeEach],
      ['afterEach hook', afterEach],
      ['afterAll hook', afterAll],
    ])('%s', (_suite, hook) => {
      hook(function (_done) {
        allure.status('unknown', {message: 'Custom message', trace: 'Custom trace'});
      }, 100);

      test('dummy', dummyTest);
    });
  });
});
