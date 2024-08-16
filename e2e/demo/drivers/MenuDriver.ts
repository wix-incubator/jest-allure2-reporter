import { Step } from 'jest-allure2-reporter/api';
import type { FakeBrowser } from './FakeBrowser';

export class MenuDriver {
  constructor(protected readonly browser: FakeBrowser) {}

  @Step('Expand menu')
  async expandMenu() {
    await this.browser.toggleState('menu', true);
  }

  @Step('Open Cart')
  async openCart() {
    await this.browser.toggleState('cart', true);
  }
}
