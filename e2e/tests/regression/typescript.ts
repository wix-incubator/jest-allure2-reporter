/**
 * Client tests for login screen
 *
 * @owner Security Team
 * @severity Critical
 * @tag regression,auth
 * @tag smoke
 */

import {describe, it, expect} from '@jest/globals';
import LoginHelper from '../../src/LoginHelper';
import {allure} from 'jest-allure2-reporter/api';

describe('Login screen', () => {
  describe('Form Submission', () => {
    /**
     * @owner Samantha Jones
     * @issue IDEA-235211
     * @url https://example.com/235211 Example
     */
    it('should show error on invalid e-mail format', async () => {
      await LoginHelper.typeEmail('someone#example.com');
      await LoginHelper.typePassword('123456');
      await allure.step('Hello', () => {
        expect(LoginHelper.snapshotForm()).toContain('someone#example.com');
        expect(LoginHelper.getValidationSummary()).toBe('fixtures/invalid-email.xml');
        allure.status('passed', { message: 'All is good' });
      });
    });

    it('should show error on short or invalid password format', async () => {
      await LoginHelper.fillForm('someone@example.com', 'abc');
      allure.status('failed', { message: 'The password is too short' });
    });
  });
});
