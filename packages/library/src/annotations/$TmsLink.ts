import { $Link } from './$Link';

export const $TmsLink = (issue: string) =>
  $Link({ name: issue, url: issue, type: 'tms' });
