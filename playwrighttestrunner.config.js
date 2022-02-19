/* eslint-disable cup/no-undef */
// @ts-check
const { devices } = require('@playwright/test');
// eslint-disable-next-line no-unused-vars
const yaml = require('js-yaml');
const fs = require('fs');

let projectProperties = [];
let config = {};

const doc = (() => {
  try {
    return yaml.load(fs.readFileSync('./configuration.yml', { schema: 'JSON_SCHEMA' }));
  } catch (e) {
    console.log(e);
  }
})();

//constructing browser using object literals
function getDesktopBrowser(browserEngine) {
  return {
    chromium: 'Chrome',
    firefox: 'Firefox',
    webKit: 'Safari',
  }[browserEngine];
}

// creating array of 'name' and 'use' objects
for (let browserEngine of doc.browser) {
  for (let device of doc.devices) {
    let newDevice = `${device} ${getDesktopBrowser(browserEngine)}`;
    let properties = {
      name: browserEngine,
      use: { ...devices[newDevice] },
    };
    projectProperties.push(properties);
  }
}

/** @type {import('@playwright/test').PlaywrightTestConfig} */
config = {
  //forbidOnly: !!process.env.CI,
  //retries: process.env.CI ? 2 : 0,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
  // ],
};

//assigning 'projects' property to config
config = { ...config, ...{ projects: projectProperties } };

module.exports = config;
