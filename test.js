var pages_no = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.page-numbers li a.page-numbers')).map(x => { return { no: x.textContent, href: x.href } });
})

let last_page_no = 0,
    i = 1,
    j = 1;

for (p of pages_no) {
    if (pages_no[pages_no.length - i] > 0) {
        last_page_no = Number(pages_no[pages_no.length - i].no);
        break;
    } else {
        i++;
    }
}

for (let k = 2; k < last_page_no; k++) {
    j++;
    for (let l = 0; l < pages_no.length; l++) {
        if (pages_no[l] == j) {
            await page.goto(pages_no[l].href)
            await page.waitForNavigation()
            await page.screenshot({ path: 'page' + j + '.png', fullPage: true })
            pages_no.length = 0;
            pages_no = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.page-numbers li a.page-numbers')).map(x => { return { no: x.textContent, href: x.href } });
            })
        }
    }
}

// var page_li = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll('.page-numbers li a.page-numbers')).map(x => x.href)
// })
// await page.evaluate(() => {
//     let i = 1;
//     let j = 1;
//     var li_elements = document.querySelectorAll('.page-numbers li a.page-numbers');
//     var pages_no = Array.from(li_elements).map(x => x.textContent)
//     var last_page_no;
//     for (no of pages_no) {
//         if (pages_no[pages_no.length - i] > 0) {
//             last_page_no = Number(pages_no[pages_no.length - i]);
//             break;
//         } else {
//             i++;
//         }
//     }
//     for (li of li_elements) {
//         if (j <= last_page_no) {
//             j++;
//             if (li.textContent == j) {
//                 page.click(li)
//             }
//         } else {
//             break;
//         }
//     }
// })


// console.log(li);
// return li;

// await Promise.all([page.click('#primary > div:nth-child(4) > div > nav > ul > li:nth-child(2) > a'), page.waitForNavigation()])
// await page.screenshot({ path: 'page2.png', fullPage: true })


// await browser.close();



console.log(pages_no);
    // console.log(page_li);