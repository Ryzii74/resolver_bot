const {RESPONSES: {NO_RESULT}} = require("../constants");
const phrases = require('../actions/sources/phrasesArray')();
const pogovorki = require('../actions/sources/pogovorkiArray')();
const wikislovar = require('../actions/sources/wikislovarArray')();
const wikislovarPairs = require('../actions/sources/wikislovarPairsArray')();
const dslov = require('../actions/sources/dslovArray')();

module.exports = async (msg) => {
    // стемминг???
    const {text} = msg;
    const [wordsCount, ...words] = text.split(' ');

    const isWordsCount = /[1-9]/.test(wordsCount);
    if (!isWordsCount) {
        words.unshift(wordsCount);
    }

    const directPhrases = phrases.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => new RegExp(`(^|\\s)${word}(\\s|$)`).test(phrase)));
    const allPhrases = phrases.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => !directPhrases.includes(phrase) && phrase.includes(word)));
    const wikiPhrases = wikislovar.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => phrase.includes(word)));
    const wikiPaires = wikislovarPairs.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => phrase.includes(word)));
    const pogovorkiPhrases = pogovorki.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => phrase.includes(word)));
    const dslovPhrases = dslov.filter(phrase => isPhraseMatchWordsCount(phrase, isWordsCount, Number(wordsCount)) && words.every(word => phrase.includes(word)));

    if (!wikiPhrases.length && !directPhrases.length && !allPhrases.length) {
        msg.addTextResponse(NO_RESULT);
        return;
    }

    allPhrases.length && msg.addAnswersResponse(allPhrases, '\n', 'ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ');
    directPhrases.length && msg.addAnswersResponse(directPhrases, '\n', 'ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ');
    dslovPhrases.length && msg.addAnswersResponse(dslovPhrases, '\n', 'ЕЩЕ КАКИЕ-ТО');
    pogovorkiPhrases.length && msg.addAnswersResponse(pogovorkiPhrases, '\n', 'ПОГОВОРКИ');
    wikiPaires.length && msg.addAnswersResponse(wikiPaires, '\n', 'ВИКИСЛОВАРЬ (УСТОЙЧИВЫЕ ВЫРАЖЕНИЯ)');
    wikiPhrases.length && msg.addAnswersResponse(wikiPhrases, '\n', 'ВИКИСЛОВАРЬ (ФРАЗЕОЛОГИЗМЫ)');
};

function isPhraseMatchWordsCount(phrase, isWordsCount, number) {
    if (!isWordsCount) return true;

    let spacesCount = 0;
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === ' ') {
            spacesCount++;
        }
    }

    return spacesCount + 1 === number;
}
