const dictionary = require("../libs/dictionary");

module.exports = async (msg) => {
    const {text} = msg;
    const words = text.split(' ');
    if (words.length < 2) {
        msg.addTextResponse('Нужно указать хотя бы 2 слова через пробел');
        return;
    }

    const [firstWord, ...otherWords] = words;

    const wordsArray = dictionary.getArray(text);
    const wordsObject = dictionary.getObject(text);
    const result = [];
    wordsArray.forEach(word => {
        const index = word.indexOf(firstWord);
        const diff = word.length - firstWord.length;
        if (index === 0 || (index > 0 && index === word.length - firstWord.length)) {
            const subword = index === 0 ? word.slice(-diff) : word.slice(0, index);
            if (result.some(row => row.startsWith(subword))) {
                return;
            }

            const wordsFound = [];
            otherWords.forEach(otherWord => {
                const wordsToAdd = [];
                if (!!wordsObject[subword + otherWord]) {
                    wordsToAdd.push(subword.toUpperCase() + otherWord);
                }
                if (!!wordsObject[otherWord + subword]) {
                    wordsToAdd.push(otherWord + subword.toUpperCase());
                }
                if (wordsToAdd.length) {
                    wordsFound.push(wordsToAdd.join('/'));
                }
            });
            if (wordsFound.length) {
                const updatedWord = word.replace(subword, subword.toUpperCase());
                result.push(`${subword} - ${updatedWord} ${wordsFound.join(' ')}`);
            }
        }
    });

    if (result.length) {
        msg.addAnswersResponse(result.sort((b, a) => b.length - a.length));
    } else {
        msg.addTextResponse('Ничего не найдено!');
    }
};
