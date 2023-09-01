import { $Push } from 'jest-metadata';

import { OWNER } from '../constants';

export const $Owner = (owner: string) => $Push(OWNER, owner);
