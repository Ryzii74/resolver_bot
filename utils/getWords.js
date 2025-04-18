const dictionary = require("../libs/dictionary");

function getWords(text) {
    const arrayWords = dictionary.getArray(text);
    const resultRegExp = new RegExp(`^${text.replaceAll('?', '\\S')}$`);
    return arrayWords.filter(word => resultRegExp.test(word));
}
module.exports.getWords = getWords;

module.exports.getWordsFromLine = (text) => {
    const words = getWords(text);
    if (words.length > 0 && words.every(word => word === text)) {
        return `\`${text}\` (!!!)`;
    }

    return `\`${text}\` ${words.length ? `(${words.join(' ')})` : ''}`
};
