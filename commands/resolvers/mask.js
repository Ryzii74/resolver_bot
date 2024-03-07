const dictionary = require("../../libs/dictionary");

module.exports = (text) => {
    const wordsArray = dictionary.getArray(text);
    const reg = new RegExp('^' + text.replace(/\*/g, '\\S*').replace(/\?/g, '\\S') + '$', 'gi');
    return wordsArray.filter(word => reg.exec(word));
};
