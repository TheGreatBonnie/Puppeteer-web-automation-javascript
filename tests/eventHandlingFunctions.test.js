const puppeteer = require("puppeteer");

describe("Performance Monitoring with page.on() and page.once()", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("should capture performance metrics after load and domcontentloaded events", async () => {
    const url = "https://ecommerce-playground.lambdatest.io/";

    // Set up a listener for the `domcontentloaded` event
    let domContentLoadedFired = false;
    page.on("domcontentloaded", () => {
      domContentLoadedFired = true;
    });

    // Set up a one-time listener for the `load` event
    let loadEventFired = false;
    page.once("load", () => {
      loadEventFired = true;
    });

    // Go to the page
    await page.goto(url);

    // Capture performance timings after load
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    // Calculate key metrics
    const metrics = {
      navigationStart: performanceTiming.navigationStart,
      domContentLoaded:
        performanceTiming.domContentLoadedEventEnd -
        performanceTiming.navigationStart,
      firstContentfulPaint:
        performanceTiming.responseStart - performanceTiming.navigationStart,
      load: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
    };

    console.log("Performance metrics:", metrics);

    // Assertions to ensure events were fired and performance is within acceptable limits
    expect(domContentLoadedFired).toBe(true);
    expect(loadEventFired).toBe(true);
    expect(metrics.domContentLoaded).toBeLessThan(6000);
    expect(metrics.firstContentfulPaint).toBeLessThan(1500);
    expect(metrics.load).toBeLessThan(6000);
  });
});
