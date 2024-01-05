import { $Push } from 'jest-metadata';

import { DESCRIPTION } from '../../constants';

export const $Description = (description: string) =>
  $Push(DESCRIPTION, description);
