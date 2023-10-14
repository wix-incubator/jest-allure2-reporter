import {Attachment, FileAttachment, Step} from 'jest-allure2-reporter';

class LoginHelper {
  @Step('Type e-mail', ['E-mail'])
  @Attachment('email.txt')
  async typeEmail(email: string) {
    return 'Entered: ' + email;
  }

  @FileAttachment('summary.xml', 'text/xml')
  getValidationSummary() {
    return 'fixtures/invalid-email.xml';
  }
}

export default new LoginHelper();
