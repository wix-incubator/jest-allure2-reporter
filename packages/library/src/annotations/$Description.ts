import {$Push} from "jest-metadata/annotations";

import { DESCRIPTION } from '../constants';

export const $Description = (description: string) =>
  $Push(DESCRIPTION, description);
