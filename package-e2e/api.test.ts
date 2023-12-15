import {
  Attachment,
  FileAttachment,
  Step,
  $Description,
  $DescriptionHtml,
  $Epic,
  $Feature,
  $Issue,
  $Link,
  $Owner,
  $Severity,
  $Story,
  $Tag,
  $TmsLink,
  allure,
} from 'jest-allure2-reporter/api';
import {Status} from "@noomorph/allure-js-commons";
import {take} from "lodash";

declare var test: (name: string, fn: () => unknown) => void;

$Description('This is _a test description_');
$DescriptionHtml('This is <i>a test description</i>');
$Epic('BDD epic');
$Feature('BDD feature');
$Story('BDD story');
$Issue('JIRA-123');
$Link('https://example.com', 'Example link');
$Link({
  name: 'Example link',
  url: 'https://example.com',
  type: 'custom-type',
});
$Owner('Yaroslav Serhieiev');
$Severity('critical');
$Tag('e2e');
$TmsLink('TEST-456');
test('typings of jest-allure2-reporter/api', async () => {
  allure.description('This is a _description_ generated in runtime');
  allure.descriptionHtml('This is a <i>description</i> generated in runtime');
  allure.status('failed');
  allure.status('passed');
  allure.status('broken');
  allure.status('skipped');
  allure.status('unknown');
  allure.statusDetails({});
  allure.statusDetails({ message: 'Test failed due to a runtime error' });
  allure.statusDetails({ message: 'Test failed due to a runtime error', trace: 'Here is a trace' });
  allure.label('owner', 'Dynamic owner');
  allure.link('https://jira.example.com', 'JIRA-123', 'issue');
  allure.link('https://example.com', 'Custom link');
  allure.link('https://just-a-link.com');
  allure.parameters({
    Browser: 'Chrome',
    Resolution: '1024x768',
  });

  allure.parameter('Login', 'admin');
  allure.parameter('Password', 'qwerty', { mode: 'masked' });
  allure.parameter('Deprecated', 'value', { excluded: true });

  allure.attachment('file.txt', 'Example log content');
  allure.attachment('screenshot.png', Buffer.from(''), 'image/png');

  await allure.attachment('file-async.txt', Promise.resolve('Example log content'));

  const takeScreenshotA1 = allure.createAttachment((s: string) => Buffer.from(s), 'screenshot.png');
  const takeScreenshotA2 = allure.createAttachment(async (s: string) => Buffer.from(s), {
    name: 'Screenshot',
    mimeType: 'image/png',
  });
  const takeScreenshotB1 = allure.createFileAttachment((file: string) => `./${file}.png`);
  const takeScreenshotB2 = allure.createFileAttachment(async (file: string) => `./${file}.png`, 'Screenshot');
  const takeScreenshotB3 = allure.createFileAttachment(async (file: string, ext: string) => `./${file}${ext}`, {
    name: 'Screenshot',
    mimeType: 'image/png',
  });

  assertType<Buffer>(takeScreenshotA1('1'));
  assertType<Promise<Buffer>>(takeScreenshotA2('2'));
  assertType<string>(takeScreenshotB1('file1'));
  assertType<Promise<string>>(takeScreenshotB2('file2'));
  assertType<Promise<string>>(takeScreenshotB3('file3', '.png'));

  assertType<void>(allure.step('Simple step', () => {}));
  assertType<Promise<void>>(allure.step('Simple step', async () => {}));

  const login1 = allure.createStep('Login', (username: string, password: string) => {
    console.log('Login executed via %s and %s', username, password);
  });

  const login2 = allure.createStep('Login', [
    'username',
    { name: 'password', mode: 'masked'},
  ], async (username: string, password: string) => {
    console.log('Login executed via %s and %s', username, password);
  });

  assertType<void>(login1('admin', 'qwerty'));
  assertType<Promise<void>>(login2('admin', 'qwerty'));


  class LoginHelper {
    @Attachment('%s', 'image/png')
    async takeScreenshot1(name: string) {
      return Buffer.from(name);
    }

    @FileAttachment('%s', 'image/png')
    takeScreenshot2(name: string) {
      return `/path/to/${name}.png`;
    }

    @Step('Restore password for %s')
    restorePassword(login: string) {
      console.log('Restore password for %s', login);
      return login;
    }

    @Step('Login as %s', [
      { name: 'username' },
      { name: 'password', mode: 'masked' },
    ])
    async login(username: string, password: string) {
      console.log('Login as %s via %s', username, password);
    }
  }

  const helper = new LoginHelper();
  assertType<Promise<Buffer>>(helper.takeScreenshot1('hello'));
  assertType<string>(helper.takeScreenshot2('world'));
  assertType<string>(helper.restorePassword('admin'));
  assertType<Promise<void>>(helper.login('admin', 'qwerty'));
});

function assertType<T>(_value: T): void {}
