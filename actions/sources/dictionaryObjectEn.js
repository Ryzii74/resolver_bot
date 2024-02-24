const dictionaryArray = require('./dictionaryArrayEn');

const dictionaryObject = {};
dictionaryArray().forEach(word => { dictionaryObject[word] = true; });

module.exports = dictionaryObject;
