import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Owner = (value: string) => $Label(LabelName.OWNER, value);
