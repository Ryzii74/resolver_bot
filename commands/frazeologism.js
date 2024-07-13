const phrases = require('../actions/sources/phrasesArray')();
const wikislovar = require('../data/wikislovar.json');
const dslov = require('../data/dslov.json');

const dslovPrepared = dslov.map(row => row.toLowerCase()
    .replaceAll(',', '')
    .replaceAll('!', '')
    .replaceAll('?', '')
);

module.exports = async (msg) => {
    // стемминг???
    const {text} = msg;
    const words = text.split(' ');
    const directPhrases = phrases.filter(phrase => words.every(word => new RegExp(`(^|\\s)${word}(\\s|$)`).test(phrase)));
    const allPhrases = phrases.filter(phrase => words.every(word => !directPhrases.includes(phrase) && phrase.includes(word)));
    const wikiPhrases = wikislovar.filter(phrase => words.every(word => phrase.includes(word)));
    const dslovPhrases = dslovPrepared.filter(phrase => words.every(word => phrase.includes(word)));

    if (!wikiPhrases.length && !directPhrases.length && !allPhrases.length) {
        msg.addTextResponse("Ничего не найдено!");
        return;
    }

    allPhrases.length && msg.addAnswersResponse(allPhrases, '\n', 'ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ');
    directPhrases.length && msg.addAnswersResponse(directPhrases, '\n', 'ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ');
    dslovPhrases.length && msg.addAnswersResponse(dslovPhrases, '\n', 'ЕЩЕ КАКИЕ-ТО');
    wikiPhrases.length && msg.addAnswersResponse(wikiPhrases, '\n', 'ВИКИСЛОВАРЬ');
};
