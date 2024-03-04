const phrases = require('../actions/sources/phrasesArray')();
const wikislovar = require('../data/wikislovar.json');

module.exports = async (msg) => {
    // стемминг???
    const {text} = msg;
    const directPhrases = phrases.filter(phrase =>  new RegExp(`(^|\\s)${text}(\\s|$)`).test(phrase));
    const allPhrases = phrases.filter(phrase => !directPhrases.includes(phrase) && phrase.includes(text));
    const wikiPhrases = wikislovar.filter(phrase => phrase.includes(text));

    if (!wikiPhrases.length && !directPhrases.length && !allPhrases.length) {
        msg.addTextResponse("Ничего не найдено!");
        return;
    }

    allPhrases.length && msg.addAnswersResponse(allPhrases, '\n', 'ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ');
    directPhrases.length && msg.addAnswersResponse(directPhrases, '\n', 'ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ');
    wikiPhrases.length && msg.addAnswersResponse(wikiPhrases, '\n', 'ВИКИСЛОВАРЬ');
};
