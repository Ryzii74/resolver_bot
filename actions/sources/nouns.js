const axios = require("axios");
const cheerio = require('cheerio');

module.exports = (word) => {
  return async () => {
    const {data} = await axios({
      url: `https://kartaslov.ru/${encodeURIComponent('что-или-кто-бывает')}/${encodeURIComponent(word)}`,
      method: 'get',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
        'Origin': 'https://kartaslov.ru',
        'Referrer': 'https://kartaslov.ru/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    const $ = cheerio.load(data);
    const elements = $('.wordLink').contents();

    const result = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements.eq(i);
        result.push(element.text());
    }

    return result;
  };
}
