const dslov = require('../../data/dslov.json');

module.exports = () => dslov.map(el => el
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', ''),
);
