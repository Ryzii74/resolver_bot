const dictionaryObject = require('../libs/dictionaryObject');

const letters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

module.exports = async (msg) => {
    const correctWords = [];
    let {text} = msg;
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            const newWord = replaceAt(text, i, letters[j]);
            if (newWord !== text && dictionaryObject[newWord]) correctWords.push(newWord);
        }
    }

    msg.addTextResponse(correctWords.join('\n') || "Слов не найдено");
};

function replaceAt(str, index, character) {
    return str.substring(0, index) + character + str.substring(index + 1);
}