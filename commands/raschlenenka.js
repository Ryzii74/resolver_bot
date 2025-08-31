const dictionary = require('../libs/dictionary');
const phrasesObject = require('../actions/sources/phrasesObject');
const pogovorkiObject = require('../actions/sources/pogovorkiObject');
const wikislovarObject = require('../actions/sources/wikislovarObject');
const dslovObject = require('../actions/sources/dslovObject');
const getCombinations = require('../utils/getCombinations');
const slovoformsObject = require('../actions/sources/slovoformsObject');
const {RESPONSES: {NO_RESULT}} = require("../constants");

module.exports = function (msg) {
    const {text} = msg;
    const dictionaryObject = dictionary.getObject(text);
    const baseData = text.split(' ').map(el => {
        const count = Number(el.slice(-1));
        const word = el.slice(0, -1);
        return {
            word,
            count,
            options: word.length - count + 1,
        };
    });
    const combinations = getCombinations(baseData.map(el => el.options));
    if (combinations > 1000000) {
        msg.addTextResponse('Слишком много вариантов для перебора');
        return;
    }

    const wordsToFind = [];
    combinations.forEach(combination => {
        let word = '';
        combination.forEach((variant, index) => {
            word += baseData[index].word.slice(variant, baseData[index].count + variant);
        });
        if (!wordsToFind.includes(word)) wordsToFind.push(word);
    });

    const allDataTogether = {
        ...dictionaryObject,
        ...wikislovarObject,
        ...dslovObject,
        ...phrasesObject,
        ...pogovorkiObject,
    };
    const correctWords = wordsToFind.filter(word => allDataTogether[word]);
    const correctWords2 = findTwoWords(slovoformsObject, wordsToFind);
    if (!correctWords.length && !correctWords2.length) {
        msg.addTextResponse(NO_RESULT);
        return;
    }

    msg.addAnswersResponse(correctWords2, '\n', 'НЕСКОЛЬКО СЛОВ');
    msg.addAnswersResponse(correctWords, '\n', 'ЦЕЛЫЕ СЛОВА');
};

function findTwoWords(slovoformsObject, words) {
    return words
        .map(word => {
           for (let i = 1; i < word.length; i++) {
               const word1 = word.slice(0, i);
               const word2 = word.slice(i);
               if (slovoformsObject[word1] && slovoformsObject[word2]) {
                   return `${word1} ${word2}`;
               }
           }
           return false;
        })
        .filter(Boolean);
}

module.exports.isRaschlenenka = (text) => {
    return /^([а-яА-Яa-zA-Z]+\d+\s?)+$/.test(text);
};
