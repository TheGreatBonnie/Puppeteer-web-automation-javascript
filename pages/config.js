const { connect } = require("puppeteer");
require("dotenv").config();

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

const chromeWindowsCapabilities = {
  browserName: "Chrome",
  browserVersion: "130.0",
  "LT:Options": {
    user: username,
    accessKey: accessKey,
    platform: "Windows 10",
    build: "Puppeteer",
    project: "PuppeteerTests",
    name: "E-Commerce Site Automated Tests Using Puppeteer",
    network: true,
  },
};

const chromeMacOSCapabilities = {
  browserName: "Chrome",
  browserVersion: "129.0",
  "LT:Options": {
    user: username,
    accessKey: accessKey,
    platform: "macOS Mojave",
    build: "Puppeteer",
    project: "PuppeteerTests",
    name: "E-Commerce Site Automated Tests Using Puppeteer",
    network: true,
  },
};

const MicrososftEdgeLinuxCapabilities = {
  browserName: "MicrosoftEdge",
  browserVersion: "130.0",
  "LT:Options": {
    user: username,
    accessKey: accessKey,
    platform: "Linux",
    build: "Puppeteer",
    project: "PuppeteerTests",
    name: "E-Commerce Site Automated Tests Using Puppeteer",
    network: true,
  },
};

const browserEndPoint = connect({
  browserWSEndpoint: `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(
    JSON.stringify(chromeWindowsCapabilities)
  )}`,
});

module.exports = { browserEndPoint };
