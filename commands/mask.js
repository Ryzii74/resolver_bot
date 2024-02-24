const dictionary = require('../libs/dictionary');

module.exports = function (msg) {
    const {text} = msg;
    const wordsArray = dictionary.getArray(text);
    const reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/\?/g, '\\S') + '$', 'gi');

    msg.addTextResponse(wordsArray.filter(word => reg.exec(word)).join('\n') || "Слов не найдено");
};
