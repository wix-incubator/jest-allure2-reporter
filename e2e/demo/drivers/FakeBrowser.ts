import { allure, Step } from 'jest-allure2-reporter/api';
import { kebabCase } from 'lodash';
import fs from 'node:fs/promises';
import path from 'node:path';
import { sleep } from './utils';

export class FakeBrowser {
  private url = '/';
  private state = new Set<string>();

  @Step('Navigate to: {{url}}', ['url'])
  async navigate(url: string): Promise<void> {
    this.url = url;
    // Reset state on navigation
    this.state.clear();

    await sleep(1000, 2000);

    const fullUrl = 'https://publicissapient.github.io/accessible-ecommerce-demo' + url;
    allure.link(fullUrl, url);

    const screenshot = await this.takeScreenshot();
    if (screenshot) {
      await allure.attachment('Screenshot', screenshot, 'image/png');
    }
  }

  async refresh() {
    this.state.clear();
    await sleep(1000, 2000);
  }

  async takeScreenshot(extension = '.png'): Promise<Buffer | null> {
    const fileName = [kebabCase(this.url), ...this.state].join('_') + extension;
    const filePath = path.join('demo/__fixtures__', fileName);
    const exists = await fs.access(filePath).catch(() => false);
    if (exists === false && extension === '.png') {
      console.error(filePath);
    }
    return exists === false ? null : fs.readFile(filePath);
  }

  async saveScreenshot(): Promise<void> {
    const screenshot = await this.takeScreenshot();
    if (screenshot) {
      await allure.attachment('Screenshot', screenshot, 'image/png');
    }
  }

  async toggleState(modifiers: string | string[], enabled: boolean): Promise<void> {
    const array = typeof modifiers === 'string' ? [modifiers] : modifiers;

    for (const modifier of array) {
      if (enabled) {
        this.state.add(modifier);
      } else {
        this.state.delete(modifier);
      }
    }

    await sleep(1000, 2000);
  }
}
