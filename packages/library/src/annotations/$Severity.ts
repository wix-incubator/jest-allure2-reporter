import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Severity = (value: string) => $Label(LabelName.SEVERITY, value);
