import { $Push } from 'jest-metadata';

import { DESCRIPTION } from '../../metadata/constants';

export const $Description = (description: string) =>
  $Push(DESCRIPTION, description);
