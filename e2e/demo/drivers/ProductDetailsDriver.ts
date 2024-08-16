import {Step} from 'jest-allure2-reporter/api';
import type {FakeBrowser} from './FakeBrowser';
import {throwErrorWithChance} from "./utils";
import {AssertionError} from "./errors";

export class ProductDetailsDriver {
  constructor(protected readonly browser: FakeBrowser) {}

  @Step('Navigate to next image')
  async navigateToNextImage() {
    await this.browser.toggleState('next', true);
    return this.browser.takeScreenshot();
  }

  @Step('Zoom in image')
  async zoomInImage() {
    await this.browser.toggleState('zoom-in', true);
    await this.browser.saveScreenshot();
    await throwErrorWithChance(1, 500, [new AssertionError('Expected .product-image to be visible, but it was overlayed by another element')])
  }

  @Step('Expand image')
  async expandImage() {
    await this.browser.toggleState('expand', true);
    return this.browser.takeScreenshot();
  }
}
