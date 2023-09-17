const phrases = require('../libs/phrasesArray');
const wikislovar = require('../config/wikislovar.json');

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

    wikiPhrases.length && msg.addTextResponse(['ВИКИСЛОВАРЬ', ...wikiPhrases].join('\n'));
    directPhrases.length && msg.addTextResponse(['ПОЛНЫЕ СОВПАДЕНИЯ СЛОВ', ...directPhrases].join('\n'));
    allPhrases.length && msg.addTextResponse(['ЧАСТИЧНЫЕ СОВПАДЕНИЯ СЛОВ', ...allPhrases].join('\n'));
};
