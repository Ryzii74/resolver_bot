const dictionaryArray = require('../actions/sources/dictionaryArray')();
const dictionaryObject = require('../actions/sources/dictionaryObject');
const dictionaryObjectEn = require('../actions/sources/dictionaryObjectEn');
const dictionaryArrayEn = require('../actions/sources/dictionaryArrayEn')();
const { lettersEn } = require('../data/letters');

function isRu(text) {
    return text.split('').some(letter => /[а-яА-ЯёЁ]/.test(letter));
}

function getArray(text) {
    return isRu(text) ? dictionaryArray : dictionaryArrayEn;
}

function getArrayGetter(text) {
    return isRu(text) ? () => dictionaryArray : () => dictionaryArrayEn;
}

function getObject(text) {
    return isRu(text) ? dictionaryObject: dictionaryObjectEn;
}

module.exports = {
  getArray,
  getObject,
  getArrayGetter,
};
