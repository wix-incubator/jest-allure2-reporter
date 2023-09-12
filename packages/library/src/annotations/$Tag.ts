import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Tag = (...tagNames: string[]) =>
  $Label(LabelName.TAG, ...tagNames);
