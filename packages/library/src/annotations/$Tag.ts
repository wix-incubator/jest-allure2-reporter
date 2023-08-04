import {$Push} from "jest-metadata/annotations";

export const $Tag = (...tagNames: string[]) => $Push(TAG, ...tagNames);
