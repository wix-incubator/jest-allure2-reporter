import util from 'node:util';
import { allure } from 'jest-allure2-reporter/api';
import { FakeBrowser, utils } from './drivers';

jest.setTimeout(30000);

allure.$plug((context) => {
  context.handlebars.registerHelper('json', obj => {
    return JSON.stringify(obj).replace(/['"]/g, '').slice(1, -1);
  });

  context.handlebars.registerHelper('stars', obj => {
    return typeof obj === 'number' ? '★ '.repeat(obj) : '#STARS_ERROR';
  });
});

expect.extend({
  async toMatchImageSnapshot(received: unknown) {
    if (!(received instanceof FakeBrowser)) {
      throw new TypeError(`Expected a FakeBrowser instance, but got: ${util.inspect(received)}`);
    }

    const pass = await utils.toMatchImageSnapshot(received);
    const pct = (10*Math.random()).toFixed(1);
    return {
      message: () => `Expected screenshots to match, but found ${pct}% difference`,
      pass,
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): Promise<R>;
    }
  }
}
