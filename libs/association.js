const axios = require("axios");
const qs = require('qs');

module.exports = async function getWordAssociations(word) {
  const {data} = await axios({
    url: 'https://sociation.org/ajax/word_associations/',
    method: 'post',
    data: qs.stringify({
      word,
      max_count: 100,
    }),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
      'Origin': 'https://sociation.org',
      'Referrer': 'https://sociation.org/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  return data.associations.map(el => el.name);
};
