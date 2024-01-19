import path from 'node:path';
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
  // ['config-01-grouping-01', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
  //   await page.waitForSelector('.tree__content');
  //   await expandAllNodes(page);
  // }],
  // ['config-01-grouping-02', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-01-grouping-03', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-01-grouping-04', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-01-grouping-05', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
  //   await page.waitForSelector('.tree__content');
  //   await expandAllNodes(page);
  // }],
  // ['config-01-grouping-06', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-01-grouping-07', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#behaviors');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-01-grouping-08', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#packages');
  //   await page.waitForSelector('.tree__content');
  //   await expandAllNodes(page);
  // }],
  // ['config-01-grouping-09', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#packages');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-03-errors-01', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#categories');
  //   await page.waitForSelector('.tree__content');
  // }],
  // ['config-environment-01', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/');
  //   await page.waitForSelector('.widget[data-id="environment"]');
  //   return page.$('.widget[data-id="environment"]');
  // }],
  // ['config-executor-01', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/');
  //   await page.waitForSelector('.widget[data-id="executors"]');
  //   return page.$('.widget[data-id="executors"]');
  // }],
  // ['config-history-01', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#graph');
  //   await page.waitForNetworkIdle();
  //   await page.waitForSelector('.chart__svg');
  // }],
  // ['config-history-02', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#categories/5f7424d2d4d8c2e0b74fb91fb685e1b4/3a46dbf2ef318473/retries');
  //   await page.waitForNetworkIdle();
  // }],
  // ['graphs-duration-trend', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#graph');
  //   await page.waitForNetworkIdle();
  //
  //   return page.$('.widget[data-id="duration-trend"]');
  // }],
  // ['graphs-retry-trend', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#graph');
  //   await page.waitForNetworkIdle();
  //
  //   return page.$('.widget[data-id="retry-trend"]');
  // }],
  // ['graphs-category-trend', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#graph');
  //   await page.waitForNetworkIdle();
  //
  //   return page.$('.widget[data-id="categories-trend"]');
  // }],
  // ['graphs-history-trend', async (page) => {
  //   await page.goto('https://allure-framework.github.io/allure-demo/5/#graph');
  //   await page.waitForNetworkIdle();
  //
  //   return page.$('.widget[data-id="history-trend"]');
  // }],
  ['icon-retries', async (page) => {
    await page.goto('https://allure-framework.github.io/allure-demo/5/#suites');
    await page.waitForNetworkIdle();

    return page.$('span[data-mark="retriesStatusChange"]');
  }],
];

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 600, deviceScaleFactor: 2 });

  for (const [name, scenario] of scenarios) {
    const screenshotPath = path.join(process.cwd(), '../..', 'docs/img/screenshots', name + '.jpg');
    const element = await scenario(page) ?? page;
    await element.screenshot({ path: screenshotPath });
  }
} finally {
  await browser.close();
}
