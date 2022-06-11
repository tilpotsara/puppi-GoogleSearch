module.exports = {
    baseUrl: 'https://google.com/search?q=',
    options: { waitForSelector: '.yuRUbf' },
    scrape: () => {
        const searchResults = document.querySelectorAll('.yuRUbf');
        const temp = [];
        searchResults.forEach((item) => {
            const headline = item.querySelector('.yuRUbf .LC20lb.MBeuO.DKV0Md');
            temp.push({
                headline: headline.innerText || headline.innerHTML,
                href: item.querySelector('.yuRUbf a').href,
            });
        });
        return temp;
    }
}