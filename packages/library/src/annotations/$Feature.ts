import { $Push } from 'jest-metadata';

import { FEATURE } from '../constants';

export const $FEATURE = (name: string) => $Push(FEATURE, name);
