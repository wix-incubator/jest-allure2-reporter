import { $Set } from 'jest-metadata';

import { ALLURE_ID } from '../constants';

export const $AllureId = (id: string) => $Set(ALLURE_ID, id);
