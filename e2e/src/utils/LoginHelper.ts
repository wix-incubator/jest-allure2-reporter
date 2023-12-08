class LoginHelper {
  #email?: string;
  #password?: string;

  @Step('Type e-mail: %s', ['email'])
  async typeEmail(email: string) {
    this.#email = email;
    return 'Entered: ' + email;
  }

  @Step('Type password', [{ name: 'password', mode: 'masked' }])
  async typePassword(password: string) {
    this.#password = password;
    return 'Entered: ' + password;
  }

  @Attachment('form.json', 'application/json')
  snapshotForm() {
    return JSON.stringify({ email: this.#email, password: this.#password }, null, 2);
  }

  @FileAttachment('summary.xml', 'text/xml')
  getValidationSummary() {
    return 'fixtures/invalid-email.xml';
  }
}

export default new LoginHelper();
