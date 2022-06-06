const dictionaryArray = require('../libs/dictionaryArray');

module.exports = function (text) {
    var reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/\?/g, '\\S') + '$', 'gi');

    return dictionaryArray.filter(function (word) {
        return reg.exec(word);
    }).join('\n') || "Слов не найдено";
};
