const phrases = require('../libs/phrasesArray');

module.exports = async (msg) => {
    // стемминг???
    const {text} = msg;
    const directPhrases = phrases.filter(phrase =>  new RegExp(`(^|\\s)${text}(\\s|$)`).test(phrase));
    const allPhrases = phrases.filter(phrase => !directPhrases.includes(phrase) && phrase.includes(text));

    if (!directPhrases.length && !allPhrases.length) {
        msg.addTextResponse("Ничего не найдено!");
        return;
    }

    msg.addTextResponse(directPhrases.join('\n'));
    msg.addTextResponse(allPhrases.join('\n'));
};
