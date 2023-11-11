import type { Category } from '@noomorph/allure-js-commons';
import { Status } from '@noomorph/allure-js-commons';

export const DEFAULT_CATEGORIES: Category[] = [
  { name: 'Product defects', matchedStatuses: [Status.FAILED] },
  { name: 'Test defects', matchedStatuses: [Status.BROKEN] },
];
