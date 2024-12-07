const phrasesArray = require('./phrasesArray');

const phrasesObject = {};
phrasesArray().forEach(word => { phrasesObject[word.replaceAll(/[ !,--]/g, '').replaceAll('ё', 'e').toLowerCase()] = true; });

module.exports = phrasesObject;
