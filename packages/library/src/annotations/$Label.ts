import type { LabelName } from '@noomorph/allure-js-commons';
import { $Push } from 'jest-metadata';

import { LABELS } from '../constants';

export const $Label = (name: LabelName, ...values: unknown[]) =>
  $Push(LABELS, ...values.map((value) => ({ name, value: `${value}` })));
