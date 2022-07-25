const puppeteer = require('puppeteer')
// const { Parser } = require('json2csv');
const xlsx = require('xlsx')

const scrap = async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://bipcom.co.uk/shop/shop-listing/')
    // await page.screenshot({ path: 'page1.png', fullPage: true })

    let items = [];
    let btn_active = true;
    // console.log(prod);
    while (btn_active) {
        console.log('im here');
        // await page.waitForNavigation()
        const prodHandler = await page.$$('#primary .products > .product-grid-view')
        for (const prod of prodHandler) {

            let title = null,
                prod_link = null, price = null, exp_tax = null, prod_img = null, addToCart_link = null;
            try {
                title = await page.evaluate(el => el.querySelector('div.product-details > div.product-title > h5 > a').textContent, prod)
                prod_link = await page.evaluate(el => el.querySelector('div.product-details > div.product-title > h5 > a').href, prod)
                price = await page.evaluate(el => el.querySelector('div.product-price > span > span.woocommerce-Price-amount.amount > bdi').textContent, prod)
                exp_tax = await page.evaluate(el => el.querySelector('div.product-price > span > span.vat').textContent, prod)
                prod_img = await page.evaluate(el => el.querySelector('div.primary-image').style.backgroundImage.split('url("').join('').split('")').join(''), prod)
                addToCart_link = await page.evaluate(el => el.querySelector('div.product-thumb > div > div > div > div > a').href, prod)
                // console.log(title, price, exp_tax, prod_img);
                items.push({ title, prod_link, price, exp_tax, prod_img, addToCart_link })

            } catch (err) {
                console.log(err);
            }

        }
        const is_active = (await page.$('.next')) !== null;
        btn_active = is_active;
        if (is_active) {
            await Promise.all([page.click('.next'), page.waitForNavigation()])
        } else {
            break;
        }
    }

    await browser.close();

    console.log(items);
    console.log(items.length);

    const workSheet = xlsx.utils.json_to_sheet(items);
    const workBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workBook, workSheet, 'Items');
    xlsx.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    xlsx.write(workBook, { bookType: 'xlsx', type: 'binary' })

    xlsx.writeFile(workBook, 'Bipcom_product_list.xlsx')

}
scrap();