import { beforeAll, describe, expect, test } from '@jest/globals';

/**
 * @epic Product Discovery
 * @feature Read Reviews
 * @package com.example.shop.reviews
 */
import { FakeBrowser, ProductReviewsDriver } from '../drivers';

describe('Product Catalog', () => {
  let browser: FakeBrowser;
  let productReviewsDriver: ProductReviewsDriver;

  /** Initialize test suite */
  beforeAll(() => {
    browser = new FakeBrowser();
    productReviewsDriver = new ProductReviewsDriver(browser);
  });

  describe('Product Reviews', () => {
    /** Open Product Details page and find reviews */
    beforeAll(async () => {
      await browser.navigate('/products/long-sleeved-t-shirt');
      await productReviewsDriver.scrollToReviews();
    });

    /**
     * @story View Reviews
     * @testClass ReviewService
     * @testMethod ReviewService.loadReviews()
     */
    test('Product reviews widget loads in collapsed state', async () => {
      await expect(browser).toMatchImageSnapshot();
    });

    /**
     * @story View Reviews
     * @testClass ReviewService
     * @testMethod ReviewService.loadReviews()
     */
    test('Product reviews widget can be expanded', async () => {
      await productReviewsDriver.expandReviewsSection();
      await expect(browser).toMatchImageSnapshot();
    });

    /**
     * @story Submit Review
     * @testClass ReviewService
     * @testMethod ReviewService.submitReview()
     */
    test('Product reviews widget allows to submit a review', async () => {
      await productReviewsDriver.openReviewForm();
      await productReviewsDriver.fillReviewForm({
        displayName: 'John Doe',
        email: 'john.doe@example.com',
        rating: 3,
        title: 'Do something every day that will make you happy',
        comment: 'Those great big fluffy clouds. ' +
          'There he comes. ' +
          'This is a happy place, little squirrels live here and play. ' +
          'Let your imagination just wonder around when you\'re doing these things. ' +
          'There isn\'t a rule. ' +
          'You just practice and find out which way works best for you.',
      });

      try {
        await productReviewsDriver.submitReview();
      } catch {
        // Fail silently to see incorrect screenshot state
      }

      await expect(browser).toMatchImageSnapshot();
    });
  });
});
