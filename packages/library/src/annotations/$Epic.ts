import { $Push } from 'jest-metadata';

import { EPIC } from '../constants';

export const $Epic = (name: string) => $Push(EPIC, name);
