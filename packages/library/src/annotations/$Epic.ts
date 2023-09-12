import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Epic = (value: string) => $Label(LabelName.EPIC, value);
