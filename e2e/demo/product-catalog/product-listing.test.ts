/**
 * @epic Product Discovery
 * @feature Browse Products
 * @severity blocker
 * @package com.example.shop.catalog
 */
import { FakeBrowser, ProductListingDriver } from '../drivers';

describe('Product Catalog', () => {
  let browser: FakeBrowser;
  let productListingDriver: ProductListingDriver;

  /** Initialize test suite */
  beforeAll(() => {
    browser = new FakeBrowser();
    productListingDriver = new ProductListingDriver(browser);
  });

  describe('Product Listing', () => {
    /** Open Products page */
    beforeEach(async () => {
      await browser.navigate('/products');
    });

    /**
     * @story View Product List
     * @testClass ProductListingController
     * @testMethod ProductListingController.loadList()
     */
    test('Product list loads successfully', async () => {
      await expect(browser).toMatchImageSnapshot();
    });

    /**
     * @story Filter Products
     * @testClass ProductListingFilter
     * @testMethod ProductListingFilter.applyFilters()
     */
    test('Product filtering works correctly', async () => {
      await productListingDriver.openFilters();
      await productListingDriver.applyFilters({ colors: ['Blue'] });
      await productListingDriver.closeFilters();
      await expect(browser).toMatchImageSnapshot();
    });

    /**
     * @story Sort Products
     * @testClass ProductListingSorter
     * @testMethod ProductListingSorter.sort()
     */
    test('Product sorting works correctly', async () => {
      await productListingDriver.openSorting();
      await productListingDriver.applySorting({ by: 'Price low to high' });
      await productListingDriver.closeSorting();
      await expect(browser).toMatchImageSnapshot();
    });
  });
});
