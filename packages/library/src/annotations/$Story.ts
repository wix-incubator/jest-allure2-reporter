import { LabelName } from '@noomorph/allure-js-commons';

import { $Label } from './$Label';

export const $Story = (value: string) => $Label(LabelName.STORY, value);
