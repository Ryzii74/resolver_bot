const dictionary = require('../libs/dictionary');

module.exports = function (msg) {
    const {text} = msg;
    const dictionaryObject = dictionary.getObject(text);
    const baseData = text.split(' ').map(el => {
        const count = Number(el.slice(-1));
        const word = el.slice(0, -1);
        return {
            word,
            count,
            options: word.length - count + 1,
        };
    });

    let currentDivider = baseData[0].options;
    baseData[0].devider = currentDivider;
    baseData[1].devider = currentDivider;
    for (let i = 2; i < baseData.length; i++) {
        baseData[i].devider = baseData[i - 2].devider * baseData[i - 1].options;
    }

    const optionsCount = baseData.reduce((sum, el) => sum * el.options, 1);
    const wordsToFind = [];
    for (let i = 0; i < optionsCount; i++) {
        let word = '';
        for (let j = 0; j < baseData.length; j++) {
            const el = baseData[j];
            if (j === 0) {
                const order = i % el.devider;
                word += el.word.slice(order, order + el.count);
            } else {
                const order = Math.floor(i / el.devider) % el.options;
                word += el.word.slice(order, order + el.count);
            }
        }

        if (!wordsToFind.includes(word)) wordsToFind.push(word);
    }

    const correctWords = wordsToFind.filter(word => dictionaryObject[word]);
    const correctWords2 = findTwoWords(dictionaryObject, wordsToFind);
    if (!correctWords.length && !correctWords2.length) {
        msg.addTextResponse("Нет результатов");
        return;
    }

    msg.addAnswersResponse(correctWords, '\n', 'ЦЕЛЫЕ СЛОВА');
    msg.addAnswersResponse(correctWords2, '\n', 'НЕСКОЛЬКО СЛОВ');
};

function findTwoWords(dictionaryObject, words) {
    return words
        .map(word => {
           for (let i = 1; i < word.length; i++) {
               const word1 = word.slice(0, i);
               const word2 = word.slice(i);
               if (dictionaryObject[word1] && dictionaryObject[word2]) {
                   return `${word1} ${word2}`;
               }
           }
           return false;
        })
        .filter(Boolean);
}
