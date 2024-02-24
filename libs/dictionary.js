const dictionaryArray = require('../actions/sources/dictionaryArray')();
const dictionaryObject = require('../actions/sources/dictionaryObject');
const dictionaryObjectEn = require('../actions/sources/dictionaryObjectEn');
const dictionaryArrayEn = require('../actions/sources/dictionaryArrayEn')();
const { lettersEn } = require('../data/letters');

function isEn(text) {
    return text.split('').some(letter => lettersEn.includes(letter));
}

function getArray(text) {
    return isEn(text) ? dictionaryArrayEn : dictionaryArray;
}

function getObject(text) {
    return isEn(text) ? dictionaryObjectEn : dictionaryObject;
}

module.exports = {
  getArray,
  getObject,
};
