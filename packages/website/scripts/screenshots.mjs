import path from 'path';
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

async function expandAllNodes(page) {
  while (true) {
    const node = await page.$('.tree__content > :not(.node__expanded) > .node__title');
    if (node) {
      await node.click();
    } else {
      break;
    }
  }
}

const scenarios = [
  ['config-01-grouping-01', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
    await page.waitForSelector('.tree__content');
    await expandAllNodes(page);
  }],
  ['config-01-grouping-02', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
    await page.waitForSelector('.tree__content');
  }],
  ['config-01-grouping-03', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
    await page.waitForSelector('.tree__content');
  }],
  ['config-01-grouping-04', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
    await page.waitForSelector('.tree__content');
  }],
  ['config-01-grouping-05', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
    await page.waitForSelector('.tree__content');
    await expandAllNodes(page);
  }],
  ['config-01-grouping-06', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
    await page.waitForSelector('.tree__content');
  }],
  ['config-01-grouping-07', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
    await page.waitForSelector('.tree__content');
  }],
  ['config-01-grouping-08', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#packages');
    await page.waitForSelector('.tree__content');
    await expandAllNodes(page);
  }],
  ['config-01-grouping-09', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#packages');
    await page.waitForSelector('.tree__content');
  }],
];

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 600, deviceScaleFactor: 2 });

  for (const [name, scenario] of scenarios) {
    const screenshotPath = path.join(process.cwd(), '../..', 'docs/img/screenshots', name + '.jpg');
    await scenario(page);
    await page.screenshot({ path: screenshotPath });
  }
} finally {
  await browser.close();
}
