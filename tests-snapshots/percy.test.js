const puppeteer = require("puppeteer");
const percySnapshot  = require("@percy/puppeteer");

describe("Percy test", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test.only("Captura de pantalla completaa", async () => {
    await page.goto("http://example.com");
    await page.waitForSelector("h1");

    await percySnapshot(page, "Ejemplo primer prueba");
  });

  test("Captura de pantalla removiendo un elemento específico", async () => {
    await page.goto("http://example.com");
    await page.waitForSelector("h1");

    await page.evaluate(() => {
      (document.querySelectorAll("h1") || []).forEach((el) => el.remove());
    });
    await percySnapshot(page, "Ejemplo remover primer prueba");
  }); 
}); 