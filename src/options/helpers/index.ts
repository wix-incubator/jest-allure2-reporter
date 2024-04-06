import type { ExtractSourceCodeHelper } from 'jest-allure2-reporter';

export { getExecutorInfo } from './executor';
export { manifest } from './manifest';
export { markdown2html } from './markdown';
export { stripAnsi } from './strip-ansi';

export const extractSourceCode =
  (): ExtractSourceCodeHelper =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (_: unknown, recursive?: true): any =>
    recursive ? [] : void 0;

export const source2markdown = () => () => '';
