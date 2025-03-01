const dictionary = require("../libs/dictionary");

module.exports = function (msg) {
    const {text} = msg;

    const wordsArray = dictionary.getArray(text);
    const wordsObject = dictionary.getObject(text);
    const correctWords = [];
    const reg = new RegExp('^' + text.replace(/\?/g, '\(\\S*\)') + '$', 'i');
    wordsArray.forEach(word => {
        const res = reg.exec(word);
        if (res && wordsObject[res[1]]) {
            correctWords.push(word.replace(res[1], res[1].toUpperCase()));
        }
    });

    msg.addAnswersResponse(correctWords);
};
