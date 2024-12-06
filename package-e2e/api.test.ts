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
  allure, AllureRuntime
} from "jest-allure2-reporter/api";

import type {
  AllureRuntimePluginCallback,
  AllureRuntimePluginContext,
  AttachmentContent,
  ContentAttachmentContext,
  ContentAttachmentHandler,
  ContentAttachmentOptions,
  FileAttachmentContext,
  FileAttachmentHandler,
  FileAttachmentOptions,
  MIMEInferer,
  MIMEInfererContext,
  UserParameter,
} from 'jest-allure2-reporter/api';

enablePlugins();

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
  assertType<AllureRuntime>(allure);
  assertType<AllureRuntime>(allure.$bind());
  assertType<AllureRuntime>(allure.$bind({ metadata: false, time: true }));
  allure.description('This is a _description_ generated in runtime');
  allure.descriptionHtml('This is a <i>description</i> generated in runtime');
  allure.historyId('00-11-22-33-44-55');
  allure.displayName('Custom test case name');
  allure.fullName('Custom full name');
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

  const contentAttachmentOptions: ContentAttachmentOptions = {
    name: '%s.png',
    mimeType: assertOptional('image/png'),
    handler: assertOptional(
      assertOneOf(
        'copy',
        async (context) => {
          assertType<ContentAttachmentContext>(context);
          return '/path/to/file';
        }
      )
    ),
  };

  const takeScreenshotA1 = allure.createAttachment((s: string) => Buffer.from(s), 'screenshot.png');
  const takeScreenshotA2 = allure.createAttachment(async (_name: string) => 'content', contentAttachmentOptions);

  const fileAttachmentOptions: FileAttachmentOptions = {
    name: assertOptional('file.png'),
    mimeType: assertOptional('image/png'),
    handler: assertOptional(
      assertOneOf(
        'copy',
        async (context) => {
          assertType<FileAttachmentContext>(context);
          return '/path/to/file';
        }
      )
    ),
  };

  const takeScreenshotB1 = allure.createFileAttachment((file: string) => `./${file}.png`);
  const takeScreenshotB2 = allure.createFileAttachment(async (file: string) => `./${file}.png`, 'Screenshot');
  const takeScreenshotB3 = allure.createFileAttachment(async (file: string, ext: string) => `./${file}${ext}`, fileAttachmentOptions);

  assertType<Buffer>(takeScreenshotA1('1'));
  assertType<Promise<string>>(takeScreenshotA2('2'));

  assertType<string>(takeScreenshotB1('file1'));
  assertType<Promise<string>>(takeScreenshotB2('file2'));
  assertType<Promise<string>>(takeScreenshotB3('file3', '.png'));

  assertType<void>(allure.step('Simple step', () => {}));
  assertType<Promise<void>>(allure.step('Simple step', async () => {}));

  const login1 = allure.createStep('Login', (username: string, password: string) => {
    console.log('Login executed via %s and %s', username, password);
  });

  const login2 = allure.createStep('Login', [
    assertType<UserParameter>('username'),
    assertType<UserParameter>({ name: 'password', mode: 'masked'}),
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

function enablePlugins() {
  const inferMimeType: MIMEInferer = (context: MIMEInfererContext) => 'application/octet-stream';
  const customContent: ContentAttachmentHandler = async ({ content, mimeType, name, outDir }: ContentAttachmentContext) => {
    assertType<string>(name);
    assertType<string>(mimeType);
    assertType<string>(outDir);
    assertType<AttachmentContent>(content);
    return '/path/to/file';
  };

  const customFile: FileAttachmentHandler = async ({ mimeType, name, sourcePath, outDir }: FileAttachmentContext) => {
    assertType<string>(name);
    assertType<string>(mimeType);
    assertType<string>(outDir);
    assertType<string>(sourcePath);

    return '/path/to/file';
  };

  assertType<AttachmentContent>('content');
  assertType<AttachmentContent>(Buffer.from('content'));

  const plugin: AllureRuntimePluginCallback = (context: AllureRuntimePluginContext) => {
    assertType<AllureRuntime>(context.runtime);
    context.contentAttachmentHandlers['custom'] = customContent;
    context.fileAttachmentHandlers['custom'] = customFile;
    context.inferMimeType = inferMimeType;
  };

  allure.$plug(plugin);
}

declare function test(name: string, fn: () => unknown): void;
declare function assertType<T>(value: T): T;
declare function assertOptional<T>(value: T | undefined): T | undefined;
declare function assertOneOf<A, B>(a: A, b: B): A | B;
