[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua)

<div align="center">

<img src="docs/img/logo-full.svg" height="300" alt="jest-allure2-reporter Logo" />

# jest-allure2-reporter

**Allure Framework integration for Jest tests - beautiful, detailed reports**

[![npm version](https://badge.fury.io/js/jest-allure2-reporter.svg)](https://badge.fury.io/js/jest-allure2-reporter)
[![CI](https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml/badge.svg)](https://github.com/wix-incubator/jest-allure2-reporter/actions/workflows/ci.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

</div>

## What is jest-allure2-reporter?

This library connects Jest tests with [Allure Framework](https://allurereport.org/) to generate rich, interactive test reports that provide:

- Clear test execution flows with step-by-step breakdowns
- Attachments (screenshots, logs, data)
- Historical test data and trends
- Comprehensive context for easier debugging

[![Jest Allure2 Reporter Demo](https://github.com/user-attachments/assets/80b09093-9e5b-40a6-b9dc-ce4b75832e9d)](https://www.youtube.com/watch?v=RkLAB1nfAOY)

<p align="center"><i>Watch how jest-allure2-reporter turns test investigations into detective stories with every clue clearly laid out</i></p>

As shown in the video, you can easily:
- Add metadata with docblock pragmas or the programmatic API
- Automatically track steps and attach artifacts using decorators
- Organize your tests with powerful configuration options

## Quick Installation

```bash
npm install --save-dev jest-allure2-reporter
```

Configure Jest (e.g., in `jest.config.js`):

```javascript
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // Add to your existing configuration
  reporters: [
    'default', // Keep for console output
    'jest-allure2-reporter',
  ],
  testEnvironment: 'jest-allure2-reporter/environment-node',
  // Or for browser testing: 'jest-allure2-reporter/environment-jsdom'
};
```

## Key Features

- **Test Steps**: Define and visualize test steps using the `@Step` decorator
- **Rich Attachments**: Add screenshots, logs, JSON data, etc. to your test reports
- **Test Metadata**: Enhance reports with descriptions, links, tags, and more
- **TypeScript Support**: Comprehensive type definitions for better development
- **Visual Regression**: Support for image snapshot comparisons and diff visualization

## Basic Usage

```typescript
// my-page.ts
import { allure, Step } from 'jest-allure2-reporter/api';

export class MyPage {
  @Step('Load user data for ID: {{userId}}')
  async loadUserData(userId: string) {
    // Fetch data logic...
    const userData = { name: 'John Doe', id: userId };

    // Add JSON attachment
    allure.attachment('User Data', JSON.stringify(userData, null, 2), 'application/json');
    return userData;
  }
}

// my.test.ts
import { allure } from 'jest-allure2-reporter/api';
import { MyPage } from './my-page';

describe('User Profile', () => {
  const page = new MyPage();

  it('should load user data correctly', async () => {
    // Add metadata
    allure.feature('Profile');
    allure.severity('critical');

    const userData = await page.loadUserData('user123');
    expect(userData.name).toBe('John Doe');
  });
});
```

## Generating Reports

After running your tests, generate the Allure report:

```bash
# Install Allure command line if needed
npm install -g allure-commandline

# Generate and open report
allure generate allure-results --clean
allure open
```

For CI environments:
```bash
ALLURE_NO_ANALYTICS=1 allure generate allure-results --clean
```

## Core Features

### Test Steps with `@Step`

```typescript
@Step('Add item "{{itemName}}" to cart')
async addItemToCart(itemName: string, quantity: number) {
  allure.parameter('Quantity', quantity);
  // Implementation...
}
```

### Attachments

```typescript
// Direct attachment
allure.attachment('Screenshot', screenshotBuffer, 'image/png');

// Method decorator
@Attachment('Order Details', 'application/json')
getOrderDetails() {
  return JSON.stringify(this.orderData);
}

// File attachment
@FileAttachment('Invoice', 'application/pdf')
getInvoicePath() {
  return '/path/to/invoice.pdf';
}
```

### Test Metadata

```typescript
// Runtime API
allure.epic('User Management');
allure.feature('Registration');
allure.tag('smoke', 'critical');
allure.link('https://example.com/requirements/REQ-101', 'REQ-101');

// Docblock annotations
/**
 * @epic Product Discovery
 * @feature Product Details
 * @severity blocker
 */
describe('Product Details', () => {
  // Tests...
});

// BDD-style
$Epic('E-commerce');
$Feature('Shopping Cart');
describe('Cart Functionality', () => {
  // Tests...
});
```

## Configuration

For advanced configuration options including custom categories, environment details, and more, refer to our [documentation](https://wix-incubator.github.io/jest-allure2-reporter/).

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://wix-incubator.github.io/jest-allure2-reporter/about/contributing) for details.

## License

[MIT License](LICENSE)
