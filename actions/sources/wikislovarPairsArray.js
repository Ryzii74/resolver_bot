const wikislovarPairs = require('../../data/wikislovarPairs.json');

module.exports = () => wikislovarPairs.map(el => el
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', ''),
);
