import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Feature = (value: string) => $Label(LabelName.FEATURE, value);
