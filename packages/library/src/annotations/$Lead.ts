import { $Push } from 'jest-metadata';

import { LEAD } from '../constants';

export const $Lead = (lead: string) => $Push(LEAD, lead);
