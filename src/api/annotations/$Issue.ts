import { $Link } from './$Link';

export const $Issue = (issue: string) => $Link({ name: issue, url: issue, type: 'issue' });
