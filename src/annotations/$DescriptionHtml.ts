import { $Push } from 'jest-metadata';

import { DESCRIPTION_HTML } from '../constants';

export const $DescriptionHtml = (descriptionHtml: string) =>
  $Push(DESCRIPTION_HTML, descriptionHtml);
