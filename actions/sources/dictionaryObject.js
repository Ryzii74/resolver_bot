const dictionaryArray = require('./dictionaryArray');

const dictionaryObject = {};
dictionaryArray().forEach(word => { dictionaryObject[word] = true; });

module.exports = dictionaryObject;
