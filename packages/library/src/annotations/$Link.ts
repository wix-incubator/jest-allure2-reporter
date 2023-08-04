import { $Push } from 'jest-metadata/annotations';

import { LINK } from '../constants';

export const $Link = (options: string | LinkOptions) =>
  $Push(
    LINK,
    typeof options === 'string' ? { name: options, url: options } : options,
  );

export type LinkOptions = {
  name: string;
  url: string;
  type?: string;
};
