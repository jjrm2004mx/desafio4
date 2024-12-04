const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe('Visual Testing', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
       // h1 = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test.only("Captura de pantalla completa", async () => {
        await page.goto("https://example.com");
        await page.waitForSelector("h1");
        const image = await page.screenshot(); ;
        expect(image).toMatchImageSnapshot({
            failureThresholdType: "pixel",
            failureThreshold: 500,
        });
        await waitForTimeout(3000);
    });

    test("Captura de pantalla de un elemento especifico", async () => {
        await page.goto("https://example.com");
        await page.waitForSelector("h1");
        const imageh1 = await page.screenshot(); 
        expect(imageh1).toMatchImageSnapshot({
            failureThresholdType: "pixel",
            failureThreshold: 0.01
        });
        await waitForTimeout(3000);
    });

    test("removiendo un elemanto especifico", async () => {
        await page.goto("https://example.com");

        await page.evaluate(()=> {
        (document.querySelectorAll("h1") ||[]).forEach((el) =>el.remove());
        });
        await waitForTimeout(3000);
    });
});

function waitForTimeout(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	}) 
}