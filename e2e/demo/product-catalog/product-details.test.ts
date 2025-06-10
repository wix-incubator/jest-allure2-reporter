import { afterEach, beforeAll, describe, expect, test } from '@jest/globals';

/**
 * @epic Product Discovery
 * @feature View Product Details
 * @story View Product Details
 * @package com.example.shop.catalog
 * @testClass ProductDetailsController
 */
import { FakeBrowser, ProductDetailsDriver } from '../drivers';

describe('Product Catalog', () => {
  let browser: FakeBrowser;
  let productDetailsDriver: ProductDetailsDriver;

  /** Initialize test suite */
  beforeAll(() => {
    browser = new FakeBrowser();
    productDetailsDriver = new ProductDetailsDriver(browser);
  });

  describe('Product Details', () => {
    /** Open Product Details page */
    beforeAll(async () => {
      await browser.navigate('/products/long-sleeved-t-shirt');
    });

    /** Refresh page to reset state */
    afterEach(async () => {
      await browser.refresh();
    });

    test('Widget loads correctly', async () => {
      await expect(browser).toMatchImageSnapshot();
    });

    test('Image gallery navigation works correctly', async () => {
      await productDetailsDriver.navigateToNextImage();
      await expect(browser).toMatchImageSnapshot();
    });

    test('Image zoom in works correctly', async () => {
      await productDetailsDriver.zoomInImage();
      await expect(browser).toMatchImageSnapshot();
    });

    test('Expanding image works correctly', async () => {
      await productDetailsDriver.expandImage();
      await expect(browser).toMatchImageSnapshot();
    });
  });
});
