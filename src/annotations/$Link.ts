import { $Push } from 'jest-metadata';
import type { Link } from '@noomorph/allure-js-commons';

import { LINKS } from '../constants';

export const $Link = (maybeUrl: string | Link, maybeName?: string) => {
  const link =
    typeof maybeUrl === 'string'
      ? { name: maybeName ?? maybeUrl, url: maybeUrl }
      : maybeUrl;

  $Push(LINKS, link);
};
