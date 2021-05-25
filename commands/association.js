const axios = require('axios');
const qs = require('qs');

module.exports = async (text) => {
    const words = text.split(' ');
    if (words.length !== 2) return 'Нужно указать 2 слова через пробел';

    const associations = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordAssociations = await getWordAssociations(word);
        associations.push(wordAssociations);
    }

    const repeats = getRepeats(associations);
    return repeats.join('\t');
};


async function getWordAssociations(word) {
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
}

function getRepeats(associations, callback) {
    const repeats = [];

    associations[0].forEach(word => {
        let isNotFound = false;
        for (let i = 1; i < associations.length; i++) {
            if (!associations[i].includes(word)) {
                isNotFound = true;
                break;
            }
        }

        if (!isNotFound) repeats.push(word);
    });

    return repeats;
}