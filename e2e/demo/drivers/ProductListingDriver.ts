import { Step } from 'jest-allure2-reporter/api';
import type {FakeBrowser} from './FakeBrowser';
import {Screenshot} from "./utils";

export class ProductListingDriver {
  constructor(protected readonly browser: FakeBrowser) {}

  @Step('Open Filters')
  @Screenshot()
  async openFilters() {
    await this.browser.toggleState('filters', true);
    return this.browser.takeScreenshot();
  }

  @Step('Apply Filters - {{json criteria}}', ['criteria'])
  @Screenshot()
  async applyFilters(_criteria: Record<string, unknown>) {
    await this.browser.toggleState('applied-filters', true);
    return this.browser.takeScreenshot();
  }

  @Step('Close Filters')
  @Screenshot()
  async closeFilters() {
    await this.browser.toggleState('filters', false);
    return this.browser.takeScreenshot();
  }

  @Step('Open Sorting')
  @Screenshot()
  async openSorting() {
    await this.browser.toggleState('sorting', true);
    return this.browser.takeScreenshot();
  }

  @Step('Apply Sorting {{json criteria}}', ['criteria'])
  @Screenshot()
  async applySorting(_criteria: Record<string, unknown>) {
    await this.browser.toggleState('applied-sorting', true);
    return this.browser.takeScreenshot();
  }

  @Step('Close Sorting')
  @Screenshot()
  async closeSorting() {
    await this.browser.toggleState('sorting', false);
    return this.browser.takeScreenshot();
  }
}
