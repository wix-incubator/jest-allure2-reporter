import {allure, Step} from 'jest-allure2-reporter/api';
import type {FakeBrowser} from './FakeBrowser';
import {Screenshot, throwErrorWithChance} from "./utils";
import {NetworkError} from "./errors";

interface ReviewFormData {
  email: string;
  displayName: string;
  rating: number;
  title: string;
  comment: string;
}

export class ProductReviewsDriver {
  constructor(protected readonly browser: FakeBrowser) {}

  @Step('Scroll to reviews section')
  @Screenshot()
  async scrollToReviews() {
    await this.browser.toggleState(['review', 'scrolled'], true);
    return this.browser.takeScreenshot();
  }

  @Step('Expand reviews section')
  @Screenshot()
  async expandReviewsSection() {
    await this.browser.toggleState('scrolled', false);
    return this.browser.takeScreenshot();
  }

  @Step('Open review form')
  @Screenshot()
  async openReviewForm() {
    await this.browser.toggleState('form', true);
    return this.browser.takeScreenshot();
  }

  @Step('Fill review form: {{stars data.rating}}', [{ name: 'data', mode: 'hidden' }])
  @Screenshot()
  async fillReviewForm(data: ReviewFormData) {
    allure.parameters(data);
    await this.browser.toggleState('completed', true);
    return this.browser.takeScreenshot();
  }

  @Step('Submit review')
  @Screenshot()
  async submitReview() {
    await throwErrorWithChance(1, 500, [new NetworkError('Failed to connect to contact form service.')])

    await this.browser.toggleState('form', false);
    return this.browser.takeScreenshot();
  }
}
