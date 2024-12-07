const wikislovar = require('../../data/wikislovar.json');

module.exports = () => wikislovar.map(el => el
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', ''),
);
