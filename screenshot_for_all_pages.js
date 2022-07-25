const puppeteer = require('puppeteer')

const scrap = async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://bipcom.co.uk/shop/shop-listing/')
    // await page.screenshot({ path: 'page1.png', fullPage: true })

    var is_active = await page.$('.next') !== null;
    console.log(is_active);
    let isDisabled = false;
    let i = 1
    await page.screenshot({ path: 'page' + i + '.png', fullPage: true })

    while (is_active) {
        i++;
        if (await page.$('.next') !== null) {
            await Promise.all([page.click('.next'), page.waitForNavigation()])
            await page.screenshot({ path: 'page' + i + '.png', fullPage: true })
        } else {
            break;
        }
    }

    await browser.close();
}
scrap();