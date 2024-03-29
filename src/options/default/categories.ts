import type { Category } from 'jest-allure2-reporter';

export const categories: Category[] = [
  { name: 'Product defects', matchedStatuses: ['failed'] },
  { name: 'Test defects', matchedStatuses: ['broken'] },
];
