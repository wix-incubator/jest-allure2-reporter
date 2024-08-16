import type { FakeBrowser } from '../FakeBrowser';
import { allure } from 'jest-allure2-reporter/api';

export async function toMatchImageSnapshot(browser: FakeBrowser): Promise<boolean> {
  const diffBuffer = await browser.takeScreenshot('.diff.png');

  if (diffBuffer) {
    const defaultBuffer = await browser.takeScreenshot();
    const expectedBuffer = (await browser.takeScreenshot('.expected.png')) ?? defaultBuffer;
    const actualBuffer = (await browser.takeScreenshot('.actual.png')) ?? defaultBuffer;

    const expected = expectedBuffer!.toString('base64');
    const actual = actualBuffer!.toString('base64');
    const diff = diffBuffer.toString('base64');
    const content = JSON.stringify({
      expected: `data:image/png;base64,${expected}`,
      actual: `data:image/png;base64,${actual}`,
      diff: `data:image/png;base64,${diff}`,
    });

    await allure.attachment("Screenshot diff", content, "application/vnd.allure.image.diff");
    return false;
  } else {
    const screenshot = await browser.takeScreenshot();
    if (screenshot) {
      await allure.attachment('Screenshot', screenshot, 'image/png');
    }
  }

  return true;
}
