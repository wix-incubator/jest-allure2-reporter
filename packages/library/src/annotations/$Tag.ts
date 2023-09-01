import { $Push } from 'jest-metadata';

import { TAG } from '../constants';

export const $Tag = (...tagNames: string[]) => $Push(TAG, ...tagNames);
