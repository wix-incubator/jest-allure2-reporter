/**
 * ### Navigation test suite
 *
 * This suite tests the navigation elements of the website, focusing on the mobile experience.
 */
import { FakeBrowser, MenuDriver } from '../drivers';

describe('Navigation', () => {
  let browser: FakeBrowser;
  let menuDriver: MenuDriver;

  /** Initialize test suite */
  beforeAll(() => {
    browser = new FakeBrowser();
    menuDriver = new MenuDriver(browser);
  });

  describe('Menu (Mobile)', () => {
    /** Open Home page */
    beforeAll(async () => {
      await browser.navigate('/');
    });

    /**
     * @package com.example.shop
     * @epic User Experience
     * @feature Site Navigation
     * @story Mobile Menu
     */
    test('should expand mobile menu when tapping the Burger Icon', async () => {
      await menuDriver.expandMenu();
      await expect(browser).toMatchImageSnapshot();
    });

    /**
     * @epic User Experience
     * @feature Checkout
     * @story Accessing Cart
     * @package com.example.shop.cart
     * @testClass CartController
     * @testMethod CartController.getItems()
     */
    test('has an expandable Cart', async () => {
      await menuDriver.openCart();
      await expect(browser).toMatchImageSnapshot();
    });
  });
});
