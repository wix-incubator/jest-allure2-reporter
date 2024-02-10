import { $Push } from 'jest-metadata';

import { DESCRIPTION_HTML } from '../../metadata/constants';

export const $DescriptionHtml = (descriptionHtml: string) =>
  $Push(DESCRIPTION_HTML, descriptionHtml);
