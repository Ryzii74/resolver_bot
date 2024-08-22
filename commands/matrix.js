const dictionaryArray = require('../actions/sources/dictionaryArray')();

const DEFAULT_LENGTH = 3;

module.exports = async (msg) => {
    let {text} = msg;
    const words = text.split(' ');
    const subwordLength = getSubwordLength(words[words.length - 1]);
    const correctWords = dictionaryArray.filter(word => {
        const matches = {0: [], 1: []};
        for (let i = 0; i < 2; i++) {
            const wordToMatch = words[i];
            for (let j = 0; j <= wordToMatch.length - subwordLength; j++) {
                const substr = wordToMatch.substring(j, j + subwordLength);
                if (word.includes(substr)) {
                    matches[i].push(substr);
                }
            }

            if (!matches[i].length) {
                return false;
            }
        }

        return matches[0].some(el => matches[1].includes(el));
    });

    msg.addAnswersResponse(correctWords);
};

function getSubwordLength(lastWord) {
    const possibleNumber = Number(lastWord);
    return Number.isNaN(possibleNumber) ? DEFAULT_LENGTH : possibleNumber;
}
