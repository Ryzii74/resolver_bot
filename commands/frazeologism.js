const phrases = require('../libs/phrasesArray');

module.exports = async (text) => {
    // стемминг???
    return phrases.filter(phrase => phrase.includes(text)).join('\n');
};
