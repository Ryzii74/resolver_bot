const dictionaryArray = require('../libs/dictionaryArray');
const {isLogogrif} = require('../libs/tasks');

module.exports = async (msg) => {
    let {text} = msg;
    const correctWords = dictionaryArray.filter(word => word !== text && isLogogrif(text, word));
    msg.addTextResponse(correctWords.join('\n') || "Слов не найдено");
};