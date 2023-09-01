import { $Push } from 'jest-metadata';

import { STORY } from '../constants';

export const $Story = (name: string) => $Push(STORY, name);
