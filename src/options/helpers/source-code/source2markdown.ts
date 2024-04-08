import type { KeyedHelperCustomizer } from 'jest-allure2-reporter';

const FENCE = '```';

export const source2markdown: KeyedHelperCustomizer<'source2markdown'> = () => (item) => {
  if (!item || !item.code) return '';
  const language = item.language || '';
  const title = item.fileName ? ` title="${item.fileName}"` : '';
  // this snippet also includes file name to work with Markdown plugin
  return `${FENCE}${language}${title}\n${item.code}\n${FENCE}`;
};
