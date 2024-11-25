const phrasesArray = require('./phrasesArray');

const phrasesObject = {};
phrasesArray().forEach(word => { phrasesObject[word.replaceAll(/[ !,--]/g, '').toLowerCase()] = true; });

module.exports = phrasesObject;
