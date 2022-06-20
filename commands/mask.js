const dictionaryArray = require('../libs/dictionaryArray');

module.exports = function (msg) {
    const {text} = msg;
    const reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/\?/g, '\\S') + '$', 'gi');

    msg.addTextResponse(dictionaryArray.filter(word => reg.exec(word)).join('\n') || "Слов не найдено");
};
